'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      toast.error('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    router.push(`/products/edit/${product._id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success('Product deleted');
      fetchProducts(); // Refresh after delete
    } catch (err) {
      toast.error('Delete failed');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Products</h1>
        <button
          onClick={() => router.push('/products/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product._id} className="border-t">
                <td className="p-3">{product.title}</td>
                <td className="p-3">${Number(product.price || 0).toFixed(2)}</td>
                <td className="p-3">{product.stock ?? '-'}</td>
                <td className="p-3">{product.category?.name || 'Uncategorized'}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
