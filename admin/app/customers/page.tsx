// admin/app/customers/page.tsx

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomerListPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/admin/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error('Failed to load customers:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading customers...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Customers</h1>

      <table className="w-full bg-white rounded-xl shadow text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{customer.firstName} {customer.lastName}</td>
              <td className="p-3">{customer.email}</td>
              <td className="p-3">{customer.phone || '-'}</td>
              <td className="p-3">
                <Link
                  href={`/customers/${customer._id}`}
                  className="text-blue-600 underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
