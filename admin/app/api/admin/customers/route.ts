// admin/app/api/admin/customers/route.ts

import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const customers = await User.find({ role: 'customer' }).select(
      '_id firstName lastName email phone'
    );

    return new Response(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch customers' }), { status: 500 });
  }
}
