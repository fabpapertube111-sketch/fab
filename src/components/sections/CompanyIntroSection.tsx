'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Award, Package } from 'lucide-react';
import { slideLeft, slideRight, viewportConfig, staggerContainer, fadeUp } from '@/lib/animations';

const stats = [
  { value: '2013', label: 'Established', icon: Award },
  { value: 'Quality', label: 'Focused Manufacturing', icon: CheckCircle2 },
  { value: 'Custom', label: 'Requirements', icon: Package },
];

const highlights = [
  'Small-size and small-diameter paper tube expertise',
  'Customer-specific size and requirement manufacturing',
  'Consistent quality batch after batch',
  'Strong focus on precision and dimensional accuracy',
];

export default function CompanyIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section ref={sectionRef} className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Visual */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={slideLeft}
            className="relative"
          >
    <div className="relative">
              <motion.div
                style={{ y: imageY }}
                className="relative z-10 rounded overflow-hidden bg-[#1a1a1a] aspect-[4/5]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#0f0f0f]" />
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(200,146,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,146,42,1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="relative flex gap-4 mb-6">
                    {[60, 80, 60].map((size, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={viewportConfig}
                        transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-full border-4 border-[#c8922a] flex items-center justify-center bg-[#c8922a]/5"
                        style={{ width: size, height: size }}
                      >
                        <div className="rounded-full bg-[#0f0f0f]" style={{ width: size * 0.5, height: size * 0.5 }} />
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="text-[#c8922a] font-black text-4xl mb-1">FAB</div>
                    <div className="text-white font-bold text-lg tracking-widest">PAPER TUBE</div>
                    <div className="text-gray-500 text-xs tracking-widest mt-1 uppercase">Ahmedabad · Gujarat · India</div>
                  </div>
                  <div className="mt-8 flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-[#c8922a]" />
                    <span className="text-gray-400 text-xs tracking-widest uppercase">Since 2013</span>
                    <div className="w-8 h-0.5 bg-[#c8922a]" />
                  </div>
                </div>
              </motion.div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#c8922a]/20 rounded z-0" />
              <div className="absolute -top-4 -left-4 z-20 bg-[#c8922a] text-white px-5 py-3 rounded-sm shadow-lg">
                <div className="text-2xl font-black leading-none">10+</div>
                <div className="text-xs font-medium opacity-80 mt-0.5">Years of Excellence</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6"
          >
            <motion.div variants={slideRight} className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="w-8 h-0.5 bg-[#c8922a]" />
              <span className="text-[#c8922a] text-xs font-bold tracking-[0.2em] uppercase">About FAB Paper Tube</span>
            </motion.div>

            <motion.h2
              variants={slideRight}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1a1a1a] leading-tight tracking-tight"
            >
              Paper Tube Manufacturing{' '}
              <span className="text-[#c8922a]">Since 2013</span>
            </motion.h2>

            <motion.p variants={slideRight} className="text-[#6b6b6b] text-base md:text-lg leading-relaxed">
              FAB Paper Tube is an Ahmedabad-based paper tube and paper core manufacturer with over a decade of manufacturing experience. We have built our reputation on precision, consistency and a strong focus on meeting customer-specific requirements.
            </motion.p>

            <motion.p variants={slideRight} className="text-[#6b6b6b] leading-relaxed">
              Our core speciality is{' '}
              <strong className="text-[#1a1a1a] font-semibold">small-size and small-diameter paper tube manufacturing</strong> — a segment where dimensional accuracy, wall thickness consistency and paper quality are critical to your production process.
            </motion.p>

            {/* Highlights */}
            <motion.ul variants={staggerContainer} className="space-y-3 w-full">
              {highlights.map((item, i) => (
                <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-left">
                  <CheckCircle2 size={18} className="text-[#c8922a] flex-shrink-0 mt-0.5" />
                  <span className="text-[#4a4a4a] text-sm">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-6 border-t border-[#e5e5e5] w-full">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex flex-col items-center text-center p-3 bg-[#f5f4f0] rounded">
                    <Icon size={20} className="text-[#c8922a] mb-2" />
                    <span className="text-lg font-black text-[#1a1a1a] leading-none">{stat.value}</span>
                    <span className="text-xs text-[#9a9a9a] mt-1 leading-tight">{stat.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
