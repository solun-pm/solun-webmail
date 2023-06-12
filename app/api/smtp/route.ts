import { NextResponse } from "next/server";
import { sendMail } from "@/utils/mailService";  // assume you've extended sendMail

export async function POST(req: Request) {
    try {
        const res = await req.json();

        const to = res.to;
        const cc = res.copy; // cc
        const bcc = res.blindcopy; // bcc
        const subject = res.subject;
        const message = res.message;
        const attachments = res.attachments; // handle attachments

        await sendMail(to, cc, bcc, subject, message, attachments);
        return NextResponse.json({ message: 'Ok' }, { status: 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({message: 'Error sending mail. ' + e}, { status: 500});
    }
}
