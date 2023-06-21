import { NextResponse } from "next/server";
import { fetchMails } from "@/utils/mailService";

export async function POST(req: Request) {
    const res = await req.json();
    try {
        const mails = await fetchMails(res.fqe, res.password);
        return NextResponse.json({ mails }, { status: 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({message: 'Error fetching imap' + e}, { status: 500});
    }
}