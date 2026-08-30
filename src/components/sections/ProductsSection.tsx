'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Package, MoveRight } from 'lucide-react';
import { viewportConfig } from '@/lib/animations';
import type { Product } from '@/types';

interface Props { products: Product[] }

function FeaturedCard({ product }: { product: Product }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden col-span-1 lg:col-span-2"
      style={{ minHeight: '420px' }}
    >
      <div className="absolute inset-0">
        {product.featuredImage ? (
          <Image src={product.featuredImage.url} alt={product.featuredImage.alt || product.title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" priority />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#1a3a6b' }}>
            <Package size={64} style={{ color: 'rgba(255,255,255,0.12)' }} />
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,22,48,0.88) 0%, rgba(10,22,48,0.50) 60%, rgba(10,22,48,0.15) 100%)' }} />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10" style={{ minHeight: '420px' }}>
        <div>
          {product.usedFor.length > 0 && (
            <span className="inline-block rounded-full font-semibold" style={{ background: 'rgba(200,146,42,0.22)', color: '#e0a83b', fontSize: '11px', padding: '5px 14px', border: '1px solid rgba(200,146,42,0.38)' }}>
              {product.usedFor[0]}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-black text-white leading-tight mb-3" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)' }}>{product.title}</h3>
          <p className="mb-6 leading-relaxed line-clamp-2" style={{ color: 'rgba(200,218,245,0.75)', fontSize: '14px' }}>{product.shortDescription.replace(/<[^>]*>/g, '')}</p>
          <Link href={`/products/${product.slug}`} className="group/btn inline-flex items-center gap-2.5 font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)', color: 'white', fontSize: '13.5px', padding: '12px 24px', boxShadow: '0 4px 18px rgba(26,74,158,0.40)' }}>
            View Product
            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function SideCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-0">
        {product.featuredImage ? (
          <Image src={product.featuredImage.url} alt={product.featuredImage.alt || product.title} fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
        ) : (
          <div className="absolute inset-0" style={{ background: '#1a3a6b' }} />
        )}
        <div className="absolute inset-0 transition-opacity duration-400" style={{ background: 'linear-gradient(180deg, rgba(10,22,48,0.22) 0%, rgba(10,22,48,0.82) 100%)' }} />
      </div>
      <div className="relative z-10 flex flex-col justify-end p-5" style={{ minHeight: '200px' }}>
        <div className="flex items-end justify-between gap-3">
          <div>
            {product.usedFor.length > 0 && (
              <span className="inline-block rounded-full font-semibold mb-1.5" style={{ background: 'rgba(200,146,42,0.22)', color: '#e0a83b', fontSize: '10px', padding: '3px 10px', border: '1px solid rgba(200,146,42,0.35)' }}>
                {product.usedFor[0]}
              </span>
            )}
            <h3 className="font-black text-white leading-tight" style={{ fontSize: '14.5px' }}>{product.title}</h3>
          </div>
          <Link href={`/products/${product.slug}`} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1a4a9e]" style={{ background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.28)', backdropFilter: 'blur(8px)' }} aria-label={`View ${product.title}`}>
            <MoveRight size={15} className="text-white" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function RegularCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ border: '1px solid #e8edf5', boxShadow: '0 2px 12px rgba(26,74,158,0.05)', transition: 'box-shadow 0.3s ease, border-color 0.3s ease' }}
      whileHover={{ y: -6, transition: { duration: 0.28 } }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 20px 48px rgba(26,74,158,0.12)'; el.style.borderColor = 'rgba(26,74,158,0.20)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 2px 12px rgba(26,74,158,0.05)'; el.style.borderColor = '#e8edf5'; }}
    >
      <div className="relative overflow-hidden bg-[#f4f6fb]" style={{ aspectRatio: '16/10' }}>
        {product.featuredImage ? (
          <Image src={product.featuredImage.url} alt={product.featuredImage.alt || product.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package size={40} style={{ color: '#c8d8f0', opacity: 0.5 }} />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1 items-center text-center">
        {product.usedFor.length > 0 && (
          <span className="inline-block rounded-full font-semibold mb-2" style={{ background: '#f0f5ff', color: '#1a4a9e', fontSize: '10.5px', padding: '3px 10px' }}>
            {product.usedFor[0]}
          </span>
        )}
        <h3 className="font-black leading-tight mb-2 transition-colors duration-200 group-hover:text-[#1a4a9e]" style={{ color: '#0d1f3c', fontSize: '15px' }}>{product.title}</h3>
        <p className="leading-relaxed line-clamp-2 flex-1 mb-4" style={{ color: '#6a7a9a', fontSize: '12.5px' }}>{product.shortDescription.replace(/<[^>]*>/g, '')}</p>
        <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-1.5 font-bold group/link" style={{ color: '#1a4a9e', fontSize: '12.5px' }}>
          View Product
          <ArrowRight size={12} className="transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function ProductsSection({ products }: Props) {
  if (!products.length) return null;
  const featured = products[0];
  const sideCards = products.slice(1, 3);
  const bottomCards = products.slice(3, 6);

  return (
    <section className="relative overflow-hidden" style={{ background: '#f4f6fb', padding: '96px 0' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1a4a9e 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      <div className="container-custom relative z-10">

        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="block h-[2px] w-8 rounded" style={{ background: '#c8922a' }} />
              <span className="font-bold tracking-[0.22em] uppercase" style={{ color: '#c8922a', fontSize: '12px' }}>Our Products</span>
              <span className="block h-[2px] w-8 rounded" style={{ background: '#c8922a' }} />
            </div>
            <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', color: '#0d1f3c' }}>
              Precision Paper Tubes for{' '}
              <span style={{ color: '#1a4a9e' }}>Every Application</span>
            </h2>
            <p className="mt-3 leading-relaxed" style={{ color: '#6a7a9a', fontSize: '15px', maxWidth: '480px' }}>
              Quality paper tubes designed for different industrial, packaging and winding applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
            className="hidden lg:block flex-shrink-0"
          >
            <Link href="/products" className="group inline-flex items-center gap-2.5 font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)', color: 'white', fontSize: '14px', padding: '13px 26px', boxShadow: '0 4px 18px rgba(26,74,158,0.28)' }}>
              View All Products
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <FeaturedCard product={featured} />
          <div className="flex flex-col gap-5">
            {sideCards.map((p, i) => <SideCard key={p.id} product={p} index={i} />)}
          </div>
        </div>

        {/* Bottom row */}
        {bottomCards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bottomCards.map((p, i) => <RegularCard key={p.id} product={p} index={i} />)}
          </div>
        )}

        {/* Mobile CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportConfig} transition={{ delay: 0.3 }} className="mt-10 text-center lg:hidden">
          <Link href="/products" className="group inline-flex items-center gap-2 text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all duration-300" style={{ background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)', fontSize: '15px', padding: '14px 32px', boxShadow: '0 4px 18px rgba(26,74,158,0.28)' }}>
            View All Products
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
