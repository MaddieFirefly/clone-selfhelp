import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cat Self-Help Companion',
  description: 'Cat-themed Finch-like self-help loop with API-first architecture',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
