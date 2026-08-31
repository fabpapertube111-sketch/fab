'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Products', href: '/products' },
  { label: 'Applications', href: '/applications' },
  { label: 'Why Choose Us', href: '/why-choose-us' },
  { label: 'Contact', href: '/contact' },
];

const products = [
  { label: 'Sewing Thread Tube', href: '/products/white-sewing-thread-paper-tube' },
  { label: 'Notebook Cover Tube', href: '/products/brown-notebook-cover-paper-tube' },
  { label: 'Sparkle Candle Tube', href: '/products/birthday-cake-sparkle-candle-tube' },
  { label: 'Thermal Roll Tube', href: '/products/thermal-roll-paper-tube' },
  { label: 'Stretch Film Tube', href: '/products/stretch-film-roll-paper-tube' },
  { label: 'Firecracker Tubes', href: '/products' },
];

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  );
}

const socials = [
  { label: 'Facebook',  href: 'https://facebook.com',  Icon: FacebookIcon,  hoverColor: '#1877f2' },
  { label: 'Instagram', href: 'https://www.instagram.com/fabpapertube?igsi=dGJ1N3F3dmE3ZGVi', Icon: InstagramIcon, hoverColor: '#e1306c' },
  { label: 'YouTube',   href: 'https://youtube.com/@fabpapertube?si=8PbHg01JcujbTdSU',   Icon: YouTubeIcon,   hoverColor: '#ff0000' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0f0f] text-white relative overflow-hidden">
      {/* Industrial Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,146,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,146,42,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#c8922a] to-transparent" />

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand Column */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-shrink-0" style={{ width: '90px', height: '90px' }}>
                <Image
                  src="/images/fab-logo.png"
                  alt="FAB Paper Tube Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-black text-white" style={{ fontSize: '18px', letterSpacing: '0.04em' }}>
                  FAB PAPER TUBE
                </div>
              </div>
            </div>

            <p className="leading-relaxed mb-6" style={{ color: '#9a9a9a', fontSize: '14px' }}>
              Quality Paper Tubes manufactured with precision, consistency and customer-focused requirements. Specializing in small-size and small-diameter paper tube manufacturing.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {socials.map(({ label, href, Icon, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-250"
                  style={{ background: 'rgba(255,255,255,0.07)', color: '#a0a0a0', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = hoverColor;
                    el.style.borderColor = hoverColor + '55';
                    el.style.background = hoverColor + '18';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#a0a0a0';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.background = 'rgba(255,255,255,0.07)';
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h3 className="font-bold tracking-widest uppercase mb-6 flex items-center gap-2" style={{ color: '#ffffff', fontSize: '13px' }}>
              <span className="w-5 h-0.5 bg-[#c8922a]" />
              Quick Links
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center rounded-md transition-all duration-200"
                    style={{ color: '#a0a0a0', fontSize: '14.5px', padding: '7px 0' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e0a83b'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#a0a0a0'; }}
                  >
                    <ArrowRight size={13} className="mr-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: '#e0a83b' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div variants={fadeUp}>
            <h3 className="font-bold tracking-widest uppercase mb-6 flex items-center gap-2" style={{ color: '#ffffff', fontSize: '13px' }}>
              <span className="w-5 h-0.5 bg-[#c8922a]" />
              Products
            </h3>
            <ul className="space-y-1">
              {products.map((product) => (
                <li key={product.href}>
                  <Link
                    href={product.href}
                    className="group flex items-center rounded-md transition-all duration-200"
                    style={{ color: '#a0a0a0', fontSize: '14.5px', padding: '7px 0' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e0a83b'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#a0a0a0'; }}
                  >
                    <ArrowRight size={13} className="mr-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: '#e0a83b' }} />
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUp}>
            <h3 className="font-bold tracking-widest uppercase mb-5 flex items-center gap-2" style={{ color: '#ffffff', fontSize: '13px' }}>
              <span className="w-5 h-0.5 bg-[#c8922a]" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+918238074700"
                  className="flex items-start gap-3 hover:text-white transition-colors duration-200 group"
                  style={{ color: '#a0a0a0' }}
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                  <div>
                    <div className="mb-0.5" style={{ color: '#666', fontSize: '12px' }}>Axit Hirani</div>
                    <div className="group-hover:text-[#c8922a] transition-colors" style={{ fontSize: '14px' }}>+91 82380 74700</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919879645030"
                  className="flex items-start gap-3 hover:text-white transition-colors duration-200 group"
                  style={{ color: '#a0a0a0' }}
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                  <div>
                    <div className="mb-0.5" style={{ color: '#666', fontSize: '12px' }}>Mansukh Ranpariya</div>
                    <div className="group-hover:text-[#c8922a] transition-colors" style={{ fontSize: '14px' }}>+91 98796 45030</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:fabpapertube111@gmail.com"
                  className="flex items-start gap-3 hover:text-white transition-colors duration-200 group"
                  style={{ color: '#a0a0a0' }}
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                  <span className="group-hover:text-[#c8922a] transition-colors break-all" style={{ fontSize: '14px' }}>
                    fabpapertube111@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Star+Gold+Industrial+Park+Kuha+Ahmedabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors duration-200 group"
                  style={{ color: '#a0a0a0' }}
                >
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                  <span className="group-hover:text-[#c8922a] transition-colors" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    Shed No. 14, Star Gold Industrial Park,<br />
                    Kuha, Ahmedabad, Gujarat - 382433
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />

        {/* Bottom Bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span style={{ color: '#5a5a5a', fontSize: '13px' }}>
            © {currentYear} <span style={{ color: '#888' }}>FAB Paper Tube</span>. All rights reserved.
          </span>
          <span style={{ color: '#5a5a5a', fontSize: '13px' }}>
            Paper Tube Manufacturer, Ahmedabad, Gujarat, India
          </span>
        </div>
      </div>
    </footer>
  );
}
