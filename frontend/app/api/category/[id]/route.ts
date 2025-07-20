import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await mongooseConnect();

  const category = await Category.findById(params.id);
  const products = await Product.find({ category: params.id }).lean();

  return NextResponse.json({ category, products });
}
