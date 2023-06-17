import dbConnect from "@/utils/dbConn";
import { findOneDocument } from "@/utils/dbUtils";
import TempToken from "@/models/tempToken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    await dbConnect();

    let tempToken = res.tempToken;

    const dbRes = await findOneDocument(TempToken, { token: tempToken });

    if (dbRes == null) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    return NextResponse.json({fqe: dbRes.fqe, fast_login: dbRes.fast_login }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
