'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';

interface Crumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  eyebrow?: string;
  title: string;
  highlight?: string;   // part of title to colour sky-blue
  description?: string;
  breadcrumbs?: Crumb[];
}

export default function PageBanner({
  eyebrow,
  title,
  highlight,
  description,
  breadcrumbs,
}: PageBannerProps) {
  /* Split title at highlight text so we can colour it */
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) {
      return <span className="text-white">{title}</span>;
    }
    const [before, after] = title.split(highlight);
    return (
      <>
        <span className="text-white">{before}</span>
        <span style={{ color: '#4db8ff' }}>{highlight}</span>
        {after && <span className="text-white">{after}</span>}
      </>
    );
  };

  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: '420px', backgroundColor: '#1E4E76' }}
      aria-label={`${title} page banner`}
    >
      {/* ── Real product photo as background ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner section All pages1.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* #1E4E76 blue overlay — same tint as home banner */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(30,78,118,0.92) 0%, rgba(30,78,118,0.88) 60%, rgba(22,60,95,0.93) 100%)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="container-custom relative z-10 w-full py-24 pt-36">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center lg:mx-0 lg:text-left"
        >
          {/* Eyebrow */}
          {eyebrow && (
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <span
                className="block h-[3px] w-10 rounded-sm"
                style={{ background: '#4db8ff' }}
              />
              <span
                className="font-bold tracking-[0.2em] uppercase"
                style={{ color: '#4db8ff', fontSize: '12px' }}
              >
                {eyebrow}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="font-black leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            {renderTitle()}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              variants={fadeUp}
              className="mt-3 leading-relaxed max-w-xl"
              style={{ color: 'rgba(210,230,255,0.90)', fontSize: '16px' }}
            >
              {description}
            </motion.p>
          )}

          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="flex items-center flex-wrap gap-1 mt-5 justify-center lg:justify-start"
              style={{ fontSize: '13px' }}
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#4db8ff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.85)' }}>{crumb.label}</span>
                  )}
                </span>
              ))}
            </motion.nav>
          )}
        </motion.div>
      </div>
    </section>
  );
}
