// admin/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<null | {
    totalSales: number;
    totalOrders: number;
    totalCustomers: number;
    salesByMonth: Record<string, number>;
    orderStatusCounts: Record<string, number>;
  }>(null);

  useEffect(() => {
    axios.get('/api/dashboard/metrics')
      .then(res => setMetrics(res.data))
      .catch(err => console.error('Failed to load metrics:', err));
  }, []);

  if (!metrics) return <div className="p-4 text-gray-500">Loading dashboard...</div>;

  const salesData = Object.entries(metrics.salesByMonth).map(([month, value]) => ({
    month,
    total: value
  }));

  const statusData = Object.entries(metrics.orderStatusCounts).map(([status, count]) => ({
    name: status,
    value: count
  }));

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Sales</p>
          <p className="text-xl font-bold">${metrics.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-xl font-bold">{metrics.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Customers</p>
          <p className="text-xl font-bold">{metrics.totalCustomers}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Sales by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Order Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                label
                outerRadius={100}
                dataKey="value"
              >
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
