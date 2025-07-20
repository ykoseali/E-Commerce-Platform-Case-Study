'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);

    console.log('🧪 Sending to signIn:', data);
const res = await signIn('credentials', {
  ...data,
  redirect: false,
  callbackUrl: 'http://localhost:3000/dashboard',
}, {
  baseUrl: 'http://localhost:3001',
});
    

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      alert('Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Admin Login</h1>

        <input
          {...register('email')}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}

        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
