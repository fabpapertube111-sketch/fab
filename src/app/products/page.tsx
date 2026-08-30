import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getAllProducts } from '@/lib/wordpress';
import ProductsPageClient from './ProductsPageClient';

export const metadata: Metadata = {
  title: 'Paper Tube Products | All Product Types',
  description:
    'Explore FAB Paper Tube products — sewing thread tubes, notebook cover tubes, thermal roll tubes, firecracker tubes, candle tubes, stretch film tubes and more. Custom sizes available.',
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  return <ProductsPageClient products={products} />;
}
