'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    axios.get('/api/dashboard/metrics').then((res) => {
      setMetrics(res.data);
    });
  }, []);

  if (!metrics) return <div className="p-4 text-gray-500">Loading dashboard...</div>;

  const salesData = metrics.salesByMonth
  ? Object.entries(metrics.salesByMonth).map(([month, total]) => ({
      month,
      total,
    }))
  : [];


  const statusData = metrics.orderStatusCounts
  ? Object.entries(metrics.orderStatusCounts).map(([status, count]) => ({
      name: status,
      value: count,
    }))
  : [];


  return (
    <div className="p-6 space-y-8">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Sales</p>
          <p className="text-xl font-bold">
          ${metrics.totalSales ? metrics.totalSales.toFixed(2) : '0.00'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-xl font-bold">{metrics.orderCount ?? 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Customers</p>
          <p className="text-xl font-bold">{metrics.userCount ?? 0}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 mb-2">Sales by Month</p>
          <Bar
            data={{
              labels: salesData.map((d) => d.month),
              datasets: [{ label: 'Sales', data: salesData.map((d) => d.total), backgroundColor: '#3b82f6' }],
            }}
            options={{ responsive: true }}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 mb-2">Order Status Distribution</p>
          <Pie
            data={{
              labels: statusData.map((d) => d.name),
              datasets: [{ data: statusData.map((d) => d.value), backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'] }],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500 mb-4">Recent Orders</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {metrics.recentOrders.map((order: any) => (
              <tr key={order._id} className="border-b">
                <td className="py-2">{order._id.slice(-6)}</td>
                <td className="py-2">{order.customer || 'N/A'}</td>
                <td className="py-2">
  ${Number(order.total || order.totalAmount || 0).toFixed(2)}
</td>

                <td className="py-2 capitalize">{order.status}</td>
                <td className="py-2">{new Date(order.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popular Products */}
      <div className="bg-white p-6 rounded-xl shadow">
  <p className="text-gray-500 mb-4">Popular Products</p>
  {Array.isArray(metrics.popularProducts) && metrics.popularProducts.length > 0 ? (
    <ul className="space-y-2">
      {metrics.popularProducts.map((prod: any, i: number) => (
        <li key={prod._id} className="flex justify-between">
          <span>#{i + 1} {prod.title}</span>
          <span className="text-gray-500">{prod.count} sold</span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-400 italic">No popular products yet.</p>
  )}
</div>

    </div>
  );
}
