"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const res = await fetch("/api/profile");
      const data = await res.json();
      setForm(data);
      setLoading(false);
    };

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      alert("Profile updated!");
    } else {
      alert("Update failed");
    }
  };

  if (status === "loading" || loading) return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>You must be logged in.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <input
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full border p-2 rounded"
      />
      <input
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        value={form.email}
        disabled
        className="w-full border p-2 rounded bg-gray-100 text-gray-500"
      />
      <input
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full border p-2 rounded"
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
