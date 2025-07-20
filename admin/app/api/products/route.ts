import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';

export async function GET() {
  await connectDB();
  const products = await Product.find().populate('category');
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const created = await Product.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('[PRODUCT_CREATE_ERROR]', err);
    return NextResponse.json({ error: 'Create failed' }, { status: 500 });
  }
}
