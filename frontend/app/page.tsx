"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";

type Product = {
  _id: string;
  name: string;
  price: number;
  images: string[];
};

type Category = {
  _id: string;
  name: string;
  image: string;
};

export default function HomePage() {
  const [data, setData] = useState<{
    categories: Category[];
    featuredProducts: Product[];
    newArrivals: Product[];
  }>({
    categories: [],
    featuredProducts: [],
    newArrivals: [],
  });

  useEffect(() => {
    fetch("/api/home-data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="bg-gray-50 px-6 py-10 space-y-12 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Our Store</h1>
        <p className="text-gray-600">Shop the latest and greatest products</p>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {data.categories.map((cat) => (
            <CategoryCard
              key={cat._id}
              _id={cat._id}
              name={cat.name}
              image={cat.image}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {data.featuredProducts.map((prod) => (
            <ProductCard
              key={prod._id}
              _id={prod._id}
              name={prod.name}
              price={prod.price}
              image={prod.images?.[0]}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {data.newArrivals.map((prod) => (
            <ProductCard
              key={prod._id}
              _id={prod._id}
              name={prod.name}
              price={prod.price}
              image={prod.images?.[0]}
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-100 py-8 text-center rounded">
        <h2 className="text-xl font-bold mb-2">Join our Newsletter</h2>
        <div className="flex justify-center gap-2 mt-2 flex-wrap">
          <input
            type="email"
            placeholder="you@example.com"
            className="border px-4 py-2 rounded w-64"
          />
          <button className="bg-black text-white px-4 py-2 rounded">Subscribe</button>
        </div>
      </section>
    </div>
  );
}
