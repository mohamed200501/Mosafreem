'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { Plane, Package, ShieldCheck, Users, HeartHandshake, Award } from 'lucide-react';

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 space-y-16 pb-20">
        
        {/* Hero */}
        <div className="bg-brand-navy-dark text-white py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <span className="text-xs font-bold text-brand-sky uppercase tracking-wider">
              {lang === 'ar' ? 'عن مسافرين' : 'About Masaferin'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black">
              {lang === 'ar' ? 'نبني جسور السفر والراحة بين مصر والعالم' : 'Bridging Journeys & Logistics Across the World'}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'انطلقت مسافرين من فهم عميق للتحديات اليومية التي يواجهها المسافر والمغترب العربي: من غلاء الوزن الزائد في المطارات إلى تشتت الحجوزات بين عشرات المنصات.'
                : 'Masaferin was born to resolve real challenges faced by expatriates and international travelers — eliminating high luggage penalties and uniting fragmented bookings into one platform.'}
            </p>
          </div>
        </div>

        {/* Pillars */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-sky-muted text-brand-sky flex items-center justify-center">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy">
                {lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'أن نكون البوابة الرقمية الأولى والأكثر ثقة لخدمات الطيران واللوجستيات الشخصية والشحن الجوي في منطقة الشرق الأوسط.'
                  : 'To become the premier trusted aviation and personal freight hub across the Middle East.'}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy">
                {lang === 'ar' ? 'رسالتنا' : 'Our Mission'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'تمكين المسافرين والمغتربين من تنظيم رحلاتهم ونقل أمتعتهم وهداياهم لأهاليهم بأعلى مستويات الشفافية والأمان وبأقل تكلفة ممكنة.'
                  : 'Empowering travelers to manage flights, luggage, and family parcels with maximum transparency and safety.'}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy">
                {lang === 'ar' ? 'النزاهة والشفافية' : 'Integrity & Transparency'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'لا نخفي أي رسوم أو شروط، ونوضح لعملائنا دائماً القواعد التنظيمية والتسعيرية لكل ناقل وشريك طيران.'
                  : 'Clear fare breakdowns, explicit cancellation guidelines, and upfront cargo terms with zero hidden fees.'}
              </p>
            </div>
          </div>
        {/* Administration & Technical Architecture */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Administration Identity */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6 text-brand-gold-light" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">{lang === 'ar' ? 'إدارة المنصة والعمليات' : 'Platform Operations & Administration'}</span>
                  <h3 className="text-xl font-black text-brand-navy">{lang === 'ar' ? 'عثمان المهدي' : 'Othman Al-Mahdi'}</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'يتولى إدارة العمليات التشغيلية وتنسيق شراكات الطيران والشحن الجوي لضمان أعلى معايير الجودة ورضا المسافرين عبر كافة مسارات الدول العربية.'
                  : 'Oversees platform operations, airline partner corridors, and logistics triage ensuring highest standards for travelers.'}
              </p>
            </div>

            {/* Website Design & Development Credit — المهندس محمد سمير */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-sky/10 text-brand-sky flex items-center justify-center font-black">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-sky uppercase">{lang === 'ar' ? 'تصميم وهندسة المنصة الرقمية' : 'Digital Platform Architecture & UI'}</span>
                  <h3 className="text-xl font-black text-brand-navy">{lang === 'ar' ? 'تصميم وتطوير المهندس محمد سمير' : 'Designed and Developed by Engineer Mohamed Samir'}</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'تم تصميم وتطوير المنصة الرقمية بالكامل بواسطة المهندس محمد سمير وفق أحدث تقنيات الويب العالمية، بواجهات عربية أصيلة وأنظمة تفاعلية متقدمة تلائم احتياجات قطاع الطيران والسياحة.'
                  : 'Engineered and designed by Engineer Mohamed Samir implementing cutting-edge Arabic-first UI/UX, robust component architecture, and aviation logistics systems.'}
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
