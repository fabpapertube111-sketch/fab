'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';
import type { Testimonial } from '@/types';

interface Props { testimonials: Testimonial[] }

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={13} className={s <= rating ? 'text-[#c8922a] fill-current' : 'text-[#e5e5e5]'} />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="bg-white rounded-xl flex flex-col h-full"
      style={{ border: '1px solid #e8edf5', padding: '24px', boxShadow: '0 2px 12px rgba(26,74,158,0.05)' }}
    >
      <Quote size={26} style={{ color: 'rgba(200,146,42,0.18)' }} className="mb-3 flex-shrink-0 mx-auto" />
      <p className="italic leading-relaxed flex-1 mb-5 text-center" style={{ color: '#4a5a7a', fontSize: '14px' }}>
        &ldquo;{t.review}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 justify-center" style={{ borderTop: '1px solid #f0f5ff' }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black"
          style={{ background: 'rgba(26,74,158,0.10)', color: '#1a4a9e', fontSize: '15px' }}
        >
          {t.clientName.charAt(0)}
        </div>
        <div className="text-center">
          <div className="font-bold" style={{ color: '#0d1f3c', fontSize: '13.5px' }}>{t.clientName}</div>
          <div style={{ color: '#9aaacc', fontSize: '11.5px' }}>{t.designation}</div>
          {t.company && <div className="font-medium" style={{ color: '#c8922a', fontSize: '11.5px' }}>{t.company}</div>}
          <div className="mt-1 flex justify-center"><StarRating rating={t.rating} /></div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ testimonials }: Props) {
  const items = testimonials.length > 0 ? testimonials : [];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Desktop: show 3 at a time; mobile: 1
  const desktopCount = 3;
  const totalSlides = Math.ceil(items.length / desktopCount);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % items.length);
  }, [items.length]);

  const prev = () => setCurrent(c => (c === 0 ? items.length - 1 : c - 1));

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (paused || items.length <= 1) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, next, items.length]);

  if (!items.length) return null;

  // Desktop: get 3 visible cards starting from current
  const visibleDesktop = [0, 1, 2].map(i => items[(current + i) % items.length]);

  return (
    <section className="section-padding overflow-hidden" style={{ background: '#f4f6fb' }}>
      <div className="container-custom">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-4">
            <span className="block h-[2px] w-8 rounded" style={{ background: '#c8922a' }} />
            <span className="font-bold tracking-[0.22em] uppercase text-xs" style={{ color: '#c8922a' }}>
              Client Feedback
            </span>
            <span className="block h-[2px] w-8 rounded" style={{ background: '#c8922a' }} />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-black leading-tight mb-3"
            style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', color: '#0d1f3c' }}
          >
            What Our <span style={{ color: '#1a4a9e' }}>Clients Say</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: '#6a7a9a', fontSize: '15px', maxWidth: '480px' }} className="mx-auto">
            Trusted by manufacturers across textile, packaging, candle and cracker industries.
          </motion.p>
        </motion.div>

        {/* Carousel wrapper */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop: 3-up auto-slide */}
          <div className="hidden md:block overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-3 gap-6"
              >
                {visibleDesktop.map((t, i) => (
                  <TestimonialCard key={`${t.id}-${i}`} t={t} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile: 1-up auto-slide */}
          <div className="md:hidden overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <TestimonialCard t={items[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
              style={{ border: '1.5px solid #dde8f5', color: '#1a4a9e', background: 'white' }}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '20px' : '8px',
                    height: '8px',
                    background: i === current ? '#1a4a9e' : '#dde8f5',
                  }}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
              style={{ border: '1.5px solid #dde8f5', color: '#1a4a9e', background: 'white' }}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-[3px] rounded-full mx-auto overflow-hidden" style={{ maxWidth: '200px', background: '#e8edf5' }}>
            <motion.div
              key={current}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #1a4a9e, #c8922a)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.5, ease: 'linear' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
