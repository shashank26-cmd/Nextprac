import connectDB from "@/db";
import User from "@/app/backend/models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export  async function POST(req) {
  await connectDB();
  const { name, email, password } =await req.json();
  console.log(name, email, password );
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Something is not present" },
      { status: 501}
    );
  }

  const emailExists = await User.findOne({ email:email });
console.log("sdefer")
  if (emailExists) {
    return NextResponse.json({ error: "user already exists" }, { status: 503 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  const result = await newUser.save();
console.log("this is result",result)
  const token = jwt.sign({ token: result._id }, "Code_Aj", {
    expiresIn: "30d",
  });
  return NextResponse.json(
    { success: true, message: "Account Created Successfully", result , token},
    { status: 201 }
  );
}
