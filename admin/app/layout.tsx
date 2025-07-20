// admin/app/layout.tsx

import './globals.css';
import { Toaster } from 'react-hot-toast';
import AdminNav from '@/components/AdminNav';

export const metadata = {
  title: 'Admin Panel',
  description: 'E-commerce admin panel built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Toaster position="top-right" />
        <AdminNav />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
