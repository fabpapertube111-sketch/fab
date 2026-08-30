import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us | Get a Quote for Paper Tubes',
  description:
    'Contact FAB Paper Tube for paper tube requirements. Send your specifications — diameter, length, quantity and application. We will provide the right paper tube solution. Located in Ahmedabad, Gujarat.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
