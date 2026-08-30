'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';
import {
  CheckCircle2, Ruler, Cog, UserCheck, Truck,
  ArrowRight, Shield, Award, Target, RefreshCw,
} from 'lucide-react';
import { staggerContainer, fadeUp, slideLeft, slideRight, viewportConfig } from '@/lib/animations';
import CTASection from '@/components/sections/CTASection';

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const reasons = [
  {
    number: '01',
    icon: CheckCircle2,
    title: 'Consistent Quality',
    description: 'Quality is our primary focus. Every tube manufactured at FAB Paper Tube goes through quality checks before dispatch. We ensure the same quality, same dimensions and same finish — batch after batch, order after order.',
    points: [
      'Same dimensional accuracy every batch',
      'Consistent wall thickness and paper quality',
      'Quality checks before every dispatch',
      'No compromise on manufacturing standards',
    ],
    color: '#1a4a9e',
  },
  {
    number: '02',
    icon: Ruler,
    title: 'Small Size Expertise',
    description: 'Manufacturing small-diameter paper tubes requires a level of precision that larger tube manufacturers often do not focus on. We have developed specific expertise in small-size tube production.',
    points: [
      'Specialised in small diameter tubes',
      'Higher precision for smaller sizes',
      'Deep manufacturing expertise in this segment',
      'Optimised for your winding and production needs',
    ],
    color: '#c8922a',
  },
  {
    number: '03',
    icon: Cog,
    title: 'Precision Manufacturing',
    description: 'In paper tube manufacturing, precision is not optional. Your winding machine, your production line and your final product all depend on the paper tube performing consistently.',
    points: [
      'Tight dimensional tolerances',
      'Consistent inner diameter for smooth winding',
      'Precise length cutting',
      'Clean finishing on both tube ends',
    ],
    color: '#1a4a9e',
  },
  {
    number: '04',
    icon: UserCheck,
    title: 'Customer-Specific Requirements',
    description: "Not every paper tube requirement is standard. We manufacture exactly to your requirements — whether it's a specific diameter, a custom length, a particular wall thickness or a specific paper grade.",
    points: [
      'Custom diameter as per your requirement',
      'Custom length cutting',
      'Custom wall thickness',
      'Paper grade selection based on application',
    ],
    color: '#c8922a',
  },
  {
    number: '05',
    icon: Truck,
    title: 'Reliable Supply',
    description: 'Since 2013, we have built a reputation for reliable, on-time supply. We understand that your production schedule depends on our delivery commitment.',
    points: [
      'On-time delivery commitment',
      'Consistent production capacity',
      'Reliable supply chain management',
      'Pan-India supply capabilities',
    ],
    color: '#1a4a9e',
  },
];

const differentiators = [
  { icon: Shield,    title: 'Quality First',        description: 'Quality checking before every dispatch',    stat: '100%',  statLabel: 'Quality Rate' },
  { icon: Target,    title: 'Precision Focus',       description: 'Tight dimensional tolerances',              stat: '±0.1mm', statLabel: 'Tolerance' },
  { icon: Award,     title: 'Industry Experience',   description: '10+ years of manufacturing expertise',      stat: '10+',   statLabel: 'Years' },
  { icon: RefreshCw, title: 'Consistency',           description: 'Same quality, batch after batch',           stat: '500+',  statLabel: 'Happy Clients' },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function WhyChooseUsPageClient() {
  return (
    <div className="pt-20">

      <PageBanner
        eyebrow="The FAB Advantage"
        title="Why Choose FAB Paper Tube?"
        highlight="FAB Paper Tube?"
        description="Built on a decade of manufacturing experience and an unwavering commitment to quality, precision and customer satisfaction."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Why Choose Us' }]}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — Stats / Differentiators — Dark navy cards on white bg
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#ffffff', padding: '24px 0 56px' }}>
        <div className="container-custom">

          {/* 4 stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d, i) => {
              const Icon = d.icon;
              const isGold = i % 2 === 1;
              const color = isGold ? '#c8922a' : '#1a4a9e';
              return (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-2xl overflow-hidden cursor-default bg-white"
                  style={{
                    border: `1.5px solid #e8edf5`,
                    boxShadow: '0 2px 16px rgba(26,74,158,0.06)',
                    padding: '28px 24px',
                    transition: 'box-shadow 0.28s ease, border-color 0.28s ease, transform 0.28s ease',
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.28 } }}
                  onHoverStart={e => {
                    const el = (e.target as HTMLElement).closest('.group') as HTMLElement;
                    if (el) {
                      el.style.borderColor = color;
                      el.style.boxShadow = isGold ? '0 12px 36px rgba(200,146,42,0.18)' : '0 12px 36px rgba(26,74,158,0.16)';
                    }
                  }}
                  onHoverEnd={e => {
                    const el = (e.target as HTMLElement).closest('.group') as HTMLElement;
                    if (el) { el.style.borderColor = '#e8edf5'; el.style.boxShadow = '0 2px 16px rgba(26,74,158,0.06)'; }
                  }}
                >
                  {/* Watermark icon */}
                  <div className="absolute -bottom-3 -right-3 pointer-events-none" style={{ opacity: 0.04 }}>
                    <Icon size={90} strokeWidth={1.5} style={{ color }} />
                  </div>

                  {/* All content centered */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Stat number */}
                    <div className="font-black leading-none mb-1" style={{ fontSize: '2.4rem', color }}>{d.stat}</div>
                    <div className="font-bold tracking-widest uppercase mb-5" style={{ color: '#9aaacc', fontSize: '10px' }}>{d.statLabel}</div>

                    {/* Divider */}
                    <div className="mb-4 w-full" style={{ height: '1px', background: '#e8edf5' }} />

                    {/* Icon + title */}
                    <div className="flex items-center gap-3 mb-2 justify-center">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: isGold ? 'rgba(200,146,42,0.10)' : 'rgba(26,74,158,0.08)' }}>
                        <Icon size={17} strokeWidth={2.5} style={{ color }} />
                      </div>
                      <div className="font-bold leading-tight text-left" style={{ fontSize: '13px', color: '#0d1f3c' }}>{d.title}</div>
                    </div>
                    <p style={{ color: '#6a7a9a', fontSize: '12px', lineHeight: '1.6' }}>{d.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — 5 Reasons — Timeline / alternating layout on light bg
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#f4f6fb', padding: '88px 0' }}>
        <div className="container-custom">

          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-3">
              <span className="block h-[2px] w-8 rounded" style={{ background: '#1a4a9e' }} />
              <span className="font-bold tracking-[0.22em] uppercase text-xs" style={{ color: '#1a4a9e' }}>
                5 Strong Reasons
              </span>
              <span className="block h-[2px] w-8 rounded" style={{ background: '#1a4a9e' }} />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-black leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', color: '#0d1f3c' }}
            >
              Why Manufacturers Choose{' '}
              <span style={{ color: '#1a4a9e' }}>FAB</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-3 mx-auto"
              style={{ color: '#6a7a9a', fontSize: '16px', maxWidth: '520px', lineHeight: '1.7' }}
            >
              Here is what makes FAB Paper Tube the right manufacturing partner for your requirements.
            </motion.p>
          </motion.div>

          {/* Alternating left/right cards */}
          <div className="space-y-8 max-w-5xl mx-auto">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              const isEven = i % 2 === 1;
              return (
                <motion.div
                  key={reason.number}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden group`}
                  style={{
                    boxShadow: '0 4px 24px rgba(26,74,158,0.08)',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: reason.color === '#1a4a9e'
                      ? '0 16px 48px rgba(26,74,158,0.20)'
                      : '0 16px 48px rgba(200,146,42,0.22)',
                    transition: { duration: 0.28 },
                  }}
                >
                  {/* Coloured side */}
                  <div
                    className={`relative flex flex-col justify-center px-8 py-10 ${isEven ? 'md:order-2' : 'md:order-1'}`}
                    style={{
                      background: reason.color === '#1a4a9e'
                        ? 'linear-gradient(155deg, #1a4a9e 0%, #2a5fc0 100%)'
                        : 'linear-gradient(155deg, #b87d20 0%, #e0a83b 100%)',
                      transition: 'filter 0.3s ease',
                    }}
                  >
                    {/* Big watermark number */}
                    <div
                      className="absolute bottom-0 right-4 font-black select-none pointer-events-none leading-none"
                      style={{ fontSize: '6.5rem', color: 'rgba(255,255,255,0.07)' }}
                      aria-hidden
                    >
                      {reason.number}
                    </div>

                    <div className="relative z-10">
                      {/* Icon + number row */}
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(255,255,255,0.20)' }}
                        >
                          <Icon size={22} strokeWidth={2.5} className="text-white" />
                        </div>
                        <span
                          className="font-black text-white"
                          style={{ fontSize: '0.95rem', opacity: 0.65, letterSpacing: '0.08em' }}
                        >
                          {reason.number}
                        </span>
                      </div>

                      <h2
                        className="font-black text-white leading-tight mb-3"
                        style={{ fontSize: '1.2rem' }}
                      >
                        {reason.title}
                      </h2>
                      <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '13.5px', lineHeight: '1.75' }}>
                        {reason.description}
                      </p>
                    </div>
                  </div>

                  {/* White side — bullet points */}
                  <div
                    className={`flex flex-col justify-center px-8 py-10 bg-white ${isEven ? 'md:order-1' : 'md:order-2'}`}
                    style={{ transition: 'background 0.3s ease' }}
                  >
                    <div
                      className="font-bold tracking-widest uppercase mb-4"
                      style={{ color: reason.color, fontSize: '10px' }}
                    >
                      Key Highlights
                    </div>
                    <div className="space-y-3">
                      {reason.points.map((point, pi) => (
                        <div key={point} className="flex items-start gap-3">
                          {/* Numbered circle */}
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              background: reason.color === '#1a4a9e'
                                ? 'rgba(26,74,158,0.10)'
                                : 'rgba(200,146,42,0.12)',
                              border: `1.5px solid ${reason.color}35`,
                            }}
                          >
                            <span
                              className="font-black"
                              style={{ fontSize: '9px', color: reason.color }}
                            >
                              {pi + 1}
                            </span>
                          </div>
                          <span
                            style={{ color: '#3a4a6a', fontSize: '13.5px', lineHeight: '1.6', paddingTop: '2px' }}
                          >
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Brand Promise ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1a3a6b 0%, #1E4E76 50%, #1a3a6b 100%)',
          padding: '100px 0',
        }}
      >
        <div
          className="absolute -left-32 top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(200,146,42,0.14) 0%, transparent 65%)' }}
        />
        <div
          className="absolute -right-32 top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(77,148,255,0.10) 0%, transparent 65%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: 'linear-gradient(90deg, transparent, #c8922a 30%, #e0a83b 50%, #c8922a 70%, transparent)' }}
        />

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-7">
              <span className="block h-[2px] w-10 rounded" style={{ background: '#e0a83b' }} />
              <span className="font-bold tracking-[0.28em] uppercase" style={{ color: '#e0a83b', fontSize: '12px' }}>
                Our Brand Promise
              </span>
              <span className="block h-[2px] w-10 rounded" style={{ background: '#e0a83b' }} />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="font-black text-white tracking-tight leading-tight mb-6"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              Small Size.{' '}
              <span style={{ background: 'linear-gradient(135deg, #e0a83b 0%, #f5c96a 50%, #c8922a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Big Precision.
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="leading-relaxed mb-10 mx-auto"
              style={{ color: 'rgba(185,210,250,0.70)', fontSize: '17px', maxWidth: '560px', lineHeight: '1.8' }}
            >
              This is not just a tagline. It is our manufacturing promise. Every paper tube that
              leaves our facility reflects our commitment to precision, quality and consistency.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-white font-bold rounded-lg hover:-translate-y-1 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #c8922a 0%, #e0a83b 100%)', fontSize: '15px', padding: '14px 32px', boxShadow: '0 6px 24px rgba(200,146,42,0.38)' }}
              >
                Start Your Requirement
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#0b1e3d]"
                style={{ border: '2px solid rgba(255,255,255,0.55)', color: '#ffffff', fontSize: '15px', padding: '14px 32px', background: 'transparent' }}
              >
                View Products
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
