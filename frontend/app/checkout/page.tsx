"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cart }),
      });

      if (res.ok) {
        clearCart();
        router.push("/order-confirmation");
      } else {
        alert("Order failed.");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* Shipping Form */}
      <div className="space-y-4">
        {["name", "email", "address", "city", "postalCode"].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="w-full border p-2 rounded"
          />
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="text-right font-bold text-lg">Total: ${total.toFixed(2)}</div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading || cart.length === 0}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 w-full"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
