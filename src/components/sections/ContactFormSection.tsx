'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { staggerContainer, fadeUp, slideLeft, slideRight, viewportConfig } from '@/lib/animations';

interface FormData {
  name: string; company: string; phone: string; email: string;
  product: string; quantity: string; message: string;
}
interface Errors { name?: string; phone?: string; message?: string; submitError?: string; }

const productOptions = [
  'White Sewing Thread Paper Tube', 'Brown Notebook Cover Paper Tube',
  'Birthday Cake Sparkle Candle Tube', 'Selfie Stick Pencil Crackers Tube',
  'Butterfly Firecracker Tube', 'Thermal Roll Paper Tube',
  'Mirchi Bomb Paper Tube', 'Stretch Film Roll Paper Tube', 'Custom Requirement',
];

const quantityOptions = [
  '0.5 Ton (Minimum Order)',
  '1 Ton',
  '2 Ton',
  '3 Ton',
  '5 Ton',
  '10 Ton',
  '15 Ton',
  '20 Ton',
  '25 Ton',
  '50 Ton',
  '100 Ton (Bulk Order)',
  'More than 100 Ton',
  'Custom Quantity — Contact Us',
];

export default function ContactFormSection() {
  const [form, setForm] = useState<FormData>({ name: '', company: '', phone: '', email: '', product: '', quantity: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof Errors]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (!form.message.trim()) errs.message = 'Requirement is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }

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
      setErrors({ message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (err?: string) =>
    `w-full px-4 py-3 border rounded text-sm text-[#1a1a1a] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a4a9e]/30 focus:border-[#1a4a9e] transition-colors bg-white ${err ? 'border-red-400' : 'border-[#e5e5e5]'}`;

  return (
    <section className="section-padding" style={{ background: '#f5f7fa' }}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">

          {/* LEFT: Contact info cards — matching the business card in screenshot */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            <motion.div variants={slideLeft}>
              <span className="text-[#1a4a9e] text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-3 mb-3 justify-center lg:justify-start">
                <span className="w-8 h-0.5 bg-[#1a4a9e]" />
                Contact Us
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-3 text-center lg:text-left">
                Get in <span className="text-[#1a4a9e]">Touch</span>
              </h2>
              <p className="text-[#6b6b6b] text-sm leading-relaxed text-center lg:text-left">
                Tell us your paper tube requirements — size, diameter, quantity and application. We will respond with the right solution.
              </p>
            </motion.div>

            {/* Business card style info — matches the uploaded business card image */}
            <motion.div
              variants={slideLeft}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              {/* Blue left panel + orange divider + white right — matches the business card */}
              <div className="flex">
                {/* Left blue panel */}
                <div className="bg-[#1a4a9e] p-6 flex flex-col justify-center gap-4 flex-shrink-0 w-2/5">
                  <div>
                    <div className="text-white/70 text-xs mb-0.5">(since 2013)</div>
                    <div className="text-white font-bold text-sm leading-tight">Manufacturing all type of paper tube</div>
                  </div>
                  <ul className="space-y-1.5">
                    {['Stitching thread Tube', 'Stretch film core', 'Textile Paper Tube'].map(item => (
                      <li key={item} className="text-white text-xs flex items-start gap-1.5">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"/>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Orange divider */}
                <div className="w-1.5 bg-orange-500 flex-shrink-0"/>
                {/* Right white panel */}
                <div className="bg-white p-5 flex flex-col gap-3.5 flex-1">
                  {[
                    { icon: Phone, label: 'AXIT HIRANI', value: '+ 91 82380 74700', href: 'tel:+918238074700' },
                    { icon: Phone, label: 'MANSHUKH RANPARIYA', value: '+ 91 98796 45030', href: 'tel:+919879645030' },
                    { icon: Mail, label: '', value: 'fabpapertube111@gmail.com', href: 'mailto:fabpapertube111@gmail.com' },
                    { icon: MapPin, label: '', value: 'Shed No. 14, STAR GOLD INDUSTRIAL PARK, bus stand, Indore - Ahmedabad Hwy, opp. Ghardaghar Kothiya, Kuha, Gujarat 382433', href: 'https://maps.google.com/?q=Shed+No.+14+STAR+GOLD+INDUSTRIAL+PARK+Kuha+Gujarat+382433' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <a key={i} href={item.href} className="flex items-start gap-2.5 group">
                        <div className="w-7 h-7 rounded-full border-2 border-[#1a4a9e] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#1a4a9e] transition-colors">
                          <Icon size={12} className="text-[#1a4a9e] group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          {item.label && <div className="text-[#1a4a9e] font-black text-xs">{item.label}</div>}
                          <div className="text-[#333] text-xs leading-relaxed">{item.value}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={slideRight}
          >
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-8 gap-4">
                  <CheckCircle2 size={48} className="text-green-500" />
                  <h3 className="text-xl font-black text-[#1a1a1a]">Sent Successfully!</h3>
                  <p className="text-[#6b6b6b] text-sm">Thank you! We will contact you shortly.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name:'',company:'',phone:'',email:'',product:'',quantity:'',message:'' }); }}
                    className="text-sm text-[#1a4a9e] font-semibold hover:underline mt-2">Send Another</button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-black text-[#1a1a1a] mb-1">Send Your Requirement</h3>
                  <p className="text-[#9a9a9a] text-sm mb-5">Fill the form below and we&apos;ll get back to you promptly.</p>
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#4a4a4a] mb-1.5">Name <span className="text-red-500">*</span></label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass(errors.name)} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#4a4a4a] mb-1.5">Company</label>
                        <input name="company" value={form.company} onChange={handleChange} placeholder="Company name" className={inputClass()} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#4a4a4a] mb-1.5">Phone <span className="text-red-500">*</span></label>
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass(errors.phone)} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#4a4a4a] mb-1.5">Email</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass()} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#4a4a4a] mb-1.5">Paper Tube Type</label>
                        <select name="product" value={form.product} onChange={handleChange} className={inputClass() + ' cursor-pointer'}>
                          <option value="">Select type</option>
                          {productOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#4a4a4a] mb-1.5">Quantity (Approx.)</label>
                        <select name="quantity" value={form.quantity} onChange={handleChange} className={inputClass() + ' cursor-pointer'}>
                          <option value="">Select quantity</option>
                          {quantityOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4a4a4a] mb-1.5">Your Message <span className="text-red-500">*</span></label>
                      <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                        placeholder="Describe your requirement — tube diameter, length, wall thickness, application..."
                        className={inputClass(errors.message) + ' resize-none'} />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-[#1a4a9e] text-white font-bold py-3.5 rounded-sm hover:bg-[#0d2b6b] transition-all duration-300 disabled:opacity-60 text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                      {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Sending...</> : <><Send size={15}/>Send Requirement</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
