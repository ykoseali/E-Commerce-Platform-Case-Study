import React from 'react'; // even if unused (optional with react-jsx)

'use client';
import Link from 'next/link';
import { useCartStore } from '../lib/cartStore';
import { useAuthStore } from '../lib/authStore';

export default function Header() {
  const { items } = useCartStore();
  const { user, logout } = useAuthStore();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white shadow-sm sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-blue-600">
        E-Shop
      </Link>

      <nav className="flex items-center gap-4">
        <Link href="/products">Products</Link>
        <Link href="/cart" className="relative">
          Cart
          {cartCount > 0 && (
            <span className="ml-1 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="text-sm text-gray-600">Hi, {user.firstName}</span>
            <button onClick={logout} className="text-blue-500 underline">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-blue-500 underline">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
