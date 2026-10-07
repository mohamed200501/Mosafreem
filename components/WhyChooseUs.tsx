'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Layers, 
  Smartphone, 
  PackageCheck, 
  BadgePercent, 
  Headset, 
  ShieldCheck 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { lang, t } = useLanguage();

  const points = [
    {
      title: t.whyChooseUs.point1Title,
      desc: t.whyChooseUs.point1Desc,
      icon: Layers,
    },
    {
      title: t.whyChooseUs.point2Title,
      desc: t.whyChooseUs.point2Desc,
      icon: Smartphone,
    },
    {
      title: t.whyChooseUs.point3Title,
      desc: t.whyChooseUs.point3Desc,
      icon: PackageCheck,
    },
    {
      title: t.whyChooseUs.point4Title,
      desc: t.whyChooseUs.point4Desc,
      icon: BadgePercent,
    },
    {
      title: t.whyChooseUs.point5Title,
      desc: t.whyChooseUs.point5Desc,
      icon: Headset,
    },
    {
      title: lang === 'ar' ? 'أمان وسرية البيانات' : 'Data Privacy & Security',
      desc: lang === 'ar' ? 'معاملاتك وبيانات سفرك مشفرة بالكامل وتتم وفق أعلى معايير الخصوصية.' : 'Your personal data and travel requests are encrypted with top-tier security standards.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-sky bg-brand-sky-muted px-3 py-1 rounded-full">
            {lang === 'ar' ? 'قيمنا وثوابتنا' : 'Our Commitments'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            {t.whyChooseUs.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t.whyChooseUs.subtitle}
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-sky/40 hover:bg-white hover:shadow-soft-xl transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-navy text-white flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6 text-brand-sky-light" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
