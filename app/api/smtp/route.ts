import { NextResponse } from "next/server";
import {sendMail} from "@/utils/mailService";

export async function POST(req: Request) {
    try {
        const res = await req.json();

        const to = res.to;
        const subject = res.subject;
        const message = res.message;

        await sendMail(to, subject, message);
        return NextResponse.json({ message: 'Ok' }, { status: 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({message: 'Error sending mail' + e}, { status: 500});
    }
}