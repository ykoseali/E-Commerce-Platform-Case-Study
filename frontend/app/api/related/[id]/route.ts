import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

interface LeanProduct {
  _id: string;
  category: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await mongooseConnect();

  const current = (await Product.findById(params.id).lean()) as LeanProduct | null;

  if (!current) {
    return NextResponse.json([], { status: 200 });
  }

  const related = await Product.find({
    category: current.category,
    _id: { $ne: current._id },
  })
    .limit(6)
    .lean();

  return NextResponse.json(related);
}
