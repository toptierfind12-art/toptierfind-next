import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Top Tier Find — Discover What Works Best For You',
  description: 'Take our quiz to find the best products, tools, and solutions matched to your needs.',
  keywords: 'quiz, product finder, affiliate, top products, recommendations',
  openGraph: {
    title: 'Top Tier Find',
    description: 'Find your perfect match — products handpicked for your lifestyle.',
    url: 'https://toptierfind.com',
    siteName: 'Top Tier Find',
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
      <body>{children}</body>
    </html>
  );
}
