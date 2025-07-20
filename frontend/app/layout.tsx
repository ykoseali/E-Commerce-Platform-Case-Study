// app/layout.tsx
"use client";

import './globals.css';
import { ReactNode } from 'react';
import { Providers } from './providers';
import NavBar from '@/components/NavBar';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Basic metadata */}
        <meta charSet="utf-8" />
        <title>E-Commerce App</title>
        <meta name="description" content="Case Study Fullstack Project" />

        {/* —— Tailwind via CDN — guarantees all utilities instantly —— */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <Providers>
          <NavBar />
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
