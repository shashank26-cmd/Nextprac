import connectDB from "@/db";
import User from "@/app/backend/models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const maxAgeInSeconds = 60 * 24 * 60 * 60;

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email or password is missing" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Email does not exist" },
        { status: 404 }
      );
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const secret = "your-secret-key";

    const token = sign({ userId: user._id }, secret, {
      expiresIn: "30d",
    });
    const serialized = serialize("OutSiteJWT", token, {
      httpOnly: true,
      secure: "production",
      maxAge: maxAgeInSeconds,
      path: "/",
    });

    return new NextResponse(
        { success: true, token },
        { status: 200, headers: { "Set-Cookie": serialized } }
      );
  } catch (error) {
    console.error("Error setting cookie:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
