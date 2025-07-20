import { NextResponse } from 'next/server';
import  connectDB  from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { User } from '@/models/User';
import { Product } from '@/models/Product';

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
  .populate('user')
  .populate('items.product'); // ✅ needed for popularProducts

    const users = await User.find();
    const products = await Product.find();

    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const orderCount = orders.length;
    const userCount = users.length;

    const salesByMonth: Record<string, number> = {};
    const orderStatusCounts: Record<string, number> = {};
    const productFrequency: Record<string, number> = {};

    orders.forEach((order) => {
      // Sales by month
      const date = new Date(order.createdAt);
      const month = date.toLocaleString('default', { month: 'short' });
      salesByMonth[month] = (salesByMonth[month] || 0) + order.totalAmount;

      // Order status
      const status = order.status || 'unknown';
      orderStatusCounts[status] = (orderStatusCounts[status] || 0) + 1;

      // Count product frequency
      order.items.forEach((item: { product: any; quantity: number }) => {
        const productId = item.product?._id?.toString();
        if (productId) {
          productFrequency[productId] = (productFrequency[productId] || 0) + item.quantity;
        }
      });
    });

    // Recent 5 orders
    const recentOrders = orders
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map((order) => ({
        _id: order._id,
        customer: order.user?.email,
        total: order.totalAmount,
        status: order.status,
        date: order.createdAt,
      }));

    // Top 5 products by frequency
    const popularProducts = Object.entries(productFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([productId, count]) => {
        const product = products.find((p) => p._id.toString() === productId);
        return {
          _id: productId,
          title: product?.title || 'Unknown Product', // ✅ fix here
          count,
        };
      });
      

    return NextResponse.json({
      totalSales,
      orderCount,
      userCount,
      salesByMonth,
      orderStatusCounts,
      recentOrders,
      popularProducts,
    });
  } catch (err) {
    console.error('[DASHBOARD_METRICS_ERROR]', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
