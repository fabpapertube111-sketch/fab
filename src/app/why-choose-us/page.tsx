import type { Metadata } from 'next';
import WhyChooseUsPageClient from './WhyChooseUsPageClient';

export const metadata: Metadata = {
  title: 'Why Choose FAB Paper Tube | Quality, Precision & Reliability',
  description:
    'Discover why manufacturers choose FAB Paper Tube — consistent quality, small-size expertise, precision manufacturing, customer-specific requirements and reliable supply since 2013.',
};

export default function WhyChooseUsPage() {
  return <WhyChooseUsPageClient />;
}
