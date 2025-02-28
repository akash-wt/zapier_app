import express from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient;
const app = express();

app.post("/hook/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    await client.$transaction(async tx => {

        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body,
            }
        })

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id,
            }
        })
    })

    res.json({ msg: "webhook recived" })


})

app.listen(3000, () => [
    console.log("app is on " + "http://localhost:3000")

])