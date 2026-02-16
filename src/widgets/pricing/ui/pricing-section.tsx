'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, Info } from 'lucide-react';
import { Section, SectionHeader } from '@/shared/ui/section';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { cn } from '@/shared/lib/utils';
import { staggerItem, cardHover } from '@/shared/lib/animations';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for independent filmmakers getting started',
    price: '$49',
    period: '/month',
    features: [
      'Up to 5 content titles',
      '3-month monitoring period',
      '10 platforms monitored',
      'Weekly detection reports',
      'Email notifications',
      'Basic dashboard access',
    ],
    cta: 'Get Started',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For serious creators and small studios',
    price: '$149',
    period: '/month',
    features: [
      'Up to 25 content titles',
      '6-month monitoring period',
      '50+ platforms monitored',
      'Daily detection reports',
      'Priority email & SMS alerts',
      'Full dashboard with analytics',
      'Takedown request assistance',
      'Affiliate redistribution access',
    ],
    highlighted: true,
    badge: 'Most Popular',
    cta: 'Get Started',
  },
  {
    id: 'studio',
    name: 'Studio / Custom',
    description: 'Enterprise solution for studios and distributors',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited content titles',
      'Custom monitoring duration',
      'All platforms + custom sources',
      'Real-time detection & alerts',
      'Dedicated account manager',
      'API access & integrations',
      'Custom reporting',
      'White-label options',
      'SLA guarantees',
    ],
    cta: 'Contact Sales',
  },
];

export function PricingSection() {
  return (
    <Section id="pricing" className="bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <SectionHeader
          title="Simple, Transparent Pricing"
          description="Choose a plan that fits your needs. Pricing is based on duration of monitoring and number of platforms tracked."
        />

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <motion.div key={tier.id} variants={staggerItem}>
              <motion.div
                whileHover={cardHover}
                className={cn(
                  'relative h-full rounded-3xl p-8 overflow-hidden',
                  'bg-gradient-to-br border transition-all duration-500',
                  tier.highlighted
                    ? 'from-slate-800/80 to-slate-900/80 border-teal-500/50'
                    : 'from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-slate-600/50'
                )}
              >
                {/* Highlighted glow */}
                {tier.highlighted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent" />
                )}

                {/* Badge */}
                {tier.badge && (
                  <div className="absolute top-0 right-0 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-semibold rounded-bl-2xl rounded-tr-3xl">
                    {tier.badge}
                  </div>
                )}

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-4xl md:text-5xl font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-gray-400 ml-1">{tier.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div
                          className={cn(
                            'mt-0.5 p-1 rounded-full',
                            tier.highlighted ? 'bg-teal-500/20' : 'bg-slate-700/50'
                          )}
                        >
                          <Check
                            className={cn(
                              'w-3 h-3',
                              tier.highlighted ? 'text-teal-400' : 'text-gray-400'
                            )}
                          />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant={tier.highlighted ? 'default' : 'outline'}
                    className="w-full gap-2"
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          variants={staggerItem}
          className="mt-12 max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-start gap-3 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <Info className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300 text-left">
              <span className="font-semibold text-orange-400">Note:</span> Pricing
              is subject to refinement during our pilot and incubation phase. Early
              adopters may receive special pricing and benefits.
            </p>
          </div>
        </motion.div>

        {/* FAQ or additional info */}
        <motion.div variants={staggerItem} className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            Need a custom solution or have questions?
          </p>
          <Button variant="secondary" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Contact our team
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
