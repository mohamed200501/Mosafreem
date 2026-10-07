'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-brand-sky" />
            <span>{lang === 'ar' ? 'إجابات واضحة' : 'Clear Answers'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            {t.faq.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-start p-6 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="font-bold text-base text-brand-navy">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-brand-sky' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-6 bg-white border-t border-slate-100 text-sm text-slate-600 leading-relaxed animate-fadeIn">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
