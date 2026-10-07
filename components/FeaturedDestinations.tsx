'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Plane, ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

interface DestinationItem {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  image: string;
  tagAr: string;
  tagEn: string;
  descAr: string;
  descEn: string;
}

export const FeaturedDestinations: React.FC = () => {
  const { lang, t } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const routes: DestinationItem[] = [
    {
      id: 'cai-ruh',
      from: 'القاهرة (CAI)',
      fromCode: 'CAI',
      to: 'الرياض (RUH)',
      toCode: 'RUH',
      image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80',
      tagAr: 'رحلات يومية متكررة',
      tagEn: 'Daily Connections',
      descAr: 'خيارات مريحة للعمل والزيارات العائلية في المملكة العربية السعودية.',
      descEn: 'Comfortable daily connections for business and visiting relatives in Saudi Arabia.'
    },
    {
      id: 'cai-jed',
      from: 'القاهرة (CAI)',
      fromCode: 'CAI',
      to: 'جدة (JED)',
      toCode: 'JED',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
      tagAr: 'بوابة العمرة ومكة',
      tagEn: 'Gateway to Umrah',
      descAr: 'رحلات مباشرة ميسرة طوال العام للمعتمرين والمغتربين.',
      descEn: 'Direct, seamless flights all year round for pilgrims and residents.'
    },
    {
      id: 'cai-dxb',
      from: 'القاهرة (CAI)',
      fromCode: 'CAI',
      to: 'دبي (DXB)',
      toCode: 'DXB',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      tagAr: 'أعمال وسياحة',
      tagEn: 'Business & Leisure',
      descAr: 'أفضل مسارات السفر بين مطاري القاهرة ودبي الدولي.',
      descEn: 'Frequent flights linking Cairo International Airport with Dubai International.'
    },
    {
      id: 'cai-doh',
      from: 'القاهرة (CAI)',
      fromCode: 'CAI',
      to: 'الدوحة (DOH)',
      toCode: 'DOH',
      image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
      tagAr: 'سفر وترانزيت عالمي',
      tagEn: 'Global Transit Hub',
      descAr: 'تواصل سريع مع شبكة خطوط الطيران العالمية عبر الدوحة.',
      descEn: 'Rapid connections with international global airline networks via Hamad International.'
    },
    {
      id: 'cai-lon',
      from: 'القاهرة (CAI)',
      fromCode: 'CAI',
      to: 'لندن (LHR)',
      toCode: 'LHR',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
      tagAr: 'أوروبا والمملكة المتحدة',
      tagEn: 'Europe & UK',
      descAr: 'رحلات مباشرة للمغتربين والطلاب والسياح إلى العاصمة البريطانية.',
      descEn: 'Direct flights for expatriates, students, and tourists traveling to the UK.'
    },
    {
      id: 'cai-ist',
      from: 'القاهرة (CAI)',
      fromCode: 'CAI',
      to: 'إسطنبول (IST)',
      toCode: 'IST',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      tagAr: 'تسوق وسياحة',
      tagEn: 'Culture & Shopping',
      descAr: 'رحلات قصيرة وممتعة تجمع بين سحر الشرق والغرب.',
      descEn: 'Convenient short-haul flights connecting Egypt with Turkey.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-sky bg-brand-sky-muted px-3 py-1 rounded-full">
              <MapPin className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'المسارات الأكثر طلباً' : 'Top Travel Corridors'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
              {t.destinations.title}
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              {t.destinations.subtitle}
            </p>
          </div>

          <Link
            href="/flights"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-brand-sky hover:text-brand-sky-dark group"
          >
            <span>{lang === 'ar' ? 'جميع الرحلات المتاحة' : 'View all flights'}</span>
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route) => (
            <div
              key={route.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-sky/40 shadow-sm hover:shadow-soft-xl transition-all duration-300 flex flex-col"
            >
              {/* Image & Badge */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 start-4 bg-brand-navy/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                  {lang === 'ar' ? route.tagAr : route.tagEn}
                </span>

                {/* Route Header on Image */}
                <div className="absolute bottom-4 start-4 end-4 text-white">
                  <div className="flex items-center gap-2 text-lg font-bold">
                    <span>{route.fromCode}</span>
                    <Plane className="w-4 h-4 text-brand-sky-light transform -rotate-45" />
                    <span>{route.toCode}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {lang === 'ar' ? `من ${route.from} إلى ${route.to}` : `From ${route.fromCode} to ${route.toCode}`}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'ar' ? route.descAr : route.descEn}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {lang === 'ar' ? 'أسعار وفيرة بحسب التوفر' : 'Live fares on search'}
                  </span>
                  
                  <Link
                    href={`/flights?origin=${route.fromCode}&destination=${route.toCode}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy group-hover:text-brand-sky transition-colors"
                  >
                    <span>{t.destinations.searchFlightsForRoute}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
