'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight, Send } from 'lucide-react';
import { staggerContainer, fadeUp, slideLeft, slideRight, viewportConfig } from '@/lib/animations';

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Axit Hirani',
    value: '+91 82380 74700',
    href: 'tel:+918238074700',
  },
  {
    icon: Phone,
    label: 'Mansukh Ranpariya',
    value: '+91 98796 45030',
    href: 'tel:+919879645030',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'fabpapertube111@gmail.com',
    href: 'mailto:fabpapertube111@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Factory Address',
    value:
      'Shed No. 14, STAR GOLD INDUSTRIAL PARK, bus stand, Indore - Ahmedabad Hwy, opp. Ghardaghar Kothiya, Kuha, Gujarat 382433',
    href: 'https://maps.google.com/?q=Shed+No.+14+STAR+GOLD+INDUSTRIAL+PARK+Kuha+Gujarat+382433',
  },
];

const productOptions = [
  'White Sewing Thread Paper Tube',
  'Brown Notebook Cover Paper Tube',
  'Birthday Cake Sparkle Candle Tube',
  'Selfie Stick Pencil Crackers',
  'Butterfly Firecracker Tube',
  'Thermal Roll Paper Tube',
  'Mirchi Bomb Paper Tube',
  'Stretch Film Roll Paper Tube',
];

const quantityOptions = [
  '1 Ton',
  '2 Ton',
  '3 Ton',
  '5 Ton',
  '10 Ton',
  '15 Ton',
  '20 Ton',
  '25 Ton',
  '50 Ton',
  '100 Ton',
  'More than 100 Ton',
  'Custom Quantity',
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[+]?[\d\s-]{8,15}$/.test(data.phone)) {
    errors.phone = 'Enter a valid phone number';
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!data.message.trim()) errors.message = 'Please describe your requirement';
  return errors;
}

export default function ContactPageClient() {
  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: '',
    quantity: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, formId: 1144 }),
      });
      const data = await res.json() as { ok: boolean; message: string };
      if (data.ok) {
        setSubmitted(true);
      } else {
        setErrors({ message: data.message || 'Submission failed. Please try again.' });
      }
    } catch {
      setErrors({ message: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <PageBanner
        eyebrow="Get In Touch"
        title="Contact FAB Paper Tube"
        highlight="FAB Paper Tube"
        description="Send us your paper tube requirement — size, diameter, length, quantity and application. We will get back to you with the right solution."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
                className="flex flex-col gap-6"
              >
                <motion.div variants={slideLeft}>
                  <div className="flex items-center gap-3 mb-3 justify-center lg:justify-start">
                    <span className="w-8 h-0.5 bg-[#c8922a]" />
                    <span className="text-[#c8922a] text-xs font-bold tracking-[0.2em] uppercase">
                      Reach Us Directly
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] leading-tight text-center lg:text-left">
                    We Are Ready to Help
                  </h2>
                </motion.div>

                <motion.p variants={slideLeft} className="text-[#6b6b6b] leading-relaxed text-center lg:text-left">
                  Have a paper tube requirement? Call us, send an email or fill the form. Our team will
                  respond promptly with the right solution.
                </motion.p>

                {/* Contact Cards */}
                <motion.div variants={staggerContainer} className="space-y-4">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <motion.a
                        key={info.label}
                        variants={fadeUp}
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-4 p-4 border border-[#e5e5e5] rounded hover:border-[#c8922a]/40 hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-[#c8922a]/10 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-[#c8922a]/20 transition-colors">
                          <Icon size={18} className="text-[#c8922a]" />
                        </div>
                        <div>
                        <div className="text-xs font-bold text-[#9a9a9a] uppercase tracking-wider mb-0.5">
                          {info.label}
                        </div>
                        <div className="text-[#1a1a1a] text-sm font-medium group-hover:text-[#c8922a] transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>

              {/* Google Maps Embed */}
              <motion.div
                variants={fadeUp}
                className="rounded-xl overflow-hidden border border-[#e5e5e5]"
                style={{ aspectRatio: '16/9' }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.6!2d72.69390!3d23.06140!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9c3b1f5d8f01%3A0xfab00001234abcde!2sFAB%20PAPER%20TUBE!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block', width: '100%', height: '100%', minHeight: '260px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FAB Paper Tube — Shed No. 14, STAR GOLD INDUSTRIAL PARK, Kuha, Gujarat 382433"
                />
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={slideRight}
            >
              <div className="bg-[#f5f4f0] rounded p-6 md:p-8 border border-[#e5e5e5]">
                {submitted ? (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-10 gap-4"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-black text-[#1a1a1a]">Requirement Sent!</h3>
                    <p className="text-[#6b6b6b] text-sm leading-relaxed max-w-sm">
                      Thank you for contacting FAB Paper Tube. We have received your requirement and
                      will get back to you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: '',
                          company: '',
                          phone: '',
                          email: '',
                          product: '',
                          quantity: '',
                          message: '',
                        });
                      }}
                      className="mt-2 text-sm text-[#c8922a] font-semibold hover:underline"
                    >
                      Send Another Requirement
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-xl font-black text-[#1a1a1a] mb-1">Send Your Requirement</h2>
                      <p className="text-[#9a9a9a] text-sm">
                        Fill in the details below and we will get back to you.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      {/* Name + Company */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Name <span className="text-[#c8922a]">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={`w-full px-4 py-3 bg-white border rounded text-sm text-[#1a1a1a] placeholder:text-[#c0c0c0] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors ${
                              errors.name ? 'border-red-400' : 'border-[#e5e5e5]'
                            }`}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Company Name
                          </label>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Company / Business name"
                            className="w-full px-4 py-3 bg-white border border-[#e5e5e5] rounded text-sm text-[#1a1a1a] placeholder:text-[#c0c0c0] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Phone + Email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Phone <span className="text-[#c8922a]">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className={`w-full px-4 py-3 bg-white border rounded text-sm text-[#1a1a1a] placeholder:text-[#c0c0c0] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors ${
                              errors.phone ? 'border-red-400' : 'border-[#e5e5e5]'
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className={`w-full px-4 py-3 bg-white border rounded text-sm text-[#1a1a1a] placeholder:text-[#c0c0c0] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors ${
                              errors.email ? 'border-red-400' : 'border-[#e5e5e5]'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Product + Quantity */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="product"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Product Requirement
                          </label>
                          <select
                            id="product"
                            name="product"
                            value={form.product}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-[#e5e5e5] rounded text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors appearance-none cursor-pointer"
                          >
                            <option value="">Select product type</option>
                            {productOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="quantity"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Quantity
                          </label>
                          <select
                            id="quantity"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-[#e5e5e5] rounded text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors appearance-none cursor-pointer"
                          >
                            <option value="">Select quantity</option>
                            {quantityOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                        >
                          Your Requirement <span className="text-[#c8922a]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Describe your requirement — tube diameter, length, wall thickness, application, etc."
                          className={`w-full px-4 py-3 bg-white border rounded text-sm text-[#1a1a1a] placeholder:text-[#c0c0c0] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors resize-none ${
                            errors.message ? 'border-red-400' : 'border-[#e5e5e5]'
                          }`}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-[#c8922a] text-white font-bold py-3.5 rounded-sm hover:bg-[#a67520] transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Requirement
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>


                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
