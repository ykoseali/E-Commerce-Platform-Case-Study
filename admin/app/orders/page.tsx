'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (search) params.append('search', search);

      const res = await axios.get(`/api/admin/orders?${params.toString()}`);
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await axios.put('/api/admin/orders', { orderId, status: newStatus });
      toast.success('Order status updated');
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Orders</h1>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <input
          type="text"
          placeholder="Search by email or order ID"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-64"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-48"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
        <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Search
        </Button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : (
        <table className="w-full bg-white rounded-xl shadow text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Total</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order._id}</td>
                <td className="p-3">{order.user?.email || '-'}</td>
                <td className="p-3 capitalize">{order.status}</td>
                <td className="p-3">${Number(order.total ?? order.totalAmount ?? 0).toFixed(2)}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <Link href={`/orders/${order._id}`} className="text-blue-600 underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
