'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, DollarSign, Globe } from 'lucide-react';
import { Section, SectionHeader } from '@/shared/ui/section';
import { Card } from '@/shared/ui/card';
import { fadeInUp, staggerItem } from '@/shared/lib/animations';

const problems = [
  {
    icon: Clock,
    title: 'Films Leak Within Hours',
    description:
      'New releases appear on pirate sites within hours of premiere, decimating box office potential and streaming revenue.',
    stat: '< 24hrs',
    statLabel: 'Average leak time',
  },
  {
    icon: DollarSign,
    title: 'Creators Lose Revenue',
    description:
      'African filmmakers lose millions annually to piracy, with limited resources to fight back or track their stolen content.',
    stat: '$2B+',
    statLabel: 'Lost annually',
  },
  {
    icon: Globe,
    title: 'No Africa-Built Solutions',
    description:
      'Existing anti-piracy tools are expensive, complex, and not designed for African markets, infrastructure, or distribution patterns.',
    stat: '0',
    statLabel: 'Local alternatives',
  },
];

export function ProblemSection() {
  return (
    <Section id="problem" className="bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px]" />

        {/* Africa map silhouette - right side, red-tinted to match warning theme */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[500px] lg:w-[500px] lg:h-[600px]">
          <Image
            src="/africa-map.png"
            alt=""
            fill
            className="object-contain opacity-[0.04]"
            style={{
              filter: 'brightness(1.5) sepia(1) hue-rotate(0deg) saturate(3)',
              maskImage: 'linear-gradient(to left, black 10%, transparent 70%)',
              WebkitMaskImage: 'linear-gradient(to left, black 10%, transparent 70%)',
            }}
          />
        </div>
      </div>

      <div className="relative z-10">
        <SectionHeader
          title="Piracy is Africa's biggest silent distribution channel."
          description="While creators pour their hearts into their work, pirates distribute it for free. The current system is broken."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div key={problem.title} variants={staggerItem}>
              <Card
                variant="bento"
                className="h-full relative group overflow-hidden"
                glow
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 transition-all duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
                    <problem.icon className="w-6 h-6 text-red-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {problem.description}
                  </p>

                  {/* Stat */}
                  <div className="pt-6 border-t border-slate-700/50">
                    <p className="text-3xl font-bold text-red-400">{problem.stat}</p>
                    <p className="text-sm text-gray-500 mt-1">{problem.statLabel}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action text */}
        <motion.div variants={fadeInUp} className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <AlertTriangle className="w-6 h-6 text-orange-400 shrink-0" />
            <p className="text-lg md:text-xl text-gray-300">
              <span className="font-bold text-white">It&apos;s time for change.</span>{' '}
              African creators deserve better.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
