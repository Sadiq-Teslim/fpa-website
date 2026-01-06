import { Metadata } from 'next';
import { ContactSection } from '@/widgets/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the FairPlay Africa team. We\'d love to hear from you.',
};

export default function ContactPage() {
  return <ContactSection />;
}
