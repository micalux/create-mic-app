import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'create-mic-app',
  description: 'Standard Next.js stack boilerplate',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
