// admin/app/customers/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomerDetailPage() {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<{ user: any; orders: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/admin/customers/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Failed to load customer', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!data) return <div className="p-4 text-red-600">Customer not found</div>;

  const { user, orders } = data;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Customer Details</h1>

      <div className="bg-white p-4 shadow rounded-xl">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || '-'}</p>
      </div>

      <div className="bg-white p-4 shadow rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Order History</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order._id} className="border-b pb-2">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <p><strong>Items:</strong> {order.items.map((item: any) => `${item.name} (x${item.quantity})`).join(', ')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
