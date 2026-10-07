'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  FileCheck, 
  Globe2, 
  Clock, 
  UserCheck 
} from 'lucide-react';
import { VisaAssistanceRequest } from '@/lib/types';
import { INITIAL_VISA_REQUESTS, getStoredData, saveStoredData } from '@/lib/store';

export default function VisaPage() {
  const { lang, t } = useLanguage();

  const [destinationCountry, setDestinationCountry] = useState('المملكة العربية السعودية (تأشيرة سياحة وزيارة)');
  const [applicantNationality, setApplicantNationality] = useState('مصري (Egyptian)');
  const [visaCategory, setVisaCategory] = useState<'tourist' | 'business' | 'umrah' | 'work_visit'>('tourist');
  const [applicantName, setApplicantName] = useState('كريم محمود إسماعيل');
  const [phone, setPhone] = useState('+20 111 890 1234');
  const [email, setEmail] = useState('karim.ismail@example.com');
  const [notes, setNotes] = useState('أرغب في مراجعة الأوراق وحجز موعد البصمة.');

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Dynamic document checklists based on country/category
  const checklist = [
    { id: 1, title: lang === 'ar' ? 'جواز سفر ساري المفعول لمدة لا تقل عن 6 أشهر' : 'Passport valid for minimum 6 months' },
    { id: 2, title: lang === 'ar' ? 'صورتان شخصيتان بخلفية بيضاء حديثة (مقاس 4x6 أو 3.5x4.5)' : 'Recent passport-sized photos with white background' },
    { id: 3, title: lang === 'ar' ? 'كشف حساب بنكي لآخر 3 إلى 6 أشهر مختوم رسمياً' : 'Official stamped bank statement (last 3-6 months)' },
    { id: 4, title: lang === 'ar' ? 'خطاب تعريف بالراتب والمهنة (HR Letter) باللغة الإنجليزية أو مترجم' : 'Employment / HR verification letter in English' },
    { id: 5, title: lang === 'ar' ? 'حجز طيران مبدئي مؤكد وحجز فندق يغطي مدة الإقامة' : 'Flight reservation and confirmed hotel stay voucher' },
    { id: 6, title: lang === 'ar' ? 'وثيقة تأمين سفر دولي معتمدة تغطي الحالات الطارئة' : 'International medical travel insurance policy' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `MSF-VSA-${randomNum}`;

    const newVisa: VisaAssistanceRequest = {
      id: `vsa_${Date.now()}`,
      referenceNumber: ref,
      destinationCountry,
      applicantNationality,
      visaCategory,
      applicantName,
      phone,
      email,
      notes,
      status: 'submitted',
      adminNotes: 'تم استلام طلب المساعدة بالتأشيرة. جاري مطابقة قائمة الأوراق مع متطلبات السفارة.',
      createdAt: new Date().toISOString()
    };

    const existing = getStoredData<VisaAssistanceRequest[]>('visa_requests', INITIAL_VISA_REQUESTS);
    saveStoredData('visa_requests', [newVisa, ...existing]);

    setSubmittedRef(ref);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            <span>{lang === 'ar' ? 'خدمات الدعم الاستشاري للتأشيرات' : 'Visa Assistance & Consultation'}</span>
          </span>
          <h1 className="text-3xl font-black text-brand-navy">
            {lang === 'ar' ? 'تجهيز وتدقيق مستندات التأشيرات بكل دقة' : 'Expert Document Preparation & Visa Guidance'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            {lang === 'ar'
              ? 'نساعدك في تجهيز ملف التأشيرة، حجز مواعيد السفارات ومراكز التأشيرات، وترجمة المستندات وفق اشتراطات كل وجهة.'
              : 'We help assemble your visa dossier, book biometric appointments, and verify compliant paperwork.'}
          </p>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            {lang === 'ar'
              ? 'تنويه قانوني ورسمي: تقتصر خدمات مسافرين على المساعدة اللوجستية والاستشارية في تجهيز وتدقيق الأوراق وحجز المواعيد. الموافقة على التأشيرات أو رفضها أو تحديد مدتها هو اختصاص سيادي حصري للسفارات والجهات الحكومية الرسمية، ولا يمكن لأي جهة وساطة ضمان قبول التأشيرة.'
              : 'Legal Disclosure: Masaferin provides paperwork assembly and appointment logistics only. Visa approval or denial is the sovereign jurisdiction of the relevant embassy or consulate; no third party can guarantee issuance.'}
          </p>
        </div>

        {submittedRef ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm text-center max-w-lg mx-auto space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-black text-brand-navy">
              {lang === 'ar' ? 'تم تسجيل طلب مساعدة التأشيرة!' : 'Visa Request Logged!'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? `رقم المتابعة: ${submittedRef}. سيتواصل معك مستشار التأشيرات لمراجعة الملف وتحديد قائمة الأوراق المكتملة.`
                : `Reference: ${submittedRef}. A visa specialist will review your file and contact you.`}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full py-3.5 rounded-xl bg-brand-navy text-white text-xs font-bold"
              >
                {lang === 'ar' ? 'متابعة في لوحة التحكم' : 'View in Dashboard'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-brand-navy border-b border-slate-100 pb-3">
                {lang === 'ar' ? 'بيانات طلب استشارة التأشيرة' : 'Applicant & Travel Details'}
              </h3>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'وجهة السفر المطلوبة:' : 'Destination Country:'}</label>
                    <select
                      value={destinationCountry}
                      onChange={(e) => setDestinationCountry(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 font-bold bg-white"
                    >
                      <option value="المملكة العربية السعودية">المملكة العربية السعودية (سياحة / عمرة / زيارة)</option>
                      <option value="الإمارات العربية المتحدة">الإمارات العربية المتحدة (دبي وأبو ظبي)</option>
                      <option value="المملكة المتحدة (UK)">المملكة المتحدة (بريطانيا)</option>
                      <option value="دول الشنغن الأوروبية (Schengen)">منطقة الشنغن الأوروبية (فرنسا، ألمانيا، إيطاليا...)</option>
                      <option value="تركيا">تركيا (إلكترونية أو ورقية)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'جنسية المسافر:' : 'Applicant Nationality:'}</label>
                    <input
                      type="text"
                      value={applicantNationality}
                      onChange={(e) => setApplicantNationality(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'فئة التأشيرة:' : 'Visa Category:'}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'tourist', label: lang === 'ar' ? 'سياحة' : 'Tourist' },
                      { id: 'business', label: lang === 'ar' ? 'أعمال' : 'Business' },
                      { id: 'umrah', label: lang === 'ar' ? 'عمرة وزيارة' : 'Umrah' },
                      { id: 'work_visit', label: lang === 'ar' ? 'عمل وزيارة' : 'Work' }
                    ].map(cat => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setVisaCategory(cat.id as any)}
                        className={`p-2.5 rounded-xl border text-center font-bold transition ${
                          visaCategory === cat.id
                            ? 'bg-teal-50 border-teal-500 text-teal-800'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'اسم مقدم الطلب:' : 'Full Name:'}</label>
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
                    <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'ملاحظات أو استفسارات إضافية:' : 'Additional Inquiries:'}</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm btn-glow transition shadow-md"
              >
                {lang === 'ar' ? 'إرسال طلب المساعدة والتجهيز' : 'Submit Visa Assistance Request'}
              </button>
            </form>

            {/* Checklist Sidebar */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <FileCheck className="w-5 h-5 text-teal-600" />
                  <h3 className="font-bold text-sm text-brand-navy">
                    {lang === 'ar' ? 'قائمة المستندات الأساسية المطلوبة' : 'General Document Checklist'}
                  </h3>
                </div>

                <div className="space-y-3">
                  {checklist.map(item => (
                    <div key={item.id} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item.title}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-500 leading-relaxed border border-slate-200">
                  {lang === 'ar'
                    ? 'يقوم فريق مسافرين بمراجعة الترجمة المعتمدة وحجز مواعيد VFS Global أو TLScontact ومطابقة متطلبات كل قنصلية.'
                    : 'Our team verifies accredited translations, VFS/TLS appointment slots, and consulate criteria.'}
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
