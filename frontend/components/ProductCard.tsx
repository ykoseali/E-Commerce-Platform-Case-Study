"use client";

import Link from "next/link";

type ProductCardProps = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ _id, name, price, image }: ProductCardProps) {
  return (
    <Link
      href={`/product/${_id}`}
      className="bg-white border rounded-xl p-4 hover:shadow-lg transition-all flex flex-col"
    >
      <div className="h-36 w-full overflow-hidden rounded mb-3 bg-gray-100">
        <img
          src={image}
          alt={name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/placeholder.png";
          }}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-blue-600 font-medium">${price}</p>
      </div>
    </Link>
  );
}
