import dbConnect from "@/utils/dbConn";
import { findOneDocument } from "@/utils/dbUtils";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    await dbConnect();

    let user_id = res.user_id;

    const user = await findOneDocument(User, { user_id: user_id });

    if (user == null) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
