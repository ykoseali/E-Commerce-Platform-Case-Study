import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import { Order } from '@/models/Order';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const user = await User.findById(params.id).select('_id firstName lastName email phone');
    if (!user) {
      return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
    }

    const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });

    return new Response(JSON.stringify({ user, orders }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}
