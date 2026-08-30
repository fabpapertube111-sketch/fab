'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Layers, Truck } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';

const features = [
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    description: 'We maintain strict quality standards in every paper tube we manufacture, ensuring your production line runs without interruption.',
    color: '#8B7355',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Solutions',
    description: 'Our paper tubes are made from sustainable kraft paper, offering an eco-friendly alternative for your packaging needs.',
    color: '#8B7355',
  },
  {
    icon: Layers,
    title: 'High Strength & Durability',
    description: 'Engineered for strength, our tubes withstand winding tension, storage weight and transport conditions reliably.',
    color: '#8B7355',
  },
  {
    icon: Truck,
    title: 'On-Time Delivery',
    description: 'We understand your production schedules. Our reliable supply ensures you always receive your tubes on time.',
    color: '#8B7355',
  },
];

export default function WhyChooseHomSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="text-xs font-bold tracking-[0.2em] uppercase text-[#8B7355] flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-0.5 bg-[#8B7355]" />
            Our Advantages
            <span className="w-8 h-0.5 bg-[#8B7355]" />
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-3">
            Why Choose <span className="text-[#1a4a9e]">FAB Paper Tube</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6b6b6b] text-base max-w-2xl mx-auto leading-relaxed">
            We provide premium paper tubes meeting the highest standards of quality, strength and consistency. We put quality first and always try to meet customers&apos; needs.
          </motion.p>
        </motion.div>

        {/* 4 Feature Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                className="group flex flex-col items-center text-center p-6 border border-[#e5e5e5] rounded-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 bg-white hover:border-[#8B7355]/30"
              >
                {/* Round gold icon - matches the screenshot icons exactly */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform duration-300"
                  style={{ background: f.color }}
                >
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="font-bold text-[#1a1a1a] text-base mb-2">{f.title}</h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
