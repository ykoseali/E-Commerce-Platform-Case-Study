// admin/app/api/admin/orders/route.ts

import connectDB from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { User } from '@/models/User';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query: any = {};

    // If filtering by status
    if (status) {
      query.status = status;
    }

    let orders = await Order.find(query)
      .populate('user')
      .sort({ createdAt: -1 });

    // If filtering by email or ID (after populating user)
    if (search) {
      const lowerSearch = search.toLowerCase();
      orders = orders.filter(order =>
        order._id.toString().includes(lowerSearch) ||
        order.user?.email?.toLowerCase().includes(lowerSearch)
      );
    }

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to fetch orders' }), { status: 500 });
  }
}
