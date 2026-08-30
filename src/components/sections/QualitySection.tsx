'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { slideLeft, slideRight, viewportConfig, staggerContainer } from '@/lib/animations';

const qualityPoints = [
  'Strength for reliable winding',
  'Consistent inner diameter',
  'Uniform wall thickness',
  'Quality kraft paper selection',
  'Precise length cutting',
  'Clean finishing on both ends',
];

export default function QualitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section ref={sectionRef} className="section-padding bg-[#1a1a1a] overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6"
          >
            <motion.div variants={slideLeft} className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="w-8 h-0.5 bg-[#c8922a]" />
              <span className="text-[#c8922a] text-xs font-bold tracking-[0.2em] uppercase">Quality Commitment</span>
            </motion.div>

            <motion.h2
              variants={slideLeft}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight"
            >
              Quality That Supports Your{' '}
              <span className="text-[#c8922a]">Production</span>
            </motion.h2>

            <motion.p variants={slideLeft} className="text-gray-400 text-base md:text-lg leading-relaxed">
              We understand that a paper tube is not just a component. It supports your winding, handling and production process. That&apos;s why we focus on strength, dimensions, finishing and consistent manufacturing.
            </motion.p>

            <motion.p variants={slideLeft} className="text-gray-500 leading-relaxed">
              A defective paper tube disrupts your winding machine, wastes material and delays production. Our commitment is to deliver tubes that work — every time, every batch.
            </motion.p>

            {/* Quality Points */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-3 w-full">
              {qualityPoints.map((point) => (
                <motion.div key={point} variants={slideLeft} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8922a] flex-shrink-0" />
                  <span className="text-gray-300 text-sm text-left">{point}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={slideRight}
            className="relative"
          >
            <motion.div style={{ y: imageY }}>
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 border border-[#c8922a]/20 rounded" />
                <div className="absolute inset-4 bg-[#0f0f0f] rounded flex flex-col items-center justify-center gap-6 p-8">
                  <div className="w-24 h-24 bg-[#c8922a]/10 border-2 border-[#c8922a]/30 rotate-45 flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#c8922a] rotate-0 flex items-center justify-center">
                      <span className="text-white font-black text-xl -rotate-45">Q</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-black text-2xl mb-1">Quality First</div>
                    <div className="text-gray-500 text-xs tracking-widest uppercase">Manufacturing Standard</div>
                  </div>
                  <div className="w-full space-y-3">
                    {[
                      { label: 'Dimensional Accuracy', width: '95%' },
                      { label: 'Wall Consistency', width: '92%' },
                      { label: 'Strength Rating', width: '98%' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">{item.label}</span>
                          <span className="text-[#c8922a] font-medium">{item.width}</span>
                        </div>
                        <div className="h-1 bg-[#2d2d2d] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: item.width }}
                            viewport={viewportConfig}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                            className="h-full bg-[#c8922a] rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos) => (
                  <div
                    key={pos}
                    className={`absolute ${pos} w-6 h-6 border-[#c8922a]`}
                    style={{
                      borderWidth: pos.includes('top') ? '2px 0 0 2px' : pos.includes('right') ? '2px 2px 0 0' : pos.includes('left') ? '0 0 2px 2px' : '0 2px 2px 0',
                      borderStyle: 'solid',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
