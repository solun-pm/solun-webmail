import Imap from "imap";
import { simpleParser } from "mailparser";

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
            const { subject, date, textAsHtml } = mail;
            mails.push({ subject, date, body: textAsHtml });
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
