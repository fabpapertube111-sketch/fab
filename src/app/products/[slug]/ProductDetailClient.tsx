'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, Package, ChevronRight, ArrowLeft,
  MessageCircle, Phone, Play,
} from 'lucide-react';
import { staggerContainer, fadeUp, slideLeft, slideRight, viewportConfig } from '@/lib/animations';
import { getYouTubeEmbedId } from '@/lib/wordpress';
import type { Product } from '@/types';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

// ── JSON-LD Schema ────────────────────────────────────────────────────────────
function ProductSchema({ product }: { product: Product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription.replace(/<[^>]*>/g, ''),
    image: product.featuredImage?.url,
    brand: { '@type': 'Brand', name: 'FAB Paper Tube' },
    manufacturer: {
      '@type': 'Organization',
      name: 'FAB Paper Tube',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fabpapertube.com',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      seller: { '@type': 'Organization', name: 'FAB Paper Tube' },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── YouTube Embed ─────────────────────────────────────────────────────────────
function YouTubeEmbed({ videoUrl }: { videoUrl: string }) {
  const embedId = getYouTubeEmbedId(videoUrl);
  if (!embedId) return null;

  return (
    <section className="section-padding bg-white" style={{ paddingTop: '0' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.55 }}
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(200,146,42,0.10)' }}
            >
              <Play size={18} style={{ color: '#c8922a' }} />
            </div>
            <div>
              <div
                className="font-bold tracking-widest uppercase"
                style={{ color: '#c8922a', fontSize: '11px' }}
              >
                Product Video
              </div>
              <div className="font-black" style={{ color: '#0d1f3c', fontSize: '18px' }}>
                See It In Action
              </div>
            </div>
          </div>

          {/* 16:9 responsive video container */}
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{
              paddingBottom: '56.25%',
              border: '1px solid #e8edf5',
              boxShadow: '0 8px 32px rgba(26,74,158,0.10)',
            }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`}
              title={`${String(document?.title ?? 'Product')} - Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Specification Row ─────────────────────────────────────────────────────────
function SpecGrid({ specifications }: { specifications: Product['specifications'] }) {
  if (!specifications.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.55 }}
      className="mt-8"
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="font-bold tracking-widest uppercase"
          style={{ color: '#c8922a', fontSize: '11px' }}
        >
          Product Specifications
        </span>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid #e8edf5' }}
      >
        {specifications.map((spec, i) => (
          <div
            key={spec.label}
            className="flex gap-4 px-5 py-3.5"
            style={{
              background: i % 2 === 0 ? '#f8faff' : '#ffffff',
              borderBottom: i < specifications.length - 1 ? '1px solid #e8edf5' : 'none',
            }}
          >
            <span
              className="flex-shrink-0 font-semibold"
              style={{ color: '#6a7a9a', fontSize: '13px', minWidth: '160px' }}
            >
              {spec.label}
            </span>
            <span className="font-medium" style={{ color: '#0d1f3c', fontSize: '13px' }}>
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Related Product Card ──────────────────────────────────────────────────────
function RelatedCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        border: '1px solid #e8edf5',
        boxShadow: '0 2px 12px rgba(26,74,158,0.05)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(26,74,158,0.12)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,74,158,0.20)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(26,74,158,0.05)';
        (e.currentTarget as HTMLElement).style.borderColor = '#e8edf5';
      }}
    >
      <div className="relative overflow-hidden bg-[#f4f6fb]" style={{ aspectRatio: '4/3' }}>
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.alt || product.title}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package size={32} style={{ color: '#c8d8f0', opacity: 0.5 }} />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3
          className="font-bold mb-2 leading-tight transition-colors duration-200 group-hover:text-[#1a4a9e] line-clamp-2"
          style={{ color: '#0d1f3c', fontSize: '14px' }}
        >
          {product.title}
        </h3>
        {product.usedFor.length > 0 && (
          <p style={{ color: '#9aaacc', fontSize: '12px' }}>{product.usedFor[0]}</p>
        )}
        <div
          className="inline-flex items-center gap-1.5 mt-3 font-bold transition-all duration-200"
          style={{ color: '#1a4a9e', fontSize: '12px' }}
        >
          View <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const whatsappMsg = encodeURIComponent(
    `Hello FAB Paper Tube, I am interested in: ${product.title}. Please share more details.`
  );
  const whatsappUrl = `https://wa.me/918238074700?text=${whatsappMsg}`;

  return (
    <div className="pt-20">
      <ProductSchema product={product} />

      {/* Breadcrumb */}
      <div style={{ background: '#f4f6fb', borderBottom: '1px solid #e8edf5' }}>
        <div className="container-custom py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap" style={{ fontSize: '12px', color: '#9aaacc' }}>
            <Link href="/" className="hover:text-[#1a4a9e] transition-colors">Home</Link>
            <ChevronRight size={11} />
            <Link href="/products" className="hover:text-[#1a4a9e] transition-colors">Products</Link>
            <ChevronRight size={11} />
            <span style={{ color: '#0d1f3c' }} className="font-medium truncate max-w-[200px]">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Hero: Image + Details ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: Image */}
            <motion.div initial="hidden" animate="visible" variants={slideLeft}>
              <div
                className="relative rounded-2xl overflow-hidden sticky top-28"
                style={{
                  aspectRatio: '1/1',
                  background: '#f4f6fb',
                  border: '1px solid #e8edf5',
                  boxShadow: '0 8px 40px rgba(26,74,158,0.10)',
                }}
              >
                {product.featuredImage ? (
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.alt || product.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover hover:scale-[1.02] transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package size={80} style={{ color: '#c8d8f0', opacity: 0.4 }} />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-5 items-center text-center lg:items-start lg:text-left"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeUp} className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="font-bold tracking-widest uppercase" style={{ color: '#c8922a', fontSize: '11px' }}>
                  FAB Paper Tube
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="font-black leading-tight"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0d1f3c' }}
              >
                {product.title}
              </motion.h1>

              {/* Short description */}
              <motion.p
                variants={fadeUp}
                className="leading-relaxed"
                style={{ color: '#4a5a7a', fontSize: '15.5px', lineHeight: '1.75' }}
              >
                {product.shortDescription.replace(/<[^>]*>/g, '')}
              </motion.p>

              {/* Used For */}
              {product.usedFor.length > 0 && (
                <motion.div
                  variants={fadeUp}
                  className="rounded-xl p-4 w-full"
                  style={{ background: '#f4f6fb', border: '1px solid #e8edf5' }}
                >
                  <div className="font-bold tracking-widest uppercase mb-3" style={{ color: '#9aaacc', fontSize: '10px' }}>
                    Used For
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {product.usedFor.map((use) => (
                      <span
                        key={use}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium"
                        style={{ background: 'white', border: '1px solid #dde8f5', color: '#1a4a9e', fontSize: '13px' }}
                      >
                        <CheckCircle2 size={12} style={{ color: '#c8922a' }} />
                        {use}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Custom size note */}
              <motion.div
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl p-4 w-full text-left"
                style={{ background: 'rgba(200,146,42,0.05)', border: '1px solid rgba(200,146,42,0.18)' }}
              >
                <Package size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#c8922a' }} />
                <p style={{ color: '#4a5a7a', fontSize: '13.5px' }}>
                  <strong style={{ color: '#0d1f3c' }}>Custom sizes available.</strong>{' '}
                  All tubes manufactured to your specific diameter, length and wall thickness.
                </p>
              </motion.div>

              {/* CTA Buttons — full width on mobile, auto on desktop */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-1 w-full lg:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 text-white font-bold rounded-lg hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
                  style={{
                    background: 'linear-gradient(135deg, #25d366, #20c060)',
                    fontSize: '14px',
                    padding: '14px 24px',
                    boxShadow: '0 4px 18px rgba(37,211,102,0.30)',
                  }}
                >
                  <MessageCircle size={16} />
                  Enquire on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 font-bold rounded-lg hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
                  style={{
                    background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)',
                    color: 'white',
                    fontSize: '14px',
                    padding: '14px 24px',
                    boxShadow: '0 4px 18px rgba(26,74,158,0.28)',
                  }}
                >
                  <Phone size={16} />
                  Contact / Enquiry
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Specifications */}
              <SpecGrid specifications={product.specifications} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Product Video ── */}
      {product.videoUrl && <YouTubeEmbed videoUrl={product.videoUrl} />}

      {/* ── Full Description ── */}
      {product.description && product.description.replace(/<[^>]*>/g, '').trim() && (
        <section style={{ background: '#ffffff', padding: '72px 0 0' }}>
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.55 }}
            >
              {/* Section header */}
              <div className="flex items-start gap-5 mb-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)' }}
                >
                  <Package size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-bold tracking-widest uppercase mb-1" style={{ color: '#c8922a', fontSize: '11px' }}>
                    About This Product
                  </div>
                  <h2 className="font-black leading-tight" style={{ color: '#0d1f3c', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>
                    Product Description
                  </h2>
                </div>
              </div>

              {/* Content card */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid #e8edf5', boxShadow: '0 4px 24px rgba(26,74,158,0.06)' }}
              >
                {/* Blue top stripe */}
                <div className="h-[4px]" style={{ background: 'linear-gradient(90deg, #1a4a9e, #c8922a)' }} />
                <div className="p-8 md:p-10 bg-white">
                  <div
                    className="wp-content prose max-w-none leading-relaxed"
                    style={{ color: '#4a5a7a', fontSize: '15.5px', lineHeight: '1.85' }}
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Applications / Used For ── */}
      {(product.applications.length > 0 || product.usedFor.length > 0) && (
        <section style={{ background: '#ffffff', padding: '56px 0 72px' }}>
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.55 }}
            >
              {/* Section header */}
              <div className="flex items-start gap-5 mb-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #c8922a, #e0a83b)' }}
                >
                  <CheckCircle2 size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-bold tracking-widest uppercase mb-1" style={{ color: '#c8922a', fontSize: '11px' }}>
                    Application / Used For
                  </div>
                  <h2 className="font-black leading-tight" style={{ color: '#0d1f3c', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>
                    Where This Tube Is Used
                  </h2>
                </div>
              </div>

              {/* Application cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...product.usedFor, ...product.applications]
                  .filter((v, i, arr) => arr.indexOf(v) === i)
                  .map((app, idx) => (
                    <motion.div
                      key={app}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportConfig}
                      transition={{ duration: 0.4, delay: idx * 0.07 }}
                      className="group flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: '#f8faff',
                        border: '1.5px solid #e8edf5',
                        boxShadow: '0 2px 8px rgba(26,74,158,0.04)',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'rgba(26,74,158,0.30)';
                        el.style.boxShadow = '0 8px 24px rgba(26,74,158,0.10)';
                        el.style.background = '#f0f5ff';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = '#e8edf5';
                        el.style.boxShadow = '0 2px 8px rgba(26,74,158,0.04)';
                        el.style.background = '#f8faff';
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                        style={{ background: 'rgba(26,74,158,0.10)' }}
                      >
                        <CheckCircle2 size={18} style={{ color: '#1a4a9e' }} />
                      </div>
                      <span className="font-semibold leading-snug" style={{ color: '#0d1f3c', fontSize: '14.5px' }}>
                        {app}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section className="section-padding" style={{ background: '#f4f6fb' }}>
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <div
                  className="font-bold tracking-widest uppercase mb-1"
                  style={{ color: '#c8922a', fontSize: '11px' }}
                >
                  More Products
                </div>
                <h2 className="font-black" style={{ color: '#0d1f3c', fontSize: '1.5rem' }}>
                  Related Products
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 font-bold transition-all duration-200 hover:gap-3"
                style={{ color: '#1a4a9e', fontSize: '13px' }}
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {relatedProducts.map((rel, i) => (
                <motion.div key={rel.id} variants={fadeUp} custom={i}>
                  <RelatedCard product={rel} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0d2240 0%, #1a4a9e 50%, #0d2240 100%)',
          padding: '80px 0',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.55 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="font-bold tracking-widest uppercase mb-4" style={{ color: '#e0a83b', fontSize: '11px' }}>
              Need This Product?
            </p>
            <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              Looking for the right paper tube<br />for your application?
            </h2>
            <p className="mb-8" style={{ color: 'rgba(180,210,255,0.75)', fontSize: '15px' }}>
              Talk to FAB Paper Tube. We manufacture to your exact specifications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-bold rounded-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #25d366, #20c060)',
                  fontSize: '15px',
                  padding: '14px 28px',
                  boxShadow: '0 4px 20px rgba(37,211,102,0.30)',
                }}
              >
                <MessageCircle size={17} />
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold rounded-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #c8922a, #e0a83b)',
                  color: 'white',
                  fontSize: '15px',
                  padding: '14px 28px',
                  boxShadow: '0 4px 20px rgba(200,146,42,0.30)',
                }}
              >
                Enquire Now
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back link */}
      <div className="bg-white py-6" style={{ borderTop: '1px solid #e8edf5' }}>
        <div className="container-custom">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-medium transition-colors hover:text-[#1a4a9e]"
            style={{ color: '#6a7a9a', fontSize: '13px' }}
          >
            <ArrowLeft size={14} />
            Back to All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
