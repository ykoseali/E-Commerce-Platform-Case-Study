import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

export async function mongooseConnect() {

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is invalid or not defined");
  }

  return mongoose.connect(process.env.MONGODB_URI, { dbName: "test" }); // 🛠 Optional: explicitly set dbName
}

