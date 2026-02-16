'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Film,
  Clapperboard,
  Building2,
  Video,
  Scale,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { Section, SectionHeader } from '@/shared/ui/section';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import { fadeInUp } from '@/shared/lib/animations';

interface Audience {
  id: string;
  icon: React.ElementType;
  title: string;
  painPoint: string;
  solution: string;
  relevance: string;
  gradient: string;
  accentColor: string;
}

const audiences: Audience[] = [
  {
    id: 'independent',
    icon: Film,
    title: 'Independent Filmmakers',
    painPoint:
      'You pour your savings into a film, only to find it on pirate sites before your premiere even happens.',
    solution:
      'FairPlay detects unauthorized copies within hours and helps you take them down, protecting your box office and streaming revenue.',
    relevance:
      'As an indie filmmaker, every view counts. We make sure your hard work pays off.',
    gradient: 'from-teal-500 to-emerald-500',
    accentColor: 'teal',
  },
  {
    id: 'nollywood',
    icon: Clapperboard,
    title: 'Nollywood Producers',
    painPoint:
      'Your Nollywood productions leak on Telegram and WhatsApp groups almost instantly, killing theater revenue.',
    solution:
      'Our monitoring extends to social platforms and messaging groups where Nollywood content is commonly pirated.',
    relevance:
      'Built by Africans who understand the unique distribution challenges of Nollywood.',
    gradient: 'from-orange-500 to-amber-500',
    accentColor: 'orange',
  },
  {
    id: 'studios',
    icon: Building2,
    title: 'Film Studios',
    painPoint:
      'Managing content protection for multiple titles across various platforms is complex and expensive.',
    solution:
      'Centralized dashboard for all your titles with bulk monitoring, reporting, and takedown management.',
    relevance:
      'Enterprise-grade protection at a price point designed for African studios.',
    gradient: 'from-purple-500 to-violet-500',
    accentColor: 'purple',
  },
  {
    id: 'creators',
    icon: Video,
    title: 'Digital Creators',
    painPoint:
      'Your YouTube content or online courses get stolen and re-uploaded, stealing your audience and revenue.',
    solution:
      'Monitor platforms where your content might be re-uploaded without permission and protect your digital assets.',
    relevance:
      'Whether you make content for YouTube, TikTok, or online courses, your work deserves protection.',
    gradient: 'from-cyan-500 to-blue-500',
    accentColor: 'cyan',
  },
  {
    id: 'distributors',
    icon: Scale,
    title: 'Rights Owners & Distributors',
    painPoint:
      'Tracking where licensed content ends up and ensuring compliance is a full-time job.',
    solution:
      'Comprehensive tracking of where your licensed content appears, with compliance monitoring and reporting.',
    relevance:
      'Protect the value of your catalog and ensure licensees meet their obligations.',
    gradient: 'from-rose-500 to-pink-500',
    accentColor: 'rose',
  },
];

export function AudienceSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Section id="audience" className="bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />

        {/* Large centered africa map watermark */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[700px]">
          <Image
            src="/africa-map.png"
            alt=""
            fill
            className="object-contain opacity-[0.03]"
            style={{
              filter: 'brightness(1.5) sepia(1) hue-rotate(130deg) saturate(2)',
              maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 65%)',
              WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 65%)',
            }}
          />
        </div>
      </div>

      <div className="relative z-10">
        <SectionHeader
          title="Built for African Creators"
          description="No matter where you are in your creative journey, FairPlay Africa has your back."
        />

        {/* Carousel */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {audiences.map((audience, index) => {
                const isActive = selectedIndex === index;
                return (
                  <div
                    key={audience.id}
                    className="flex-none w-full md:w-[80%] lg:w-[60%] px-4"
                  >
                    <motion.div
                      initial={{ opacity: 0.5, scale: 0.95 }}
                      animate={{
                        opacity: isActive ? 1 : 0.4,
                        scale: isActive ? 1 : 0.93,
                      }}
                      transition={{ duration: 0.4 }}
                      className="relative overflow-hidden rounded-3xl h-full"
                    >
                      {/* Gradient top accent bar */}
                      <div
                        className={cn(
                          'absolute top-0 left-0 right-0 h-1',
                          'bg-gradient-to-r',
                          audience.gradient,
                          isActive ? 'opacity-100' : 'opacity-0',
                          'transition-opacity duration-500'
                        )}
                      />

                      {/* Card body */}
                      <div
                        className={cn(
                          'relative p-8 md:p-10 h-full',
                          'bg-gradient-to-br from-slate-800/80 to-slate-900/80',
                          'backdrop-blur-sm border border-slate-700/30',
                          isActive && 'border-slate-600/50'
                        )}
                      >
                        {/* Africa map watermark — small, tucked in corner */}
                        <div className="absolute -bottom-2 -right-2 w-28 h-32 opacity-[0.05] pointer-events-none">
                          <Image
                            src="/africa-map.png"
                            alt=""
                            fill
                            className="object-contain"
                            style={{
                              filter: 'brightness(3) grayscale(1)',
                            }}
                          />
                        </div>

                        <div className="relative z-10">
                          {/* Header: icon + title */}
                          <div className="flex items-start gap-5 mb-8">
                            <div
                              className={cn(
                                'shrink-0 p-4 rounded-2xl',
                                'bg-gradient-to-br',
                                audience.gradient,
                                'shadow-lg'
                              )}
                            >
                              <audience.icon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-white">
                                {audience.title}
                              </h3>
                            </div>
                          </div>

                          {/* Two-column content on larger screens */}
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Pain point */}
                            <div className="rounded-2xl bg-red-500/5 border border-red-500/10 p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <ShieldAlert className="w-4 h-4 text-red-400" />
                                <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider">
                                  The Challenge
                                </h4>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {audience.painPoint}
                              </p>
                            </div>

                            {/* Solution */}
                            <div className="rounded-2xl bg-teal-500/5 border border-teal-500/10 p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-teal-400" />
                                <h4 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
                                  How FairPlay Helps
                                </h4>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {audience.solution}
                              </p>
                            </div>
                          </div>

                          {/* Relevance quote */}
                          <div className="mt-6 flex items-start gap-3 pt-5 border-t border-slate-700/40">
                            <div
                              className={cn(
                                'shrink-0 w-1 h-full min-h-[2rem] rounded-full bg-gradient-to-b',
                                audience.gradient
                              )}
                            />
                            <p className="text-gray-400 italic text-sm leading-relaxed">
                              &ldquo;{audience.relevance}&rdquo;
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {audiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    selectedIndex === index
                      ? 'w-8 bg-teal-500'
                      : 'bg-slate-600 hover:bg-slate-500'
                  )}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
