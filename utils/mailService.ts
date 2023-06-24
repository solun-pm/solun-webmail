import * as imaps from 'imap-simple';
import nodemailer from 'nodemailer';

interface Mail {
    subject: string;
    date: Date;
    body: string;
    senderName: string;
    senderEmail: string;
    recipient: string;
}

interface ImapConfig {
    user: string;
    password: string;
    host: string;
    port: number;
    tls: any;
}

    export const fetchMails = async (fqe: string, password: string): Promise<Mail[]> => {

    const imapConfig: ImapConfig = {
        user: 'dw.solun@cyberlinx.de',
        password: 'beno21',
        host: 'mail.cyberlinx.de',
        port: 993,
        tls: true,
        /*user: fqe, // fqe
        password: password, // user pwd
        host: process.env.NEXT_PUBLIC_MAIL_HOST,
        port: process.env.NEXT_PUBLIC_IMAP_PORT,
        tls: true,*/
    };

    const config = {
        imap: imapConfig
    };

    return imaps.connect(config).then((connection) => {
        return connection.openBox('INBOX').then(() => {
            let mails: Mail[] = [];
            const searchCriteria = ['ALL'];
            const fetchOptions = {
                bodies: ['HEADER', 'TEXT', ''],
                struct: true
            };

            return connection.search(searchCriteria, fetchOptions).then((messages) => {
                messages.forEach((item) => {
                    if (item.attributes.struct) {
                        const all = imaps.getParts(item.attributes.struct).find(part => part.which === '');
                        const id = item.attributes.uid;
                        const subject = item.parts.filter(part => part.which === 'HEADER')[0].body.subject[0];
                        const date = item.parts.filter(part => part.which === 'HEADER')[0].body.date[0];
                        const from = item.parts.filter(part => part.which === 'HEADER')[0].body.from[0];
                        const to = item.parts.filter(part => part.which === 'HEADER')[0].body.to[0];
                        mails.push({ subject, date, body: all.body, senderName: from, senderEmail: from, recipient: to });
                    }
                });
                return mails;
            });
        });
    });
};

// SMTP
export async function sendMail(username: string, fqe: string, password: string, to: string, cc: string, bcc: string, subject: string, text: string, attachments: any): Promise<void> {
    const transporter = nodemailer.createTransport({
        host: 'mail.cyberlinx.de',
        port: 465,
        secure: true,
        auth: {
            user: 'dw.solun@cyberlinx.de',
            pass: 'beno21'
        },
        tls: {
            maxVersion: 'TLSv1.3',
            minVersion: 'TLSv1.2',
            ciphers: 'TLS_AES_128_GCM_SHA256',
        }
        /*host: process.env.NEXT_PUBLIC_MAIL_HOST,
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
        }*/
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
