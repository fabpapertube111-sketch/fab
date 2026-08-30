import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 – Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f4f0] text-center px-4 pt-20">
      <div className="max-w-md">
        <div className="text-[8rem] font-black text-[#e5e5e5] leading-none select-none mb-2">
          404
        </div>
        <div className="w-12 h-1 bg-[#c8922a] mx-auto mb-6" />
        <h1 className="text-2xl font-black text-[#1a1a1a] mb-3">Page Not Found</h1>
        <p className="text-[#6b6b6b] text-sm leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved. Browse our products or
          return to the homepage.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="bg-[#c8922a] text-white font-semibold px-6 py-3 rounded-sm hover:bg-[#a67520] transition-colors text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="bg-white border border-[#e5e5e5] text-[#1a1a1a] font-semibold px-6 py-3 rounded-sm hover:bg-[#f5f4f0] transition-colors text-sm"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}
