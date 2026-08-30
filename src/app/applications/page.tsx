import type { Metadata } from 'next';
import ApplicationsPageClient from './ApplicationsPageClient';

export const metadata: Metadata = {
  title: 'Paper Tube Applications | Industries We Serve',
  description:
    'FAB Paper Tube serves textile, packaging, cracker, candle and industrial sectors. Explore paper tube applications for sewing thread, thermal rolls, stretch film, firecracker manufacturing and more.',
};

export default function ApplicationsPage() {
  return <ApplicationsPageClient />;
}
