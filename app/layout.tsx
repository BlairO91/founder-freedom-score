import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Founder Freedom Score™ | Thriving Founder',
  description:
    'Discover your readiness to transition from corporate life to entrepreneurship. A strategic diagnostic across the 4 Foundations: Clarity, Capacity, Cashflow, and Confidence.',
  openGraph: {
    title: 'Founder Freedom Score™ | Thriving Founder',
    description:
      'Discover your readiness to transition from corporate life to entrepreneurship.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
