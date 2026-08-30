'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shirt, BookOpen, FileText, Package, Flame, Zap, Factory, Wind } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';

const applications = [
  {
    icon: Shirt,
    title: 'Textile',
    description: 'Sewing thread and yarn winding applications in textile manufacturing.',
  },
  {
    icon: BookOpen,
    title: 'Notebook & Stationery',
    description: 'Notebook cover rolls and paper roll winding for stationery industry.',
  },
  {
    icon: FileText,
    title: 'Thermal Rolls',
    description: 'Thermal paper rolls for POS billing machines and retail systems.',
  },
  {
    icon: Package,
    title: 'Stretch Film & Packaging',
    description: 'Packaging industry stretch film roll cores for wrapping applications.',
  },
  {
    icon: Flame,
    title: 'Candle Applications',
    description: 'Birthday cake sparkle candle manufacturing with precise tube dimensions.',
  },
  {
    icon: Zap,
    title: 'Cracker Manufacturing',
    description: 'Firecracker tubes including Mirchi Bomb, Butterfly and Selfie Stick types.',
  },
  {
    icon: Factory,
    title: 'Industrial Applications',
    description: 'Various industrial paper tube and paper core requirements.',
  },
  {
    icon: Wind,
    title: 'Custom Requirements',
    description: 'Custom paper tube manufacturing to your specific size and application needs.',
  },
];

export default function ApplicationsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Where We Are Used"
            title="Built for Multiple Applications"
            description="From textile winding to cracker manufacturing, our paper tubes serve diverse industrial needs."
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {applications.map((app, i) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.title}
                variants={fadeUp}
                custom={i}
                className="group p-5 border border-[#e5e5e5] rounded hover:border-[#c8922a]/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <div className="w-10 h-10 bg-[#f5f4f0] rounded flex items-center justify-center mb-3 group-hover:bg-[#c8922a]/10 transition-colors duration-300">
                  <Icon size={20} className="text-[#c8922a]" />
                </div>
                <h3 className="font-bold text-[#1a1a1a] text-sm mb-1.5">{app.title}</h3>
                <p className="text-[#9a9a9a] text-xs leading-relaxed">{app.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            href="/applications"
            className="group inline-flex items-center gap-2 text-[#c8922a] font-semibold text-sm hover:gap-3 transition-all duration-200"
          >
            Explore All Applications
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
