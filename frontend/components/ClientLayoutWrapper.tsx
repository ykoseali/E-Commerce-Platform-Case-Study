"use client";

import { CartProvider } from "@/context/CartContext";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
