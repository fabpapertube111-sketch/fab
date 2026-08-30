import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fabpapertube.com'),
  title: {
    default: 'FAB Paper Tube | Paper Tube & Paper Core Manufacturer, Ahmedabad',
    template: '%s | FAB Paper Tube',
  },
  description:
    'FAB Paper Tube manufactures quality paper tubes and paper cores since 2013. Specializing in small-size and small-diameter paper tubes. Serving textile, packaging, cracker, candle and industrial sectors from Ahmedabad, Gujarat.',
  keywords: [
    'paper tube manufacturer',
    'paper core manufacturer',
    'small diameter paper tube',
    'sewing thread tube',
    'thermal roll tube',
    'firecracker paper tube',
    'stretch film tube',
    'Ahmedabad paper tube',
    'Gujarat paper tube',
    'paper core supplier India',
  ],
  authors: [{ name: 'FAB Paper Tube' }],
  creator: 'FAB Paper Tube',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fabpapertube.com',
    siteName: 'FAB Paper Tube',
    title: 'FAB Paper Tube | Paper Tube & Paper Core Manufacturer',
    description:
      'Quality Paper Tubes manufactured with precision. Small-size specialists since 2013. Ahmedabad, Gujarat.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAB Paper Tube | Paper Tube Manufacturer',
    description: 'Quality paper tubes with precision. Small-size specialists since 2013.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
