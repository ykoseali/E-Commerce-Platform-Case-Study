// admin/api/dashboard/metrics.ts
import connectDB from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { User } from '@/models/User';


export async function GET() {
  await connectDB();

  const [totalOrders, totalCustomers, orders] = await Promise.all([
    Order.countDocuments(),
    User.countDocuments({ role: 'customer' }),
    Order.find({})
  ]);

  const totalSales = orders.reduce((sum: number, order: any) => sum + order.total, 0);

  const salesByMonth: Record<string, number> = {};
  const orderStatusCounts: Record<string, number> = {};

  orders.forEach((order: any) => {
    const date = new Date(order.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    salesByMonth[key] = (salesByMonth[key] || 0) + order.total;

    orderStatusCounts[order.status] = (orderStatusCounts[order.status] || 0) + 1;
  });

  return Response.json({
    totalSales,
    totalOrders,
    totalCustomers,
    salesByMonth,
    orderStatusCounts
  });
}
