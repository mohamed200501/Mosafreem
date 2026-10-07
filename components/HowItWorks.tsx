'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { MousePointerClick, ClipboardEdit, SearchCheck, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { lang, t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: MousePointerClick,
    },
    {
      num: '02',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: ClipboardEdit,
    },
    {
      num: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: SearchCheck,
    },
    {
      num: '04',
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-sky bg-brand-sky-muted px-3 py-1 rounded-full">
            {lang === 'ar' ? 'بسيطة وموثوقة' : 'Simple & Reliable'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            {t.howItWorks.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 4 Steps Timeline / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-soft-xl hover:border-brand-sky/40 transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-200 font-sans">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-brand-sky-muted/60 text-brand-sky flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-brand-navy mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-bold text-brand-sky">
                  <span>{lang === 'ar' ? 'الخطوة' : 'Step'} {idx + 1} / 4</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
