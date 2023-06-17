import dbConnect from "@/utils/dbConn";
import { findOneCASEDocument, findOneDocument, deleteOneDocument } from "@/utils/dbUtils";
import TempToken from "@/models/tempToken";
import User from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { decrypt } from "@/utils/encryption";
import { comparePassword } from "@/utils/hash";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    await dbConnect();

    let fqe = res.fqe;
    let password = res.password;
    let tempToken = res.tempToken;
    let decryptToken = res.decryptToken;
    let fast_login = res.fast_login;

    const db = await findOneCASEDocument(User, { fqe: fqe });
    const dbTemp = await findOneDocument(TempToken, { token: tempToken });

    if (fast_login) {
        password = decrypt(dbTemp.password, decryptToken);
    }

    if (!await comparePassword(password, db.password)) {
      return NextResponse.json(
          { message: "User does not exist or password is incorrect" },
          { status: 400 }
      );
    };

    const decryptedPrivateKey = decrypt(db.private_key, password);

    if (decryptedPrivateKey == ""){
        return NextResponse.json(
            { message: "User does not exist or password is incorrect" },
            { status: 400 }
        );
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
        {
            fqe: fqe,
            username: db.username,
            user_id: db.user_id,
            private_key: decryptedPrivateKey,
            password: password,
        },
        // @ts-ignore
        JWT_SECRET_KEY,
        { expiresIn: "3h" }
    );

    await deleteOneDocument(TempToken, { token: tempToken });

    return NextResponse.json({ token: token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
