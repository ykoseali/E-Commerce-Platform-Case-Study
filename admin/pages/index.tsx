import RequireAdmin from "@/components/RequireAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
};

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  async function deleteProduct(id: string) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await axios.delete("/api/products?id=" + id);
    setProducts(products.filter((p) => p._id !== id));
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Products</h1>
        <Link href="/products/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add New
        </Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border">Title</th>
            <th className="text-left p-2 border">Price</th>
            <th className="text-left p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">{p.title}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2 space-x-2">
                <Link
                  href={`/products/edit/${p._id}`}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminHome() {
  return (
    <RequireAdmin>
      <ProductsPage />
    </RequireAdmin>
  );
}
