// app/api/products/route.ts

import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Category from "@/models/Category";
import type { SortOrder } from "mongoose";


export async function GET(req: NextRequest) {
  await mongooseConnect();

  const url = new URL(req.url);
  const search = url.searchParams.get("q");
  const category = url.searchParams.get("category");
  const sort = url.searchParams.get("sort") || "newest";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 8;
  const skip = (page - 1) * limit;

  const query: any = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  let sortBy: { [key: string]: SortOrder } = { createdAt: -1 };

  if (sort === "price_asc") sortBy = { price: 1 };
  if (sort === "price_desc") sortBy = { price: -1 };

  const products = await Product.find(query)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .populate("category")
    .lean();

  const total = await Product.countDocuments(query);

  return NextResponse.json({
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}
