'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/ui/Button';

export default function CategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/categories', { name, description });
      setName('');
      setDescription('');
      fetchCategories();
    } catch (err) {
      console.error('Failed to create category:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
  
    try {
      await axios.delete('/api/categories', { data: { id } });
      fetchCategories(); // refresh the list
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Categories</h1>

      <form onSubmit={handleCreate} className="space-y-3 bg-white p-4 rounded-xl shadow w-full md:w-1/2">
        <h2 className="text-lg font-semibold">Add New Category</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          rows={3}
          required
        />
        <Button type="submit">Add Category</Button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading categories...</p>
      ) : (
        <table className="w-full bg-white rounded-xl shadow text-sm mt-4">
          <thead>
  <tr className="text-left border-b">
    <th className="p-3">Name</th>
    <th className="p-3">Description</th>
    <th className="p-3 text-right">Actions</th>
  </tr>
</thead>
<tbody>
  {categories.map(cat => (
    <tr key={cat._id} className="border-b hover:bg-gray-50">
      <td className="p-3">{cat.name}</td>
      <td className="p-3">{cat.description}</td>
      <td className="p-3 text-right">
        <button
          onClick={() => handleDelete(cat._id)}
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
