'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';
import {
  Shirt, BookOpen, FileText, Package, Flame, Zap, Factory, Wind,
  ArrowRight, CheckCircle2,
} from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import CTASection from '@/components/sections/CTASection';

const applications = [
  {
    id: 'textile',
    icon: Shirt,
    title: 'Textile Industry',
    subtitle: 'Sewing Thread & Yarn Winding',
    description: 'Paper tubes are an essential component in the textile and sewing thread industry. Our precision-manufactured small-diameter tubes provide consistent winding performance for sewing thread and yarn manufacturers.',
    usedProducts: ['White Sewing Thread Paper Tube'],
    usedFor: ['Sewing thread winding', 'Yarn winding', 'Thread manufacturing', 'Bobbin manufacturing'],
    color: 'from-blue-500/10 to-blue-600/5',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 'stationery',
    icon: BookOpen,
    title: 'Notebook & Stationery',
    subtitle: 'Paper Roll Winding',
    description: 'The stationery and notebook industry relies on strong, consistent paper tube cores for notebook cover rolls and paper roll winding operations. Our brown kraft tubes provide the structural support needed.',
    usedProducts: ['Brown Notebook Cover Paper Tube'],
    usedFor: ['Notebook cover roll winding', 'Paper roll winding', 'Stationery manufacturing'],
    color: 'from-green-500/10 to-green-600/5',
    borderColor: 'border-green-200',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    id: 'thermal-rolls',
    icon: FileText,
    title: 'Thermal Rolls & POS',
    subtitle: 'Billing & POS Systems',
    description: 'Thermal paper rolls used in POS billing machines, retail billing systems and banking require precise paper tube cores. Our thermal roll tubes ensure smooth paper feeding and reliable billing performance.',
    usedProducts: ['Thermal Roll Paper Tube'],
    usedFor: ['Thermal paper rolls', 'POS billing machines', 'Retail billing', 'Banking systems', 'ATM rolls'],
    color: 'from-purple-500/10 to-purple-600/5',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    id: 'packaging',
    icon: Package,
    title: 'Stretch Film & Packaging',
    subtitle: 'Packaging Industry',
    description: 'The packaging industry requires heavy-duty paper tube cores that can withstand the tension and weight of stretch film rolls. Our stretch film tubes are manufactured for consistent performance in packaging lines.',
    usedProducts: ['Stretch Film Roll Paper Tube'],
    usedFor: ['Stretch film rolls', 'Packaging lines', 'Warehouse wrapping', 'Industrial packaging'],
    color: 'from-orange-500/10 to-orange-600/5',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    id: 'candle',
    icon: Flame,
    title: 'Candle Manufacturing',
    subtitle: 'Sparkle Candle Production',
    description: 'Birthday cake sparkle candle manufacturing requires paper tubes with precise inner diameter and consistent dimensions for uniform candle production. Our candle tubes deliver this precision reliably.',
    usedProducts: ['Birthday Cake Sparkle Candle Tube'],
    usedFor: ['Birthday cake sparkle candles', 'Candle manufacturing', 'Party supplies'],
    color: 'from-yellow-500/10 to-yellow-600/5',
    borderColor: 'border-yellow-200',
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
  },
  {
    id: 'cracker',
    icon: Zap,
    title: 'Cracker Manufacturing',
    subtitle: 'Firecracker Production',
    description: 'The cracker and firecracker manufacturing industry requires paper tubes with precise dimensions and consistent quality. We manufacture specialised tubes for Mirchi Bomb, Butterfly, and Selfie Stick firecrackers.',
    usedProducts: [
      'Selfie Stick Pencil Crackers Tube',
      'Butterfly Firecracker Tube',
      'Mirchi Bomb Paper Tube',
    ],
    usedFor: ['Mirchi bomb firecrackers', 'Butterfly firecrackers', 'Selfie stick firecrackers', 'Cracker manufacturing'],
    color: 'from-red-500/10 to-red-600/5',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Applications',
    subtitle: 'Custom Industrial Use',
    description: 'Various industrial applications require custom paper tube specifications. Whether it is a specific diameter, wall thickness or paper grade, we manufacture to meet your industrial requirements.',
    usedProducts: ['Custom Paper Tubes as per requirement'],
    usedFor: ['Industrial winding', 'Film winding', 'Material storage', 'Custom industrial use'],
    color: 'from-slate-500/10 to-slate-600/5',
    borderColor: 'border-slate-200',
    iconBg: 'bg-slate-50',
    iconColor: 'text-slate-600',
  },
  {
    id: 'custom',
    icon: Wind,
    title: 'Custom Requirements',
    subtitle: 'Any Size, Any Application',
    description: 'Have a unique paper tube requirement? We manufacture custom paper tubes for any application. Tell us your required specifications and we will produce them to your exact requirements.',
    usedProducts: ['Custom Paper Tubes'],
    usedFor: ['Any custom application', 'Any specific requirement', 'Non-standard sizes'],
    color: 'from-teal-500/10 to-teal-600/5',
    borderColor: 'border-teal-200',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
];

export default function ApplicationsPageClient() {
  return (
    <div className="pt-20">
      <PageBanner
        eyebrow="Industries We Serve"
        title="Paper Tube Applications"
        highlight="Applications"
        description="From textile winding to cracker manufacturing — our paper tubes serve diverse industrial needs with consistent precision."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Applications' }]}
      />

      {/* Applications Detail */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <SectionHeading
              eyebrow="Application Areas"
              title="Built for Multiple Applications"
              description="Explore how FAB Paper Tube products are used across different industries."
            />
          </div>

          <div className="space-y-12">
            {applications.map((app, i) => {
              const Icon = app.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.6 }}
                  className={`grid md:grid-cols-2 gap-8 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content */}
                  <div className={`flex flex-col items-center text-center lg:items-start lg:text-left ${isEven ? '' : 'md:order-2'}`}>
                    <div className={`w-12 h-12 ${app.iconBg} rounded flex items-center justify-center mb-4`}>
                      <Icon size={24} className={app.iconColor} />
                    </div>
                    <div className="text-[#c8922a] text-xs font-bold tracking-widest uppercase mb-2">
                      {app.subtitle}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-3">{app.title}</h2>
                    <p className="text-[#6b6b6b] leading-relaxed mb-5">{app.description}</p>

                    <div className="mb-5">
                      <div className="text-xs font-bold tracking-widest uppercase text-[#9a9a9a] mb-3">Used For</div>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {app.usedFor.map((use) => (
                          <span key={use} className="flex items-center gap-1.5 text-sm text-[#4a4a4a] bg-[#f5f4f0] px-3 py-1.5 rounded">
                            <CheckCircle2 size={12} className="text-[#c8922a]" />
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="text-xs font-bold tracking-widest uppercase text-[#9a9a9a] mb-3">Products Used</div>
                      {app.usedProducts.map((p) => (
                        <div key={p} className="text-sm text-[#4a4a4a] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c8922a]" />
                          {p}
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 bg-[#c8922a] text-white font-semibold px-6 py-3 rounded-sm hover:bg-[#a67520] transition-all text-sm"
                    >
                      Request for this Application
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Visual */}
                  <div className={isEven ? '' : 'md:order-1'}>
                    <div className={`bg-gradient-to-br ${app.color} border ${app.borderColor} rounded p-10 aspect-video flex items-center justify-center`}>
                      <div className="text-center">
                        <Icon size={64} className={`${app.iconColor} mx-auto mb-4 opacity-50`} />
                        <div className="font-black text-2xl text-[#1a1a1a]">{app.title}</div>
                        <div className="text-[#6b6b6b] text-sm mt-1">{app.subtitle}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
