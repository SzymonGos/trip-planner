import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './lib/providers/providers';

export const metadata: Metadata = {
  title: 'Holiday Planner AI',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
