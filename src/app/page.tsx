import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import WhyChooseHomSection from '@/components/sections/WhyChooseHomSection';
import TrustedManufacturerSection from '@/components/sections/TrustedManufacturerSection';
import ProductsSection from '@/components/sections/ProductsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { getAllProducts, getTestimonials } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'FAB Paper Tube | Premium Paper Tube & Paper Core Manufacturer, Ahmedabad',
  description:
    'FAB Paper Tube — Premium and Sustainable paper tube solutions since 2013. High Quality Paper Tubes & Paper Cores for Textile, Packaging, Stationery, Paper Converting and Industrial Applications.',
};

function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FAB Paper Tube',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fabpapertube.com',
    description: 'Premium Paper Tube and Paper Core Manufacturer based in Ahmedabad, Gujarat. Established in 2013.',
    foundingDate: '2013',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shed No. 14, STAR GOLD INDUSTRIAL PARK, bus stand, Indore - Ahmedabad Hwy, opp. Ghardaghar Kothiya, Kuha',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '382433',
      addressCountry: 'IN',
    },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+91-82380-74700', contactType: 'sales' },
    ],
    email: 'fabpapertube111@gmail.com',
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export default async function HomePage() {
  const [products, testimonials] = await Promise.all([
    getAllProducts(),
    getTestimonials(),
  ]);

  return (
    <>
      <OrganizationSchema />
      <HeroSection />
      <WhyChooseHomSection />
      <TrustedManufacturerSection />
      <ProductsSection products={products} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection />
      <ContactFormSection />
    </>
  );
}
