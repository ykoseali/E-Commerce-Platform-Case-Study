'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function AdminNav() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="flex gap-6 items-center text-sm font-medium text-gray-700">
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <Link href="/orders" className="hover:text-blue-600">Orders</Link>
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <Link href="/categories" className="hover:text-blue-600">Categories</Link>
        <Link href="/customers" className="hover:text-blue-600">Customers</Link>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="text-sm text-red-600 hover:underline"
      >
        Sign Out
      </button>
    </nav>
  );
}
