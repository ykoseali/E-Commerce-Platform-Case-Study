import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET() {
  await mongooseConnect();

  const featuredProducts = await Product.find({ featured: true }).limit(8).lean();
  const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8).lean();
  const categories = await Category.find({ active: true }).lean();

  return NextResponse.json({
    featuredProducts,
    newArrivals,
    categories,
  });
}
