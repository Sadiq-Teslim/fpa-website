import { Hero } from '@/widgets/hero';
import { ProblemSection } from '@/widgets/problem';
import { DemoSection } from '@/widgets/demo';
import { OffersSection } from '@/widgets/offers';
import { HowItWorksSection } from '@/widgets/how-it-works';
import { AudienceSection } from '@/widgets/audience';
import { PricingSection } from '@/widgets/pricing';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <DemoSection />
      <OffersSection />
      <HowItWorksSection />
      <AudienceSection />
      <PricingSection />
    </>
  );
}
