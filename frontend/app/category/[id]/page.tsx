"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  images: string[];
};

export default function CategoryPage() {
  const params = useParams() as { id: string };
  const id = params.id;
    
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetch(`/api/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setCategoryName(data.category?.name || "");
      });
  }, [id]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Category: {categoryName}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {products.map((prod) => (
  <Link
    key={prod._id}
    href={`/product/${prod._id}`}
    className="bg-white border rounded-xl p-4 hover:shadow-md transition-all"
  >
    <img
      src={prod.images?.[0]}
      alt={prod.name}
      className="w-full h-32 object-cover rounded mb-2"
    />
    <h3 className="text-sm font-bold text-gray-900">{prod.name}</h3>
    <p className="text-blue-600 font-semibold">${prod.price}</p>
  </Link>
))}
      </div>
    </div>
  );
}
