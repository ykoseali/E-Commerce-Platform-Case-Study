'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function EditProductPage() {
  const router = useRouter();
  const rawParams = useParams() ?? {};
  const id = Array.isArray(rawParams.id) ? rawParams.id[0] : rawParams.id;




  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      const prod = res.data;
      setForm({
        title: prod.title || '',
        description: prod.description || '',
        price: prod.price || '',
        stock: prod.stock || '',
      });
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, form, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Product updated!');
      router.push('/products');
    } catch (err) {
      toast.error('Update failed');
      console.error(err);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2 w-full" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
