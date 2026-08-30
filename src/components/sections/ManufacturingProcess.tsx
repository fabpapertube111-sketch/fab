'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Package, Cog, CheckSquare, Truck } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Requirement',
    description: 'Understanding your specific tube dimensions, wall thickness, paper grade and application requirements.',
  },
  {
    number: '02',
    icon: Package,
    title: 'Material Selection',
    description: 'Selecting the right quality kraft paper grade and specifications for your application.',
  },
  {
    number: '03',
    icon: Cog,
    title: 'Tube Manufacturing',
    description: 'Precision winding of paper tubes to your exact dimensions with consistent wall thickness.',
  },
  {
    number: '04',
    icon: CheckSquare,
    title: 'Quality Checking',
    description: 'Every batch is checked for dimensions, wall consistency, strength and finish before packing.',
  },
  {
    number: '05',
    icon: Truck,
    title: 'Final Supply',
    description: 'Packed carefully and delivered to your facility on time, every time.',
  },
];

export default function ManufacturingProcess() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="mb-12">
          <SectionHeading
            eyebrow="How We Work"
            title="Our Manufacturing Process"
            description="A structured, quality-focused process from your requirement to final delivery."
          />
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="relative"
          >
            {/* Connector line */}
            <div className="absolute top-12 left-0 right-0 h-px bg-[#e5e5e5] z-0">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportConfig}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-gradient-to-r from-[#c8922a] to-[#c8922a]/30 origin-left"
              />
            </div>

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    variants={fadeUp}
                    custom={i}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Step circle */}
                    <div className="w-24 h-24 rounded-full bg-white border-2 border-[#e5e5e5] group-hover:border-[#c8922a] flex flex-col items-center justify-center mb-4 transition-all duration-300 shadow-sm group-hover:shadow-md relative">
                      <Icon size={20} className="text-[#c8922a] mb-0.5" />
                      <span className="text-xs font-black text-[#1a1a1a]">{step.number}</span>
                    </div>

                    <h3 className="font-bold text-[#1a1a1a] text-sm mb-2">{step.title}</h3>
                    <p className="text-[#9a9a9a] text-xs leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="relative"
          >
            {/* Vertical connector */}
            <div className="absolute left-5 top-6 bottom-6 w-px bg-[#e5e5e5]" />

            <div className="space-y-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    variants={fadeUp}
                    custom={i}
                    className="flex gap-5"
                  >
                    {/* Icon circle */}
                    <div className="w-10 h-10 rounded-full bg-[#c8922a] flex items-center justify-center flex-shrink-0 relative z-10">
                      <Icon size={16} className="text-white" />
                    </div>

                    <div className="pt-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-[#c8922a]">{step.number}</span>
                        <h3 className="font-bold text-[#1a1a1a] text-base">{step.title}</h3>
                      </div>
                      <p className="text-[#6b6b6b] text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
