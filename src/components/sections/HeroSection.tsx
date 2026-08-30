'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  staggerContainer,
  heroHeading,
  heroSubheading,
  heroButtons,
  heroImage,
} from '@/lib/animations';

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', backgroundColor: '#1E4E76' }}
      aria-label="Hero section"
    >
      {/* ── Real product photo as background ── */}
      <div className="absolute inset-0 z-0">
        {/* Actual paper tubes photo */}
        <Image
          src="/images/1 product.jpeg"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
        {/* Blue overlay — same as original website */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(30,78,118,0.90) 0%, rgba(30,78,118,0.85) 50%, rgba(24,64,100,0.90) 100%)',
          }}
        />
      </div>

      {/* Main content */}
      <div
        className="container-custom relative z-10 flex items-center"
        style={{ minHeight: '100vh', paddingTop: '110px' }}
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center w-full py-16">

          {/* ════ LEFT TEXT ════ */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col max-w-xl text-center lg:text-left items-center lg:items-start"
            style={{ gap: '20px' }}
          >
            {/* H1 — "FAB Paper Tube." white + rest sky-blue, no forced breaks */}
            <motion.h1
              variants={heroHeading}
              className="font-black leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)' }}
            >
              <span style={{ color: '#ffffff' }}>FAB Paper Tube. </span>
              <span style={{ color: '#4db8ff' }}>Premium and Sustainable Packaging Solutions</span>
            </motion.h1>

            {/* Blue underline bar — matches screenshot */}
            <motion.div variants={heroSubheading}>
              <span
                style={{
                  display: 'block',
                  height: '4px',
                  width: '88px',
                  background: '#4db8ff',
                  borderRadius: '2px',
                }}
              />
            </motion.div>

            {/* Bold white subtitle */}
            <motion.p
              variants={heroSubheading}
              style={{
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '17px',
                lineHeight: '1.55',
              }}
            >
              High Quality Paper Tubes &amp; Paper Cores for Textile, Packaging,
              Stationery, Paper Converting and Industrial Applications.
            </motion.p>

            {/* Body copy — light blue-white */}
            <motion.p
              variants={heroSubheading}
              style={{
                color: 'rgba(215,230,255,0.92)',
                fontSize: '16px',
                lineHeight: '1.72',
              }}
            >
              FAB Paper Tube is a leading manufacturer of premium quality paper
              tubes, paper cores, and customized packaging solutions. We manufacture
              strong, durable, and eco-friendly paper tubes in various sizes according
              to customer requirements, ensuring consistent quality and timely delivery.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={heroButtons}
              className="flex flex-row gap-3 justify-center lg:justify-start w-full"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-transparent text-white font-bold rounded-sm hover:bg-white hover:text-[#1a3bc1] transition-all duration-300 flex-1 lg:flex-initial"
                style={{
                  border: '2px solid rgba(255,255,255,0.9)',
                  fontSize: '15px',
                  padding: '12px 20px',
                }}
              >
                Get Free Quote
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 bg-transparent text-white font-bold rounded-sm hover:bg-white hover:text-[#1a3bc1] transition-all duration-300 flex-1 lg:flex-initial"
                style={{
                  border: '2px solid rgba(255,255,255,0.9)',
                  fontSize: '15px',
                  padding: '12px 20px',
                }}
              >
                View Products
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ════ RIGHT CHARACTER ════ */}
          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center lg:justify-end overflow-hidden"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full"
              style={{ maxWidth: '540px' }}
            >
              {/* Glow */}
              <div
                className="absolute inset-x-16 bottom-0 blur-3xl rounded-full pointer-events-none"
                style={{
                  height: '160px',
                  background: 'radial-gradient(ellipse, rgba(100,160,255,0.28) 0%, transparent 70%)',
                }}
              />

              {/* Character PNG — screen blend removes black bg */}
              <Image
                src="/images/hero-character.png"
                alt="Person holding FAB paper tubes"
                width={640}
                height={580}
                priority
                className="w-full h-auto relative z-10"
                style={{
                  objectFit: 'contain',
                  mixBlendMode: 'screen',
                  filter: 'drop-shadow(0 24px 48px rgba(0,60,200,0.4))',
                }}
              />

              {/* Badge — 10+ Years */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, type: 'spring', stiffness: 220 }}
                className="absolute bg-white rounded-xl shadow-2xl flex items-center z-20"
                style={{
                  top: '8px',
                  left: '4px',
                  gap: '8px',
                  padding: '7px 12px',
                  maxWidth: '44%',
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-black"
                  style={{
                    width: '36px',
                    height: '36px',
                    minWidth: '36px',
                    fontSize: '11px',
                    background: 'linear-gradient(135deg,#f5be20,#c88010)',
                  }}
                >
                  10+
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 900, color: '#0d2080', lineHeight: 1.2 }}>
                    Years
                  </div>
                  <div style={{ fontSize: '10px', color: '#888', lineHeight: 1.2 }}>
                    Manufacturing
                  </div>
                </div>
              </motion.div>

              {/* Badge — ISO Quality */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.35, type: 'spring', stiffness: 220 }}
                className="absolute bg-white rounded-xl shadow-2xl flex items-center z-20"
                style={{
                  bottom: '60px',
                  right: '4px',
                  gap: '8px',
                  padding: '7px 12px',
                  maxWidth: '48%',
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-black"
                  style={{ width: '36px', height: '36px', minWidth: '36px', fontSize: '16px', background: '#0d2080' }}
                >
                  ✓
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 900, color: '#0d2080', lineHeight: 1.2 }}>
                    ISO Quality
                  </div>
                  <div style={{ fontSize: '10px', color: '#888', lineHeight: 1.2 }}>
                    Assured Products
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
      {/* NO bottom fade */}
    </section>
  );
}
