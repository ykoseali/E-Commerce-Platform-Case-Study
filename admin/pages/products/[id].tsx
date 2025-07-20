import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
  image?: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`/api/products?id=${id}`).then(res => {
        setTitle(res.data.title);
        setPrice(res.data.price);
        setImage(res.data.image || "");
      });
    }
  }, [id]);

  async function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await axios.post("/api/upload", formData);
      setImage(res.data.url);
    } catch (err) {
      console.error("Upload failed", err);
    }
    setUploading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await axios.put("/api/products?id=" + id, { title, price, image });
    router.push("/products");
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            className="border p-2 w-full"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            className="border p-2 w-full"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Product Image</label>
          <input type="file" onChange={uploadImage} />
          {uploading && <p>Uploading...</p>}
          {image && (
            <div className="mt-2">
              <img src={image} alt="Preview" className="h-24 border rounded" />
            </div>
          )}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
        <Link href="/products" className="ml-2 text-gray-600">Cancel</Link>
      </form>
    </div>
  );
}
