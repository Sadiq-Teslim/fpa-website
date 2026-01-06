'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, X, Shield, Radar, Bell, FileCheck } from 'lucide-react';
import { Section, SectionHeader } from '@/shared/ui/section';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { fadeInUp, scaleIn } from '@/shared/lib/animations';

const demoSteps = [
  {
    icon: Shield,
    title: 'Upload Your Content',
    description: 'Securely upload your film or video content to our platform',
  },
  {
    icon: Radar,
    title: 'Automatic Fingerprinting',
    description: 'Our AI creates a unique digital fingerprint of your content',
  },
  {
    icon: Bell,
    title: '24/7 Monitoring',
    description: 'We scan thousands of sites continuously for unauthorized copies',
  },
  {
    icon: FileCheck,
    title: 'Get Alerts & Reports',
    description: 'Receive instant notifications and detailed infringement reports',
  },
];

export function DemoSection() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <Section id="demo" className="bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <SectionHeader
          subtitle="Product Demo"
          title="See How FairPlay Africa Works"
          description="Watch our platform in action and discover how we protect your creative work from piracy."
        />

        {/* Video Container */}
        <motion.div variants={scaleIn} className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-slate-800/50 border border-slate-700/50 shadow-2xl shadow-black/50">
            {/* Aspect ratio container */}
            <div className="relative aspect-video">
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div
                    key="thumbnail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    {/* Thumbnail / Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                      {/* Decorative elements */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />
                      </div>

                      {/* Grid pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50" />

                      {/* FairPlay Logo/Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          className="text-center"
                        >
                          <h3 className="text-4xl md:text-6xl font-bold text-white/20">
                            FairPlay<span className="text-teal-500/30">Africa</span>
                          </h3>
                          <p className="text-gray-500 mt-2">Platform Demo</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Play Button */}
                    <motion.button
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative">
                        {/* Pulse rings */}
                        <div className="absolute inset-0 -m-4">
                          <motion.div
                            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-full h-full rounded-full bg-teal-500/30"
                          />
                        </div>
                        <div className="absolute inset-0 -m-8">
                          <motion.div
                            animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="w-full h-full rounded-full bg-teal-500/20"
                          />
                        </div>

                        {/* Play button */}
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:shadow-xl group-hover:shadow-teal-500/40 transition-shadow">
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </motion.button>

                    {/* Duration badge */}
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm">
                        Interactive Demo
                      </Badge>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="demo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"
                  >
                    {/* Close button */}
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStep(0);
                      }}
                      className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Demo content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      {/* Progress bar */}
                      <div className="absolute top-8 left-8 right-8">
                        <div className="flex gap-2">
                          {demoSteps.map((_, index) => (
                            <div
                              key={index}
                              className="flex-1 h-1 rounded-full bg-slate-700 overflow-hidden"
                            >
                              <motion.div
                                className="h-full bg-teal-500"
                                initial={{ width: '0%' }}
                                animate={{
                                  width: index < currentStep ? '100%' : index === currentStep ? '100%' : '0%',
                                }}
                                transition={{
                                  duration: index === currentStep ? 3 : 0.3,
                                  ease: 'linear',
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Current step */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="text-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 15 }}
                            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30"
                          >
                            {React.createElement(demoSteps[currentStep].icon, {
                              className: 'w-10 h-10 md:w-12 md:h-12 text-white',
                            })}
                          </motion.div>

                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Step {currentStep + 1}: {demoSteps[currentStep].title}
                          </h3>
                          <p className="text-lg text-gray-400 max-w-md mx-auto">
                            {demoSteps[currentStep].description}
                          </p>
                        </motion.div>
                      </AnimatePresence>

                      {/* Step indicators */}
                      <div className="absolute bottom-8 flex gap-3">
                        {demoSteps.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentStep(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === currentStep
                                ? 'bg-teal-500 w-8'
                                : 'bg-slate-600 hover:bg-slate-500'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Decorative background elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        className="absolute -top-1/2 -right-1/2 w-full h-full border border-teal-500/10 rounded-full"
                      />
                      <motion.div
                        animate={{
                          rotate: -360,
                        }}
                        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                        className="absolute -bottom-1/2 -left-1/2 w-full h-full border border-teal-500/5 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* CTA below video */}
        <motion.div variants={fadeInUp} className="mt-12 text-center">
          <p className="text-gray-400 mb-6">
            Ready to protect your creative work?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2">
              Create an Account
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Badge variant="accent" className="text-sm py-2 px-4">
              MVP launching soon
            </Badge>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
