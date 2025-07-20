// admin/app/orders/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderDetailPage() {
  const { id } = useParams() as { id: string };
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/admin/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!order) return <div className="p-4 text-red-600">Order not found</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Order Details</h1>

      <div className="bg-white shadow p-4 rounded-xl space-y-2">
        <h2 className="text-lg font-semibold">Customer</h2>
        <p><strong>Name:</strong> {order.user?.firstName} {order.user?.lastName}</p>
        <p><strong>Email:</strong> {order.user?.email}</p>
      </div>

      <div className="bg-white shadow p-4 rounded-xl space-y-2">
        <h2 className="text-lg font-semibold">Shipping Address</h2>
        <p>{order.shippingAddress?.street}</p>
        <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
        <p>{order.shippingAddress?.country}</p>
      </div>

      <div className="bg-white shadow p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Items</h2>
        <ul className="space-y-2">
          {order.items.map((item: any) => (
            <li key={item._id} className="flex justify-between border-b pb-1">
              <div>{item.product?.title || 'Unknown'} (x{item.quantity})</div>
              <div>${Number(item.product?.price ?? 0).toFixed(2)}</div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right font-bold">
        Total: ${Number(order.total ?? order.totalAmount ?? 0).toFixed(2)}
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-1">Order Status</h2>
        <p className="capitalize">{order.status}</p>
      </div>
    </div>
  );
}
