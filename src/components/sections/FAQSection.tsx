'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';

const faqs = [
  { q: 'What types of paper tubes do you manufacture?', a: 'We manufacture sewing thread tubes, notebook cover tubes, thermal roll tubes, stretch film tubes, candle tubes, firecracker tubes (Mirchi Bomb, Butterfly, Selfie Stick) and custom paper tubes as per customer requirements.' },
  { q: 'Do you accept custom size orders for paper tubes?', a: 'Yes, we specialize in custom size paper tube manufacturing. We can produce tubes to your exact specifications — specific diameter, length, wall thickness and paper grade.' },
  { q: 'What is your minimum order quantity?', a: 'Minimum order quantities vary by product type. Please contact us with your specific requirements and we will provide the best solution for your order size.' },
  { q: 'What industries do you serve?', a: 'We serve textile, packaging, stationery, cracker manufacturing, candle manufacturing, thermal roll, POS billing and general industrial sectors.' },
  { q: 'Where are you located?', a: 'We are located at Shed No. 14, STAR GOLD INDUSTRIAL PARK, bus stand, Indore - Ahmedabad Hwy, opp. Ghardaghar Kothiya, Kuha, Gujarat 382433.' },
  { q: 'How can I place an order?', a: 'You can contact us by phone (+91 82380 74700 or +91 98796 45030), email (fabpapertube111@gmail.com) or fill the contact form on our website with your requirements.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="lg:sticky lg:top-28 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <span className="w-8 h-0.5 bg-[#1a4a9e]" />
              <span className="text-[#1a4a9e] text-xs font-bold tracking-[0.2em] uppercase">FAQ</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-[#1a1a1a] leading-tight mb-4">
              Frequently Asked{' '}
              <span className="text-[#1a4a9e]">Questions</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#6b6b6b] leading-relaxed text-sm">
              Have questions about our paper tubes or the ordering process? Find answers to the most common questions here.
            </motion.p>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="space-y-2"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="border border-[#e5e5e5] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-[#f5f8ff] transition-colors duration-200"
                  aria-expanded={open === i}
                >
                  <span className="font-semibold text-sm text-[#1a1a1a]">{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
                    <ChevronDown size={16} className={open === i ? 'text-[#1a4a9e]' : 'text-gray-400'} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-1 text-sm text-[#6b6b6b] leading-relaxed border-t border-[#f0f0f0]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
