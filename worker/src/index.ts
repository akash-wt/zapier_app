import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";
import { sendEmail } from "./email";
import { sendSolana } from "./solana";
import { parse } from "./parser";
import { JsonObject } from "@prisma/client/runtime/library";
import dotenv from 'dotenv';

dotenv.config();

const TOPIC_NAME = "zap-events"

const client = new PrismaClient();


const kafka = new Kafka({
    clientId: 'outbox-processor-2',
    brokers: ['localhost:9092']
})



async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker-2' })
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })
    const producer = kafka.producer();
    await producer.connect();

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            })


            const messageValue = message.value?.toString();
            if (!messageValue) {
                console.error("Received empty message, skipping...");
                return;
            }

            let parsedValue;
            try {
                parsedValue = JSON.parse(messageValue);
            } catch (error) {
                console.error("Invalid JSON received:", messageValue);
                return;
            }


            const zapRunId = parsedValue.zapRunId;
            const stage = parsedValue.stage;

            if (!zapRunId || stage === undefined) {
                console.error("Missing zapRunId or stage in message:", parsedValue);
                return;
            }

            const zapRunDetails = await client.zapRun.findFirst({
                where: {
                    id: zapRunId
                },
                include: {
                    zap: {
                        include: {
                            actions: {
                                include: {
                                    type: true
                                }
                            }
                        }
                    },
                }

            });

            if (!zapRunDetails || !zapRunDetails.zap.actions) {
                console.error("ZapRun details not found for ID:", zapRunId);
                return;
            }

            const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);

            if (!currentAction?.metadata) {
                console.error("Current action not found for stage:", stage);
                return;
            }

            const zapRunMetadata = zapRunDetails?.metadata;

            try {

                if (currentAction.type.id === "email") {
                    const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);

                    const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);
                    console.log(`Sending out email to ${to} body is ${body}`)
                    await sendEmail(to, body);
                }

                if (currentAction.type.id === "solana") {

                    const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);

                    const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);

                    console.log(`Sending out SOL of ${amount} to address ${address}`);
                    await sendSolana(address, amount);
                }
            } catch (err) {
                console.error("Error processing action:", err);
                return;

            }

            await new Promise(r => setTimeout(r, 500));



            const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1; 
            
            if (lastStage !== stage) {
                console.log("pushing back to the queue")
                await producer.send({
                    topic: TOPIC_NAME,
                    messages: [{
                        value: JSON.stringify({
                            stage: stage + 1,
                            zapRunId
                        })
                    }]
                })
            }

            console.log("processing done");
            // 
            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition: partition,
                offset: (parseInt(message.offset) + 1).toString() // 5
            }])

        },
    })



}

main();