'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Package, 
  Scale, 
  Search, 
  CheckCircle2, 
  Clock, 
  Plane, 
  ShieldCheck, 
  AlertCircle,
  Truck,
  Box,
  MapPin,
  HelpCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { CargoRequest } from '@/lib/types';
import { INITIAL_CARGO_REQUESTS, getStoredData, saveStoredData } from '@/lib/store';
import { cargoEngine } from '@/lib/adapters/cargoProvider';

export default function CargoPage() {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  // Tracking State
  const [trackingCode, setTrackingCode] = useState('MSF-CRG-8921');
  const [trackedShipment, setTrackedShipment] = useState<CargoRequest | null>(null);
  const [trackingSearched, setTrackingSearched] = useState(false);

  // Volumetric Calculator State
  const [calcLength, setCalcLength] = useState(60);
  const [calcWidth, setCalcWidth] = useState(40);
  const [calcHeight, setCalcHeight] = useState(40);
  const [calcActualWeight, setCalcActualWeight] = useState(25);

  const volumetricWeight = cargoEngine.calculateVolumetricWeight(calcLength, calcWidth, calcHeight);
  const chargeableWeight = Math.max(calcActualWeight, volumetricWeight);

  // New Shipment Form State
  const [senderName, setSenderName] = useState('أحمد مصطفى الشامي');
  const [senderPhone, setSenderPhone] = useState('+20 100 234 5678');
  const [senderEmail, setSenderEmail] = useState('ahmed.elshamy@example.com');
  const [originCountry, setOriginCountry] = useState('مصر');
  const [originCity, setOriginCity] = useState('القاهرة');
  const [destCountry, setDestCountry] = useState('المملكة العربية السعودية');
  const [destCity, setDestCity] = useState('الرياض');
  const [shipmentType, setShipmentType] = useState<'excess_baggage' | 'personal_parcels' | 'commercial_cargo'>('excess_baggage');
  const [weightKg, setWeightKg] = useState(45);
  const [description, setDescription] = useState('حقيبتان سفر كبيرتان تحتويان على ملابس وأغراض شخصية');
  const [preferredDate, setPreferredDate] = useState('2026-11-12');
  const [receiverName, setReceiverName] = useState('ياسر الشامي');
  const [receiverPhone, setReceiverPhone] = useState('+966 55 987 6543');
  
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Handle Tracking Search
  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingSearched(true);
    const existing = getStoredData<CargoRequest[]>('cargo_requests', INITIAL_CARGO_REQUESTS);
    const found = existing.find(c => c.referenceNumber.toLowerCase() === trackingCode.trim().toLowerCase());
    setTrackedShipment(found || null);
  };

  // Handle New Cargo Form Submission
  const handleSubmitCargo = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `MSF-CRG-${randomNum}`;

    const estimate = cargoEngine.estimateShippingRate(originCity, destCity, weightKg, shipmentType);

    const newRequest: CargoRequest = {
      id: `crg_${Date.now()}`,
      referenceNumber: ref,
      senderName,
      senderPhone,
      senderEmail,
      originCountry,
      originCity,
      destCountry,
      destCity,
      shipmentType,
      weightKg,
      description,
      preferredDate,
      receiverName,
      receiverPhone,
      status: 'submitted',
      quotedPrice: estimate.estimatedPrice,
      currency: estimate.currency,
      partnerCarrier: estimate.recommendedCarrier,
      adminNotes: 'تم استلام طلب الشحن الجوي عبر البوابة. جاري التواصل مع مستودع المطار.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const existing = getStoredData<CargoRequest[]>('cargo_requests', INITIAL_CARGO_REQUESTS);
    saveStoredData('cargo_requests', [newRequest, ...existing]);

    setSubmittedRef(ref);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 space-y-16 pb-20">
        
        {/* Top Hero Banner */}
        <div className="bg-brand-navy-dark text-white py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold-light text-xs font-bold uppercase tracking-wider">
              <Package className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'خدمات الشحن الجوي المتميزة' : 'Aviation Cargo & Excess Baggage'}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              {lang === 'ar' ? 'شحن الأمتعة والطرود الشخصية بأمان واقتصاد' : 'Air Freight & Personal Excess Luggage'}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'الحل الأمثل للمغتربين والعائلات: اشحن حقائبك الزائدة وهداياك بأسعار الشحن الجوي المخفضة وبدون دفع غرامات الوزن الباهظة في كاونترات المطار.'
                : 'The smart solution for expatriates and families: ship heavy baggage and personal gifts at commercial air rates, avoiding airport counter penalties.'}
            </p>
          </div>
        </div>

        {/* Section 1: Live Airway Bill / Tracking Widget */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-brand-navy flex items-center gap-2">
                  <Search className="w-5 h-5 text-brand-sky" />
                  <span>{lang === 'ar' ? 'تتبع شحنتك الجوية المباشر' : 'Track Your Air Cargo Request'}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'ar' ? 'أدخل رقم الطلب المرجعي لمتابعة مراحل الشحن (جرب: MSF-CRG-8921 أو MSF-CRG-7744)' : 'Enter tracking reference (Demo: MSF-CRG-8921 or MSF-CRG-7744)'}
                </p>
              </div>

              <form onSubmit={handleTrack} className="flex gap-2 w-full md:w-auto">
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="MSF-CRG-8921"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold uppercase focus:outline-none focus:border-brand-sky w-full md:w-56"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold transition shrink-0"
                >
                  {lang === 'ar' ? 'تتبع الآن' : 'Track'}
                </button>
              </form>
            </div>

            {/* Tracking Result View */}
            {trackingSearched && (
              trackedShipment ? (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-slate-400 block">{lang === 'ar' ? 'رقم الشحنة:' : 'Reference:'}</span>
                      <span className="text-xl font-black text-brand-navy font-mono">{trackedShipment.referenceNumber}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 block">{lang === 'ar' ? 'المسار الجوي:' : 'Route:'}</span>
                      <span className="text-sm font-bold text-slate-800">{trackedShipment.originCity} ➔ {trackedShipment.destCity}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 block">{lang === 'ar' ? 'الوزن المسجل:' : 'Weight:'}</span>
                      <span className="text-sm font-bold text-slate-800">{trackedShipment.weightKg} كجم</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 block">{lang === 'ar' ? 'حالة الشحن:' : 'Status:'}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                        {trackedShipment.status === 'partner_quoted' ? (lang === 'ar' ? 'عرض السعر جاهز' : 'Quote Ready') : (lang === 'ar' ? 'قيد المناولة والشحن' : 'In Transit')}
                      </span>
                    </div>
                  </div>

                  {/* 4 Checkpoint Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{lang === 'ar' ? 'تم استلام الطلب' : 'Received'}</div>
                        <div className="text-[10px] text-slate-400">مكتب العمليات</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{lang === 'ar' ? 'التسعير والتغليف' : 'Quoted & Packed'}</div>
                        <div className="text-[10px] text-slate-400">مستودع المطار</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${trackedShipment.status === 'in_transit' ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
                        <Plane className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{lang === 'ar' ? 'الشحن على الطائرة' : 'Air Freight'}</div>
                        <div className="text-[10px] text-slate-400">{trackedShipment.partnerCarrier || 'مصر للطيران'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{lang === 'ar' ? 'التسليم للمستلم' : 'Delivery'}</div>
                        <div className="text-[10px] text-slate-400">{trackedShipment.destCity}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{lang === 'ar' ? 'لم يتم العثور على شحنة بهذا الرقم المرجعي. يرجى التأكد من الرقم والمحاولة مرة أخرى.' : 'No shipment found with this reference. Please check and try again.'}</span>
                </div>
              )
            )}
          </div>
        </section>

        {/* Section 2: Interactive Volumetric Weight Calculator */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-brand-navy rounded-3xl p-8 sm:p-12 text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-light bg-brand-gold/20 px-3 py-1 rounded-full">
                {lang === 'ar' ? 'دليل الشحن الذكي' : 'Smart Logistics Guide'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                {lang === 'ar' ? 'ما هو الوزن الحجمي وكيف يتم حسابه؟' : 'What is Volumetric Weight?'}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {lang === 'ar'
                  ? 'تعتمد خطوط الطيران العالمية معيار IATA لحساب المساحة التي تشغلها الطرود في عنبر الشحن الجوي. يتم تطبيق السعر على القيمة الأكبر بين الوزن الفعلي والوزن الحجمي: (الطول × العرض × الارتفاع بالسم) ÷ 6000.'
                  : 'Airlines use IATA volumetric formulas to account for bulky parcels. The chargeable weight is always the greater between actual weight and volumetric weight (L x W x H in cm / 6000).'}
              </p>

              {/* Formula Visual Box */}
              <div className="p-4 rounded-xl bg-white/10 border border-white/15 font-mono text-xs text-brand-sky-light">
                Chargeable Weight = Max( Actual Weight, (L × W × H) / 6000 )
              </div>
            </div>

            {/* Interactive Calculator Box */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 space-y-4 shadow-lg">
              <h3 className="font-bold text-sm text-brand-navy flex items-center gap-2">
                <Scale className="w-4 h-4 text-brand-gold" />
                <span>{lang === 'ar' ? 'احسب وزن طردك الآن' : 'Volumetric Calculator'}</span>
              </h3>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-1">{lang === 'ar' ? 'الطول (سم)' : 'Length (cm)'}</label>
                  <input
                    type="number"
                    value={calcLength}
                    onChange={(e) => setCalcLength(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-lg text-center font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-1">{lang === 'ar' ? 'العرض (سم)' : 'Width (cm)'}</label>
                  <input
                    type="number"
                    value={calcWidth}
                    onChange={(e) => setCalcWidth(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-lg text-center font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-1">{lang === 'ar' ? 'الارتفاع (سم)' : 'Height (cm)'}</label>
                  <input
                    type="number"
                    value={calcHeight}
                    onChange={(e) => setCalcHeight(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-lg text-center font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-bold block mb-1">{lang === 'ar' ? 'الوزن الفعلي على الميزان (كجم)' : 'Actual Weight (kg)'}</label>
                <input
                  type="number"
                  value={calcActualWeight}
                  onChange={(e) => setCalcActualWeight(Number(e.target.value))}
                  className="w-full p-2 border border-slate-200 rounded-lg font-bold text-center"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>{lang === 'ar' ? 'الوزن الحجمي الناتج:' : 'Volumetric Weight:'}</span>
                  <span className="font-bold">{volumetricWeight} كجم</span>
                </div>
                <div className="flex justify-between font-bold text-brand-navy pt-1 border-t border-slate-200">
                  <span>{lang === 'ar' ? 'الوزن المحتسب للشحن:' : 'Chargeable Weight:'}</span>
                  <span className="text-brand-gold text-sm">{chargeableWeight} كجم</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Full Detailed Quotation Request Form */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold text-brand-sky uppercase tracking-wider">
                {lang === 'ar' ? 'طلب تسعير رسمي' : 'Official Cargo Quotation'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
                {lang === 'ar' ? 'طلب عرض سعر شحن جوي لأغراضك وأمتعتك' : 'Request Air Cargo Quotation'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {lang === 'ar'
                  ? 'املأ بيانات الشحنة بدقة وسيقوم منسق الشحن الجوي بإعداد أفضل عرض سعر معتمد عبر خطوط الطيران الشريكة.'
                  : 'Submit your shipment specs and our logistics coordinator will prepare a tailored partner quotation.'}
              </p>
            </div>

            {submittedRef ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 max-w-lg mx-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-black text-emerald-900">
                  {lang === 'ar' ? 'تم تسجيل طلب الشحن بنجاح!' : 'Cargo Request Submitted!'}
                </h3>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  {lang === 'ar'
                    ? `رقم طلبك المرجعي: ${submittedRef}. تم إرسال الطلب لغرفة عمليات الشحن وستتلقى تفاصيل السعر وموعد الاستلام خلال ساعات قليلة.`
                    : `Reference code: ${submittedRef}. Our freight operations team is reviewing your details.`}
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="py-3 px-6 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-navy-light transition"
                  >
                    {lang === 'ar' ? 'متابعة الطلب في لوحة التحكم' : 'View in Dashboard'}
                  </button>
                  <button
                    onClick={() => setSubmittedRef(null)}
                    className="text-xs text-slate-500 hover:underline"
                  >
                    {lang === 'ar' ? 'تقديم طلب شحنة أخرى' : 'Submit another cargo request'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitCargo} className="space-y-6">
                
                {/* 1. Origin & Destination */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-500 border-b border-slate-100 pb-2">
                    {lang === 'ar' ? '1. مسار الشحن (محطة الإرسال والاستلام)' : '1. Route & Corridor'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'دولة الإرسال:' : 'Origin Country:'}</label>
                      <input
                        type="text"
                        value={originCountry}
                        onChange={(e) => setOriginCountry(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'مدينة الإرسال:' : 'Origin City:'}</label>
                      <input
                        type="text"
                        value={originCity}
                        onChange={(e) => setOriginCity(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'دولة الاستلام:' : 'Destination Country:'}</label>
                      <input
                        type="text"
                        value={destCountry}
                        onChange={(e) => setDestCountry(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'مدينة الاستلام:' : 'Destination City:'}</label>
                      <input
                        type="text"
                        value={destCity}
                        onChange={(e) => setDestCity(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipment Specifications */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-500 border-b border-slate-100 pb-2">
                    {lang === 'ar' ? '2. مواصفات الشحنة والأغراض' : '2. Cargo Specifications'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'نوع الشحنة:' : 'Cargo Type:'}</label>
                      <select
                        value={shipmentType}
                        onChange={(e: any) => setShipmentType(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                      >
                        <option value="excess_baggage">{lang === 'ar' ? 'أمتعة وحقائب زائدة للمسافرين' : 'Excess Luggage'}</option>
                        <option value="personal_parcels">{lang === 'ar' ? 'طرود وهدايا شخصية للأهل' : 'Personal Parcels'}</option>
                        <option value="commercial_cargo">{lang === 'ar' ? 'شحن تجاري أو بضائع مؤسسية' : 'Commercial Freight'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'الوزن التقريبي (كجم):' : 'Estimated Weight (kg):'}</label>
                      <input
                        type="number"
                        min={5}
                        max={1000}
                        value={weightKg}
                        onChange={(e) => setWeightKg(Number(e.target.value))}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'تاريخ الشحن المفضل:' : 'Preferred Date:'}</label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'وصف تفصيلي للمحتويات:' : 'Description of Contents:'}</label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                {/* 3. Contact & Delivery Info */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-500 border-b border-slate-100 pb-2">
                    {lang === 'ar' ? '3. بيانات المرسل والمستلم' : '3. Sender & Receiver Details'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'اسم المرسل الكامل:' : 'Sender Name:'}</label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'هاتف المرسل / واتساب:' : 'Sender Phone:'}</label>
                      <input
                        type="text"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'اسم المستلم في بلد الوصول:' : 'Receiver Name:'}</label>
                      <input
                        type="text"
                        value={receiverName}
                        onChange={(e) => setReceiverName(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'هاتف المستلم في بلد الوصول:' : 'Receiver Phone:'}</label>
                      <input
                        type="text"
                        value={receiverPhone}
                        onChange={(e) => setReceiverPhone(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Disclaimer & Submit */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[11px] text-slate-500 max-w-xl leading-relaxed">
                    {lang === 'ar'
                      ? 'ملاحظة تنظيمية: تخضع شحنات الأمتعة لتعليمات سلطات الطيران المدني والتفتيش الجمركي في المطار. لا يتم شحن أي مواد خطرة أو سوائل قابلة للاشتعال.'
                      : 'Regulatory notice: Luggage shipments adhere to civil aviation security standards and customs inspections.'}
                  </p>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-white font-bold text-sm btn-gold-glow flex items-center justify-center gap-2 shadow-md shrink-0"
                  >
                    <Package className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إرسال طلب التسعير الرسمي' : 'Submit Quotation Request'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
