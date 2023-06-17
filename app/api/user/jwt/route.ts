import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { token, onlyVerify } = await request.json();

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    let verificationResult;
    try {
      verificationResult = jwt.verify(token, JWT_SECRET_KEY as string);
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.json(
        { message: "Token verification failed" },
        { status: 403 }
      );
    }

    if (onlyVerify) {
      return NextResponse.json({ isValid: true }, { status: 200 });
    } else {
      return NextResponse.json(verificationResult, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
