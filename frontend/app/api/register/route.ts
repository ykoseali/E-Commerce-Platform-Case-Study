import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    await mongooseConnect();
    const data = await req.json();
    
    const { firstName, lastName, email, password, phoneNumber } = data;

if (!firstName || !lastName || !email || !password) {
  return NextResponse.json(
    { message: "All fields are required." },
    { status: 400 }
  );
}


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    

    return NextResponse.json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
