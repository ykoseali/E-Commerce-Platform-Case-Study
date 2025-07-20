"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border-b pb-4">
              <img src={item.image} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p>${item.price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                  className="w-16 border rounded p-1 mt-2"
                  min={1}
                />
              </div>
              <button onClick={() => removeFromCart(item._id)} className="text-red-500">
                Remove
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-lg">Total: ${total.toFixed(2)}</div>

          <button
            onClick={handleCheckout}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
