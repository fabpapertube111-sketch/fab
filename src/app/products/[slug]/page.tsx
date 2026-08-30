import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug, getRelatedProducts } from '@/lib/wordpress';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.seoTitle || `${product.title} | Paper Tube`,
    description:
      product.seoDescription ||
      product.shortDescription.replace(/<[^>]*>/g, '').slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.shortDescription.replace(/<[^>]*>/g, '').slice(0, 160),
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [product, related] = await Promise.all([
    getProductBySlug(slug),
    getRelatedProducts(slug, 4),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
