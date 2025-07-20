// admin/app/api/admin/orders/[id]/route.ts

import connectDB from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { User } from '@/models/User';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const order = await Order.findById(params.id).populate('user'); // populate user info

    if (!order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}
