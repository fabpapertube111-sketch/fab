'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Ruler, Cog, UserCheck, Truck } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';

const reasons = [
  { number: '01', icon: CheckCircle2, title: 'Consistent Quality', description: 'Every tube meets the same precise specifications batch after batch. Our quality control ensures your production line runs without interruption.' },
  { number: '02', icon: Ruler, title: 'Small Size Expertise', description: 'We specialize in small-size and small-diameter paper tubes — a segment requiring higher precision in dimensions, wall thickness and paper quality.' },
  { number: '03', icon: Cog, title: 'Precision Manufacturing', description: 'Our manufacturing process focuses on dimensional accuracy. Consistent inner diameter and wall thickness for smooth winding and production performance.' },
  { number: '04', icon: UserCheck, title: 'Customer-Specific Requirements', description: 'We manufacture to your exact specifications. Custom diameter, length, wall thickness and paper grade — all adjusted to your requirement.' },
  { number: '05', icon: Truck, title: 'Reliable Supply', description: 'Since 2013, we have been a dependable supply partner for manufacturers. On-time delivery and consistent production capacity to meet your demand.' },
];

function ReasonCard({ reason, i }: { reason: typeof reasons[0]; i: number }) {
  const Icon = reason.icon;
  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      className="group bg-white p-8 rounded border border-[#e5e5e5] hover:border-[#c8922a]/30 hover:shadow-lg transition-all duration-400 hover:-translate-y-1 relative overflow-hidden flex flex-col items-center text-center lg:items-start lg:text-left"
    >
      <div className="absolute top-4 right-5 text-6xl font-black text-[#f5f4f0] group-hover:text-[#c8922a]/10 transition-colors duration-300 select-none" aria-hidden="true">
        {reason.number}
      </div>
      <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
        <div className="w-12 h-12 bg-[#c8922a]/10 rounded flex items-center justify-center mb-5 group-hover:bg-[#c8922a]/20 transition-colors duration-300">
          <Icon size={22} className="text-[#c8922a]" />
        </div>
        <h3 className="font-bold text-[#1a1a1a] text-lg mb-3 group-hover:text-[#c8922a] transition-colors duration-200">{reason.title}</h3>
        <p className="text-[#6b6b6b] text-sm leading-relaxed">{reason.description}</p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-[#f5f4f0]">
      <div className="container-custom">
        <div className="mb-12">
          <SectionHeading
            eyebrow="The FAB Advantage"
            title="Why Choose FAB Paper Tube?"
            description="Built on a decade of manufacturing experience and a relentless focus on quality."
          />
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.slice(0, 3).map((reason, i) => <ReasonCard key={reason.number} reason={reason} i={i} />)}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {reasons.slice(3).map((reason, i) => <ReasonCard key={reason.number} reason={reason} i={i} />)}
        </motion.div>
      </div>
    </section>
  );
}
