import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    // secure: false, 
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendEmail(to: string, body: string) {
    // await transport.sendMail({
    //     from: "akash906129@gmail.com",
    //     sender: "akash906129@gmail.com",
    //     to,
    //     subject: "Hello from Zapier",
    //     text: body
    // })

    console.log("email sended ");
    
}
