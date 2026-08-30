'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { slideLeft, slideRight, staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';

const highlights = [
  'Manufacturing all types of paper tubes with precision',
  'Stitching thread Tube, Stretch film core, Textile Paper Tube',
  'Precision small-diameter paper tube specialists',
  'Custom size manufacturing as per customer requirement',
  'Consistent quality and on-time delivery guaranteed',
];

export default function TrustedManufacturerSection() {
  return (
    <section className="section-padding overflow-hidden" style={{ background: '#f0f5ff' }}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="flex flex-col items-center text-center lg:items-start lg:text-left gap-5"
          >
            <motion.div variants={slideLeft} className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="w-8 h-0.5 bg-[#c8922a]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#c8922a' }}>
                About Us
              </span>
            </motion.div>

            <motion.h2
              variants={slideLeft}
              className="font-black leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#0d1f3c' }}
            >
              Trusted Paper Tube Manufacturer
            </motion.h2>

            <motion.p variants={slideLeft} style={{ color: '#4a5a7a', lineHeight: '1.75', fontSize: '15px' }}>
              FAB Paper Tube is a trusted manufacturer of premium quality paper tubes and paper cores,
              based in Ahmedabad, Gujarat. We have been delivering consistent,
              high-quality products to industries across India for over a decade.
            </motion.p>

            <motion.p variants={slideLeft} style={{ color: '#6a7a9a', lineHeight: '1.75', fontSize: '14.5px' }}>
              Our manufacturing excellence is built on advanced production processes, stringent quality
              control and a dedicated team. From small-diameter sewing thread tubes to heavy-duty
              stretch film cores — we manufacture them all with equal precision.
            </motion.p>

            {/* Highlights */}
            <motion.ul variants={staggerContainer} className="space-y-2.5 mt-1 w-full">
              {highlights.map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-left">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(26,74,158,0.10)' }}
                  >
                    <CheckCircle2 size={12} style={{ color: '#1a4a9e' }} />
                  </div>
                  <span style={{ color: '#3a4a6a', fontSize: '14px', lineHeight: '1.6' }}>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-white font-bold rounded-md hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)',
                  fontSize: '14px',
                  padding: '13px 26px',
                  boxShadow: '0 4px 18px rgba(26,74,158,0.28)',
                }}
              >
                Learn More About Us
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={slideRight}
            className="relative"
          >
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl -z-10"
              style={{ border: '2px solid rgba(200,146,42,0.30)', borderRadius: '16px' }}
            />
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 12px 48px rgba(26,74,158,0.14)',
                border: '1px solid #e8edf5',
              }}
            >
              <Image
                src="/images/Trusted_Paper_Tube.jpeg"
                alt="FAB Paper Tube manufacturing facility"
                width={620}
                height={465}
                className="w-full h-auto object-cover"
                style={{ display: 'block' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-16"
                style={{ background: 'linear-gradient(to top, rgba(13,31,60,0.18), transparent)' }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
