'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Quote, AlertCircle, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { lang, t } = useLanguage();

  const testimonials = [
    {
      name: t.testimonials.item1.name,
      role: t.testimonials.item1.role,
      comment: t.testimonials.item1.comment,
      initial: 'ع'
    },
    {
      name: t.testimonials.item2.name,
      role: t.testimonials.item2.role,
      comment: t.testimonials.item2.comment,
      initial: 'س'
    },
    {
      name: t.testimonials.item3.name,
      role: t.testimonials.item3.role,
      comment: t.testimonials.item3.comment,
      initial: 'م'
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Demo Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.testimonials.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            {t.testimonials.title}
          </h2>

          <p className="text-slate-600 text-sm">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-soft-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className="w-8 h-8 text-brand-sky/20" />
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm shadow">
                  {item.initial}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-navy">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
