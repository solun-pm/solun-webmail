import Imap from "imap";
import { simpleParser } from "mailparser";
import nodemailer from 'nodemailer';

interface Mail {
    subject: string;
    date: Date;
    body: string;
}

export const fetchMails = async (fqe: string, password: string): Promise<Mail[]> => {

    const imapConfig = {
        user: fqe, // fqe
        password: password, // user pwd
        host: process.env.NEXT_PUBLIC_MAIL_HOST,
        port: process.env.NEXT_PUBLIC_IMAP_PORT,
        tls: {
            rejectUnauthorized: false, // optional, can help avoid certain errors
            minVersion: 'TLSv1.2',
            maxVersion: 'TLSv1.3',
        },
    };

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

// SMTP
export async function sendMail(username: string, fqe: string, password: string, to: string, cc: string, bcc: string, subject: string, text: string, attachments: any): Promise<void> {
    const transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_MAIL_HOST,
        port: Number(process.env.NEXT_PUBLIC_SMTP_PORT),
        secure: true, // true for 465, false for other ports
        auth: {
            user: fqe, // your email
            pass: password // your email password
        },
        tls: {
            maxVersion: 'TLSv1.3',
            minVersion: 'TLSv1.2',
            ciphers: 'TLS_AES_128_GCM_SHA256',
        }
    });
    let info = await transporter.sendMail({
        from: `"${username}" <${fqe}>`, // sender address
        to: to, // list of receivers
        cc: cc, // list of carbon copy receivers
        bcc: bcc, // list of blind carbon copy receivers
        subject: subject, // Subject line
        text: text, // plain text body
        attachments: attachments // attachments
    });

    console.log('Message sent: %s', info.messageId);
}
