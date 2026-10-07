'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Plane, 
  Package, 
  Building2, 
  Car, 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const CoreServices: React.FC = () => {
  const { lang, t } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const services = [
    {
      id: 'flights',
      title: t.coreServices.service1.title,
      desc: t.coreServices.service1.desc,
      action: t.coreServices.service1.action,
      href: '/flights',
      icon: Plane,
      color: 'from-blue-600 to-sky-500',
      badge: lang === 'ar' ? 'مباشر وتأكيد فوري' : 'Direct Booking'
    },
    {
      id: 'cargo',
      title: t.coreServices.service2.title,
      desc: t.coreServices.service2.desc,
      action: t.coreServices.service2.action,
      href: '/cargo',
      icon: Package,
      color: 'from-amber-600 to-amber-500',
      badge: lang === 'ar' ? 'توفير حتى 60%' : 'Save up to 60%'
    },
    {
      id: 'hotels',
      title: t.coreServices.service3.title,
      desc: t.coreServices.service3.desc,
      action: t.coreServices.service3.action,
      href: '/hotels',
      icon: Building2,
      color: 'from-teal-600 to-emerald-500',
      badge: lang === 'ar' ? 'فنادق مختارة' : 'Verified Properties'
    },
    {
      id: 'transfers',
      title: t.coreServices.service4.title,
      desc: t.coreServices.service4.desc,
      action: t.coreServices.service4.action,
      href: '/transfers',
      icon: Car,
      color: 'from-indigo-600 to-blue-600',
      badge: lang === 'ar' ? 'سائق خاص معتمد' : 'Chauffeur Service'
    },
    {
      id: 'visa',
      title: t.coreServices.service5.title,
      desc: t.coreServices.service5.desc,
      action: t.coreServices.service5.action,
      href: '/visa',
      icon: FileText,
      color: 'from-cyan-600 to-teal-500',
      badge: lang === 'ar' ? 'دعم المستندات' : 'Paperwork Support'
    },
    {
      id: 'insurance',
      title: t.coreServices.service6.title,
      desc: t.coreServices.service6.desc,
      action: t.coreServices.service6.action,
      href: '/insurance',
      icon: ShieldCheck,
      color: 'from-emerald-600 to-teal-600',
      badge: lang === 'ar' ? 'تغطية شنغن ودولية' : 'Schengen Approved'
    }
  ];

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
            <span>{lang === 'ar' ? 'خدمات السفر المتكاملة' : 'Aviation & Travel Suite'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            {t.coreServices.title}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {t.coreServices.subtitle}
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-brand-sky/40 shadow-sm hover:shadow-soft-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-sky transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-6 mt-6 border-t border-slate-200/60">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy group-hover:text-brand-sky transition-colors"
                  >
                    <span>{item.action}</span>
                    <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
