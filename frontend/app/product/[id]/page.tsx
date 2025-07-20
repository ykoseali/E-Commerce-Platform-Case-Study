"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
};

export default function ProductDetailPage() {
  const params = useParams() as { id: string };
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [recent, setRecent] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/product/${id}`)
      .then((res) => res.json())
      .then((p) => {
        setProduct(p);

        // Fetch related
        fetch(`/api/related/${p._id}`)
          .then((res) => res.json())
          .then(setRelated);

        // Handle recently viewed
        const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
        const filtered = viewed.filter((v: Product) => v._id !== p._id);
        const updated = [{ ...p }, ...filtered].slice(0, 6);
        localStorage.setItem("recentlyViewed", JSON.stringify(updated));
        setRecent(updated);
      });
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* Main Product */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <img
  src={product.images?.[0]}
  alt={product.name}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/placeholder.png";
  }}
  className="w-full h-32 object-cover rounded mb-2"
/>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-blue-600 font-semibold">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>

          <button
            onClick={() =>
              addToCart({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0],
                quantity: 1,
              })
            }
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {related.map((prod) => (
              <Link
                key={prod._id}
                href={`/product/${prod._id}`}
                className="border p-3 rounded hover:shadow block"
              >
                <img src={prod.images?.[0]} className="h-24 w-full object-cover rounded" />
                <h3 className="text-sm font-semibold mt-2">{prod.name}</h3>
                <p className="text-blue-600 font-medium">${prod.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recent.length > 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Recently Viewed</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {recent.map((prod) => (
              <Link
                key={prod._id}
                href={`/product/${prod._id}`}
                className="border p-3 rounded hover:shadow block"
              >
                <img src={prod.images?.[0]} className="h-24 w-full object-cover rounded" />
                <h3 className="text-sm font-semibold mt-2">{prod.name}</h3>
                <p className="text-blue-600 font-medium">${prod.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
