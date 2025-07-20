import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    console.error('[PRODUCT_UPDATE_ERROR]', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    console.error('[PRODUCT_DELETE_ERROR]', err);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();
  
    try {
      const product = await Product.findById(params.id).populate('category');
  
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
  
      return NextResponse.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
  }
