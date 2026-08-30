import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | Paper Tube Manufacturer Since 2013',
  description:
    'Learn about FAB Paper Tube — established in 2013 in Ahmedabad, Gujarat. Small-size paper tube specialists with 10+ years of manufacturing expertise, precision focus and customer-driven production.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
