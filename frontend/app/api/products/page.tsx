"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductsPage() {
  const [data, setData] = useState<any>({});
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryString = searchParams?.toString() ?? "";

  useEffect(() => {
    fetch("/api/products?" + queryString)
      .then((res) => res.json())
      .then(setData);
  }, [queryString]);

  const handleChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams ?? undefined);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push("/products?" + params.toString());
  };

  return (
    <div className="p-6 space-y-6">
      {/* Filter Bar */}
      <div className="flex gap-4 items-center flex-wrap">
        <input
          placeholder="Search..."
          onChange={(e) => handleChange("q", e.target.value)}
          className="border p-2 rounded"
        />
        <select onChange={(e) => handleChange("category", e.target.value)} className="border p-2 rounded">
          <option value="">All Categories</option>
          {/* Replace with dynamic categories later */}
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
        <select onChange={(e) => handleChange("sort", e.target.value)} className="border p-2 rounded">
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.products?.map((prod: any) => (
          <div key={prod._id} className="border p-4 rounded">
            <img src={prod.images?.[0]} alt={prod.name} className="w-full h-32 object-cover mb-2 rounded" />
            <h3 className="text-sm font-bold">{prod.name}</h3>
            <p className="text-blue-600">${prod.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2">
        {Array.from({ length: data.pages || 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleChange("page", String(i + 1))}
            className={`px-3 py-1 border rounded ${data.page === i + 1 ? "bg-blue-600 text-white" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
