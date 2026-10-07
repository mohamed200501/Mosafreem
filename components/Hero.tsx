'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Plane, ShieldCheck, CheckCircle2, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { lang, t } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative bg-brand-navy-dark text-white pt-24 pb-36 md:pt-32 md:pb-44 overflow-hidden">
      {/* Background Photography with Navy & Turquoise Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transform motion-safe:transition-transform duration-1000"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2000&q=80')"
        }}
      />
      
      {/* Deep Navy Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-dark/95 via-brand-navy/90 to-brand-navy-dark pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-sky/20 via-transparent to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-start">
        <div className="max-w-3xl space-y-6">
          
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-sky/15 border border-brand-sky/30 text-brand-sky-light text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
            <span>{lang === 'ar' ? 'بوابتك الذكية للسفر والشحن الجوي' : 'Your Smart Aviation & Travel Portal'}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            {t.hero.headline}
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            {t.hero.supporting}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              href="/flights"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-sky hover:bg-brand-sky-dark text-white font-bold text-base btn-glow flex items-center justify-center gap-3 shadow-lg"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowIcon className="w-5 h-5" />
            </Link>

            <a
              href="#services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{t.hero.secondaryCta}</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.hero.trustItem1}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-gold-light shrink-0" />
              <span>{t.hero.trustItem2}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-sky-light shrink-0" />
              <span>{t.hero.trustItem3}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
