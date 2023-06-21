import { NextResponse } from "next/server";
import { sendMail } from "@/utils/mailService";  // assume you've extended sendMail

export async function POST(req: Request) {
    try {
        const res = await req.json();

        let to = res.to
            .filter((emailObj: { email: string, valid: boolean }) => emailObj.valid)
            .map((emailObj: { email: string, valid: boolean }) => emailObj.email)
            .join(', ');
        const cc = res.copy; // cc
        const bcc = res.blindcopy; // bcc
        const subject = res.subject;
        const message = res.message;
        const attachments = res.attachments; // handle attachments

        const username = res.username;
        const fqe = res.fqe;
        const password = res.password;

        await sendMail(username, fqe, password, to, cc, bcc, subject, message, attachments);
        return NextResponse.json({ message: 'Ok' }, { status: 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({message: 'Error sending mail. ' + e}, { status: 500});
    }
}
