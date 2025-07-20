"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();

  // While loading session, render nothing (or a spinner)
  if (status === "loading") return null;

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 sticky top-0 z-50 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-gray-800">E-Shop</Link>

      <div className="flex items-center gap-4">
        <Link href="/products" className="hover:underline">Products</Link>
        <Link href="/cart" className="hover:underline">Cart</Link>

        {!session ? (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <button onClick={() => signOut()} className="hover:underline text-red-600">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
