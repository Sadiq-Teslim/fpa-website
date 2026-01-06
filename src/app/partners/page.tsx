import { Metadata } from 'next';
import { PartnersSection } from '@/widgets/partners';

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Partner with FairPlay Africa to protect creativity and build ethical distribution systems.',
};

export default function PartnersPage() {
  return <PartnersSection />;
}
