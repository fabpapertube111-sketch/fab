'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Layers, Shield, RefreshCw } from 'lucide-react';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

const features = [
  { icon: Target, title: 'Small Diameter', description: 'Expert manufacturing of small-diameter paper tubes where precision matters most.' },
  { icon: Layers, title: 'Precision', description: 'Every tube is manufactured with tight dimensional tolerances and consistent wall thickness.' },
  { icon: Shield, title: 'Strength', description: 'High-quality kraft paper ensures structural integrity and resistance to compression.' },
  { icon: RefreshCw, title: 'Consistency', description: 'Batch after batch, every tube meets the same precise specifications your production demands.' },
];

export default function SpecialitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const textX = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section ref={sectionRef} className="section-padding bg-[#0f0f0f] overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,146,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,146,42,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div style={{ x: textX }} className="overflow-hidden mb-8">
          <div
            className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-black leading-none select-none whitespace-nowrap text-white/[0.02]"
            aria-hidden="true"
          >
            PRECISION
          </div>
        </motion.div>

        <div className="relative -mt-16 md:-mt-28 lg:-mt-40">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="mb-12 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.span
              variants={fadeUp}
              className="text-[#c8922a] text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-3 mb-4 justify-center lg:justify-start"
            >
              <span className="w-8 h-0.5 bg-[#c8922a]" />
              Our Core Speciality
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight"
            >
              Small Size.{' '}
              <span className="text-[#c8922a]">Big Precision.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-400 text-base md:text-xl leading-relaxed max-w-2xl mt-5"
            >
              Our speciality is manufacturing small-size and small-diameter paper tubes where{' '}
              <strong className="text-white font-medium">precision, strength and consistency</strong> matter most.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  custom={i}
                  className="group p-6 border border-white/8 rounded hover:border-[#c8922a]/40 transition-all duration-400 hover:bg-white/[0.02] flex flex-col items-center text-center"
                >
                  <div className="w-11 h-11 bg-[#c8922a]/10 border border-[#c8922a]/20 rounded flex items-center justify-center mb-4 group-hover:bg-[#c8922a]/20 transition-colors duration-300">
                    <Icon size={20} className="text-[#c8922a]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="mt-12 h-px bg-gradient-to-r from-transparent via-[#c8922a] to-transparent origin-center"
          />
        </div>
      </div>
    </section>
  );
}
