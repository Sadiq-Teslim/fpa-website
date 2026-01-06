import { Metadata } from 'next';
import { PricingSection } from '@/widgets/pricing';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Choose a pricing plan that fits your needs. Transparent pricing for content protection.',
};

export default function PricingPage() {
  return (
    <div className="pt-20">
      <PricingSection />
    </div>
  );
}
