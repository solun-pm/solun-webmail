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

export const fetchMails = async (fqe: string, password: string) => {

    const imapConfig: ImapConfig = {
        user: fqe,
        password: password,
        host: process.env.NEXT_PUBLIC_MAIL_HOST as string,
        port: process.env.NEXT_PUBLIC_IMAP_PORT as any,
        tls: true,
    };

    const config = {
        imap: imapConfig
    };

    let mails: Mail[] = [];

    try {
        const connection = await imaps.connect(config);
        await connection.openBox('INBOX');

        const searchCriteria = ['ALL'];
        const fetchOptions = {
            bodies: ['HEADER', 'TEXT', ''],
            struct: true
        };

        const messages = await connection.search(searchCriteria, fetchOptions);

        messages.forEach((message) => {
            const bodyPart = message.parts?.find(part => part.which === 'TEXT');
        
            const mailHeader = message.parts?.find(part => part.which === 'HEADER')?.body;
        
            if (mailHeader) {
                const mail: Mail = {
                    subject: mailHeader.subject ? mailHeader.subject[0] : '',
                    date: mailHeader.date ? new Date(mailHeader.date[0]) : new Date(),
                    body: bodyPart ? bodyPart.body : 'No body found',
                    senderName: mailHeader.from ? mailHeader.from[0] : '',
                    senderEmail: mailHeader.to ? mailHeader.to[0] : '',
                    recipient: mailHeader.cc ? mailHeader.cc[0] : ''
                };
        
                mails.push(mail);
            }
        });
    } catch (error) {
        console.error('Error fetching mails: ', error);
    }

    return mails;
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
