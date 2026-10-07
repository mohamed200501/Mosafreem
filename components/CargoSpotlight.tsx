'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Package, ShieldCheck, CheckCircle2, ArrowLeft, ArrowRight, Calculator, Sparkles, Scale, Info } from 'lucide-react';

export const CargoSpotlight: React.FC = () => {
  const { lang, t } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const [weight, setWeight] = useState(40);
  const [cargoType, setCargoType] = useState('excess_baggage');

  // Estimate price in SAR
  const rate = cargoType === 'excess_baggage' ? 14 : cargoType === 'personal_parcels' ? 16 : 18;
  const estimatedTotal = weight * rate;
  const airportCostEstimate = weight * 45; // Airline counter penalty approx 45 SAR/kg
  const savedAmount = Math.max(0, airportCostEstimate - estimatedTotal);

  return (
    <section className="py-24 bg-gradient-to-br from-brand-navy-dark via-brand-navy to-brand-navy-subtle text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Copy & Benefits) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold-light text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.cargoSpotlight.subheadline}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.2]">
              {t.cargoSpotlight.headline}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {t.cargoSpotlight.desc}
            </p>

            {/* Bullets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-200 font-medium">
                  {t.cargoSpotlight.bullet1}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-gold-light shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-200 font-medium">
                  {t.cargoSpotlight.bullet2}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-sky-light shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-200 font-medium">
                  {t.cargoSpotlight.bullet3}
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
              <span>{t.cargoSpotlight.disclaimer}</span>
            </div>

            <div className="pt-2">
              <Link
                href="/cargo"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-white font-bold text-base btn-gold-glow shadow-lg"
              >
                <Package className="w-5 h-5" />
                <span>{t.cargoSpotlight.cta}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Quick Cargo Cost Estimator */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-brand-navy">
                      {lang === 'ar' ? 'حاسبة تقدير الشحن الجوي' : 'Air Cargo Cost Estimator'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {lang === 'ar' ? 'مصر ⇄ دول الخليج العربي' : 'Egypt ⇄ GCC Corridors'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {lang === 'ar' ? 'أوفر بكثير' : 'Cost Saver'}
                </span>
              </div>

              {/* Weight Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700">
                    {lang === 'ar' ? 'الوزن التقريبي للشحنة:' : 'Estimated Weight:'}
                  </span>
                  <span className="text-xl font-black text-brand-navy">
                    {weight} <span className="text-xs font-bold text-slate-500">KG</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>10 كجم</span>
                  <span>75 كجم</span>
                  <span>150 كجم</span>
                </div>
              </div>

              {/* Type Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 block">
                  {lang === 'ar' ? 'طبيعة الأغراض:' : 'Shipment Type:'}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setCargoType('excess_baggage')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition ${
                      cargoType === 'excess_baggage'
                        ? 'border-brand-gold bg-amber-50/70 text-brand-gold-dark'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {lang === 'ar' ? 'أمتعة وحقائب' : 'Luggage & Bags'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCargoType('personal_parcels')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition ${
                      cargoType === 'personal_parcels'
                        ? 'border-brand-gold bg-amber-50/70 text-brand-gold-dark'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {lang === 'ar' ? 'طرود وهدايا' : 'Parcels & Gifts'}
                  </button>
                </div>
              </div>

              {/* Estimate Calculation Result */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>{lang === 'ar' ? 'سعر المطار التقريبي (الوزن الزائد):' : 'Airport Excess Counter Price:'}</span>
                  <span className="line-through text-rose-500 font-semibold">{airportCostEstimate} SAR</span>
                </div>

                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">
                      {lang === 'ar' ? 'تقدير مسافرين للشحن الجوي:' : 'Masaferin Cargo Estimate:'}
                    </span>
                    <span className="text-2xl font-black text-brand-navy">
                      ~ {estimatedTotal} <span className="text-xs font-bold">SAR</span>
                    </span>
                  </div>

                  <div className="text-end">
                    <span className="text-[10px] uppercase font-bold text-emerald-600 block">
                      {lang === 'ar' ? 'توفيرك المتوقع' : 'Estimated Savings'}
                    </span>
                    <span className="text-base font-extrabold text-emerald-600">
                      +{savedAmount} SAR
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA link to dedicated cargo page */}
              <Link
                href={`/cargo?weight=${weight}&type=${cargoType}`}
                className="w-full py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-sm text-center block transition-all shadow-md"
              >
                {lang === 'ar' ? 'تأكيد وحجز موعد استلام الشحنة' : 'Book Cargo Pickup Schedule'}
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
