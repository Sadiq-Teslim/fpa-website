import { Metadata } from 'next';
import { AboutSection } from '@/widgets/about';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the team behind FairPlay Africa and our mission to protect African creativity.',
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutSection />
    </div>
  );
}
