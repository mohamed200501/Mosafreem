'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  AlertCircle, 
  HeartHandshake, 
  BadgePercent, 
  Calendar,
  Users
} from 'lucide-react';
import { TravelInsuranceRequest } from '@/lib/types';
import { INITIAL_INSURANCE_REQUESTS, getStoredData, saveStoredData } from '@/lib/store';

export default function InsurancePage() {
  const { lang, t } = useLanguage();

  const [destination, setDestination] = useState('منطقة شنغن وأوروبا (Schengen)');
  const [startDate, setStartDate] = useState('2026-11-20');
  const [endDate, setEndDate] = useState('2026-12-05');
  const [travelersCount, setTravelersCount] = useState(2);
  const [policyTier, setPolicyTier] = useState<'silver' | 'gold' | 'platinum'>('gold');

  const [applicantName, setApplicantName] = useState('زياد طارق كامل');
  const [phone, setPhone] = useState('+20 106 555 4321');
  const [email, setEmail] = useState('ziad.kamel@example.com');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const tiers = [
    {
      id: 'silver',
      nameAr: 'الباقة الفضية (Silver)',
      nameEn: 'Silver Essential',
      price: 25,
      medicalCover: '$30,000 USD',
      baggageCover: '$500 USD',
      delayCover: '$150 USD',
      schengenCompliant: false,
      cancellationCover: false
    },
    {
      id: 'gold',
      nameAr: 'الباقة الذهبية (Gold) - مطابقة لشنغن',
      nameEn: 'Gold (Schengen Approved)',
      price: 45,
      medicalCover: '€50,000 EUR (مطابقة لسفارات أوروبا)',
      baggageCover: '$1,200 USD',
      delayCover: '$300 USD',
      schengenCompliant: true,
      cancellationCover: true
    },
    {
      id: 'platinum',
      nameAr: 'الباقة البلاتينية الشاملة (Platinum VIP)',
      nameEn: 'Platinum Comprehensive',
      price: 70,
      medicalCover: '$100,000 USD (تغطية عالمية شاملة)',
      baggageCover: '$2,500 USD',
      delayCover: '$600 USD',
      schengenCompliant: true,
      cancellationCover: true
    }
  ];

  const currentTier = tiers.find(t => t.id === policyTier) || tiers[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `MSF-INS-${randomNum}`;

    const newInsurance: TravelInsuranceRequest = {
      id: `ins_${Date.now()}`,
      referenceNumber: ref,
      destination,
      startDate,
      endDate,
      travelersCount,
      policyTier,
      applicantName,
      phone,
      email,
      status: 'submitted',
      quotedAmount: currentTier.price * travelersCount,
      currency: 'USD',
      adminNotes: 'طلب وثيقة تأمين سفر مطابقة للاشتراطات القنصلية، صادرة عبر شريك تأمين معتمد.',
      createdAt: new Date().toISOString()
    };

    const existing = getStoredData<TravelInsuranceRequest[]>('insurance_requests', INITIAL_INSURANCE_REQUESTS);
    saveStoredData('insurance_requests', [newInsurance, ...existing]);

    setSubmittedRef(ref);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تأمين السفر الدولي المعتمد' : 'Licensed International Travel Protection'}</span>
          </span>
          <h1 className="text-3xl font-black text-brand-navy">
            {lang === 'ar' ? 'سافر براحة بال وتغطية طبية عالمية كاملة' : 'Travel with Complete Peace of Mind'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            {lang === 'ar'
              ? 'وثائق تأمين سفر معتمدة من شركات تأمين مرخصة تغطي الطوارئ الطبية، فقدان الأمتعة، وتأخير الرحلات، ومطابقة لشروط تأشيرات الشنغن وأوروبا.'
              : 'Certified travel protection policies covering medical emergencies, luggage delay, and Schengen visa requirements.'}
          </p>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-brand-sky shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {lang === 'ar'
              ? 'تنويه إفصاح: منصة مسافرين وسيط تقني يقوم بتسهيل طلبات وثائق التأمين، وتصدر البوالص وتتحمل التزامات التعويض حصرياً شركات تأمين كبرى مرخصة ومعتمدة من هيئات الرقابة المالية المعنية.'
              : 'Regulatory Disclosure: Masaferin is a technology facilitator. Policies are underwritten exclusively by licensed insurance providers compliant with regulatory authorities.'}
          </p>
        </div>

        {submittedRef ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm text-center max-w-lg mx-auto space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-black text-brand-navy">
              {lang === 'ar' ? 'تم تقديم طلب وثيقة التأمين بنجاح!' : 'Insurance Request Received!'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? `رقم المتابعة: ${submittedRef}. سيتم مراجعة وثيقة التأمين وتجهيز النسخة القابلة للطباعة فوراً في لوحة تحكم حسابك.`
                : `Reference code: ${submittedRef}. Policy review underway.`}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full py-3.5 rounded-xl bg-brand-navy text-white text-xs font-bold"
              >
                {lang === 'ar' ? 'عرض في لوحة تحكمي' : 'View in Dashboard'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            
            {/* Tiers Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => setPolicyTier(tier.id as any)}
                  className={`p-7 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between space-y-6 ${
                    policyTier === tier.id
                      ? 'border-emerald-500 bg-white shadow-soft-xl ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-slate-500">
                        {lang === 'ar' ? tier.nameAr : tier.nameEn}
                      </span>
                      {tier.schengenCompliant && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {lang === 'ar' ? 'معتمد لشنغن' : 'Schengen OK'}
                        </span>
                      )}
                    </div>

                    <div className="text-3xl font-black text-brand-navy">
                      ${tier.price} <span className="text-xs font-bold text-slate-400">/ {lang === 'ar' ? 'مسافر' : 'person'}</span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span>{lang === 'ar' ? 'تغطية الطوارئ الطبية:' : 'Medical Cover:'}</span>
                        <span className="font-bold text-slate-900">{tier.medicalCover}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span>{lang === 'ar' ? 'تعويض فقدان الأمتعة:' : 'Luggage Loss:'}</span>
                        <span className="font-bold text-slate-900">{tier.baggageCover}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span>{lang === 'ar' ? 'تأخير الرحلة:' : 'Flight Delay:'}</span>
                        <span className="font-bold text-slate-900">{tier.delayCover}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>{lang === 'ar' ? 'إلغاء الرحلة لظرف طارئ:' : 'Trip Cancellation:'}</span>
                        <span className="font-bold text-slate-900">{tier.cancellationCover ? 'مشمول' : 'غير مشمول'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${
                      policyTier === tier.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {policyTier === tier.id ? (lang === 'ar' ? 'الباقة المختارة' : 'Selected Tier') : (lang === 'ar' ? 'اختيار هذه الباقة' : 'Select Tier')}
                  </button>
                </div>
              ))}
            </div>

            {/* Application Request Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-brand-navy border-b border-slate-100 pb-3">
                {lang === 'ar' ? 'طلب إصدار وثيقة تأمين السفر' : 'Insurance Policy Request Form'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'وجهة السفر:' : 'Destination:'}</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'تاريخ بداية التأمين:' : 'Start Date:'}</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'تاريخ نهاية التأمين:' : 'End Date:'}</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'عدد المسافرين:' : 'Travelers Count:'}</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(Number(e.target.value))}
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'اسم المسافر الرئيسي:' : 'Primary Traveler Name:'}</label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'رقم الهاتف:' : 'Phone:'}</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'البريد الإلكتروني لإرسال الوثيقة:' : 'Email Address:'}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs">
                  <span className="text-slate-500">{lang === 'ar' ? 'المجموع المقدر للوثيقة:' : 'Estimated Premium:'} </span>
                  <span className="font-black text-brand-navy text-base">${currentTier.price * travelersCount} USD</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm btn-glow transition shadow-md"
                >
                  {lang === 'ar' ? 'طلب إصدار بوليصة التأمين' : 'Submit Insurance Request'}
                </button>
              </div>
            </form>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
