'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log('SESSION IN ADMIN:', session);
  console.log('STATUS:', status);

  useEffect(() => {
    if (status === 'loading') return;

    // Redirect if no session or not an admin
    if (!session || session.user.role !== 'admin') {
      router.push('/login'); // or '/'
    }
  }, [session, status, router]);

  if (status === 'loading') return <p className="p-6">Loading...</p>;

  return <>{children}</>;
}
