import Imap from "imap";
import { simpleParser } from "mailparser";
import nodemailer from 'nodemailer';

interface Mail {
    subject: string;
    date: Date;
    body: string;
}

const imapConfig = {
    user: process.env.IMAP_USER,
    password: process.env.IMAP_PASS,
    host: process.env.IMAP_HOST,
    port: process.env.IMAP_PORT,
    tls: true,
};

export const fetchMails = async (): Promise<Mail[]> => {
    return new Promise((resolve, reject) => {
        const imap = new Imap(imapConfig as any);
        let mails: Mail[] = [];

        const processMail = (mail: any) => {
            const { subject, date, textAsHtml, from, to } = mail;
            const senderName = from.text || '';
            const senderEmail = from.value[0].address || '';
            const recipientEmails = to.value.map((recipient: any) => recipient.address).join(', ');
            //@ts-ignore works fine for now
            mails.push({ subject, date, body: textAsHtml, senderName, senderEmail, recipient: recipientEmails });
        };

        imap.once("ready", () => {
            imap.openBox("INBOX", false, (err, box) => {
                if (err) reject(err);

                const fetch = imap.seq.fetch("1:*", {
                    bodies: "",
                    struct: true,
                });

                fetch.on("message", (msg) => {
                    msg.on("body", (stream) => {
                        simpleParser(stream, (err, mail) => {
                            if (err) return;
                            processMail(mail);
                        });
                    });
                });

                fetch.once("error", (err) => {
                    reject(err);
                });

                fetch.once("end", () => {
                    imap.end();
                });
            });
        });

        imap.once("error", (err: any) => {
            reject(err);
        });

        imap.once("end", () => {
            resolve(mails);
        });

        imap.connect();
    });
};



const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS // your email password
    },
});



// SMTP
export async function sendMail(to: string, subject: string, text: string, attachments: any): Promise<void> {
    let info = await transporter.sendMail({
        from: `"Your Name" <${process.env.SMTP_USER}>`, //@TODO: sender address (Username from Database)
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
}
