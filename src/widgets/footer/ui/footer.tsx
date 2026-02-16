'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { siteConfig } from '@/shared/config/site';
import { fadeInUp, staggerContainer, viewportConfig } from '@/shared/lib/animations';

const socialLinks = [
  { name: 'Twitter', href: siteConfig.links.twitter, icon: Twitter },
  { name: 'Instagram', href: siteConfig.links.instagram, icon: Instagram },
  { name: 'LinkedIn', href: siteConfig.links.linkedin, icon: Linkedin },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950/20 to-transparent pointer-events-none" />

      {/* Africa map watermark - bottom right corner */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[420px] pointer-events-none">
        <Image
          src="/africa-map.png"
          alt=""
          fill
          className="object-contain opacity-[0.025]"
          style={{
            filter: 'brightness(1.5) sepia(1) hue-rotate(130deg) saturate(2)',
            maskImage: 'linear-gradient(to top left, black 5%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to top left, black 5%, transparent 60%)',
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Newsletter Section */}
        <motion.div
          variants={fadeInUp}
          className="py-12 md:py-16 border-b border-slate-800/50"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay in the loop
              </h3>
              <p className="text-gray-400">
                Get updates on product launches, early access, and piracy protection insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="shrink-0 gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <motion.div variants={fadeInUp} className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo.png"
                  alt="FairPlay Africa"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <span className="text-lg font-bold text-white">FairPlay</span>
                  <span className="text-lg font-bold text-teal-400 ml-1">Africa</span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                Protecting African creativity from piracy. Built by Africans, for Africa.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800/50 text-gray-400 hover:bg-teal-500/20 hover:text-teal-400 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                {siteConfig.footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {siteConfig.footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                {siteConfig.footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          className="py-6 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-gray-500">
            &copy; {currentYear} FairPlay Africa. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Built by Team Alpha</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
