'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Car, 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  Luggage, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Plane
} from 'lucide-react';
import { AirportTransferRequest } from '@/lib/types';
import { INITIAL_TRANSFER_REQUESTS, getStoredData, saveStoredData } from '@/lib/store';

export default function TransfersPage() {
  const { lang, t } = useLanguage();

  const [pickup, setPickup] = useState('مطار القاهرة الدولي (صالة 3 - وصول دولي)');
  const [destination, setDestination] = useState('فندق ريتز كارلتون - التحرير');
  const [flightNumber, setFlightNumber] = useState('SV-302');
  const [transferDate, setTransferDate] = useState('2026-11-15');
  const [transferTime, setTransferTime] = useState('16:45');
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(3);
  const [vehicleTier, setVehicleTier] = useState<'sedan' | 'business' | 'van' | 'vip'>('business');
  
  const [customerName, setCustomerName] = useState('أحمد مصطفى الشامي');
  const [customerPhone, setCustomerPhone] = useState('+20 100 234 5678');
  const [customerEmail, setCustomerEmail] = useState('ahmed.elshamy@example.com');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const vehicles = [
    {
      id: 'sedan',
      titleAr: 'سيدان اقتصادية مريحة (Toyota Corolla أو مماثل)',
      titleEn: 'Standard Sedan (Corolla or similar)',
      passengers: '3 ركاب',
      luggage: '2 حقائب',
      price: 120,
      currency: 'SAR',
      badge: lang === 'ar' ? 'اقتصادي' : 'Economy'
    },
    {
      id: 'business',
      titleAr: 'رجال أعمال تنفيذية (Lexus / Mercedes E-Class)',
      titleEn: 'Executive Business (Lexus / E-Class)',
      passengers: '3 ركاب',
      luggage: '3 حقائب',
      price: 240,
      currency: 'SAR',
      badge: lang === 'ar' ? 'الأكثر طلباً' : 'Popular'
    },
    {
      id: 'van',
      titleAr: 'ميني فان عائلي رحب (Hyundai Staria / Toyota HiAce VIP)',
      titleEn: 'Family Luxury Van (Hyundai Staria)',
      passengers: '6 ركاب',
      luggage: '6 حقائب كبيرة',
      price: 310,
      currency: 'SAR',
      badge: lang === 'ar' ? 'للعائلات والأمتعة' : 'Family'
    },
    {
      id: 'vip',
      titleAr: 'مرسيدس VIP الفئة S مع سائق بزي رسمي',
      titleEn: 'Mercedes S-Class VIP Chauffeur',
      passengers: '2 ركاب',
      luggage: '2 حقائب',
      price: 490,
      currency: 'SAR',
      badge: lang === 'ar' ? 'فخامة ملكية' : 'VIP Class'
    }
  ];

  const currentVehicle = vehicles.find(v => v.id === vehicleTier) || vehicles[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `MSF-TRF-${randomNum}`;

    const newTransfer: AirportTransferRequest = {
      id: `trf_${Date.now()}`,
      referenceNumber: ref,
      pickupLocation: pickup,
      destination,
      isAirportPickup: true,
      flightNumber,
      date: transferDate,
      time: transferTime,
      passengers,
      luggageCount: luggage,
      vehicleType: vehicleTier,
      customerName,
      customerPhone,
      customerEmail,
      status: 'submitted',
      quotedAmount: currentVehicle.price,
      currency: currentVehicle.currency,
      adminNotes: 'طلب توصيل مطار مع تتبع مباشر لرقم الرحلة الجوية لتعديل الموعد حال حدوث تأخير.',
      createdAt: new Date().toISOString()
    };

    const existing = getStoredData<AirportTransferRequest[]>('transfer_requests', INITIAL_TRANSFER_REQUESTS);
    saveStoredData('transfer_requests', [newTransfer, ...existing]);

    setSubmittedRef(ref);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
            <Car className="w-4 h-4 text-brand-sky" />
            <span>{lang === 'ar' ? 'خدمة توصيل ونقل المطار المتميزة' : 'Airport Concierge & Chauffeur'}</span>
          </span>
          <h1 className="text-3xl font-black text-brand-navy">
            {lang === 'ar' ? 'انتقال هادئ وموثوق من وإلى المطار' : 'Reliable Airport Transfers with Private Chauffeur'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            {lang === 'ar'
              ? 'سائق خاص في انتظارك في صالة الوصول حاملاً لوحة باسمك، مع تتبع مجاني لتوقيت رحلتك الجوية لتفادي أي انتظار.'
              : 'Private chauffeur awaiting you in arrivals with name signage and live flight tracking to adjust for delays.'}
          </p>
        </div>

        {submittedRef ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm text-center max-w-lg mx-auto space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-black text-brand-navy">
              {lang === 'ar' ? 'تم تأكيد طلب التوصيل بنجاح!' : 'Transfer Request Booked!'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? `رقم طلبك المرجعي: ${submittedRef}. تم إسناد طلبك وسيتواصل معك السائق أو المشرف قبل موعد الرحلة بساعتين.`
                : `Reference code: ${submittedRef}. Your ride is registered and you can view it on your dashboard.`}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full py-3.5 rounded-xl bg-brand-navy text-white text-xs font-bold"
              >
                {lang === 'ar' ? 'عرض في لوحة تحكم طلباتي' : 'View in Dashboard'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-brand-navy border-b border-slate-100 pb-3">
                {lang === 'ar' ? 'تفاصيل الرحلة ومكان الاستقبال' : 'Ride & Route Information'}
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'نقطة الانطلاق (المطار أو الصالة):' : 'Pickup Location:'}</label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-brand-sky"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'وجهة الوصول (الفندق أو العنوان):' : 'Drop-off Destination:'}</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-brand-sky"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'رقم الرحلة الجوية:' : 'Flight No:'}</label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="SV-302"
                      className="w-full p-3 rounded-xl border border-slate-200 font-mono font-bold uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'تاريخ التوصيل:' : 'Date:'}</label>
                    <input
                      type="date"
                      value={transferDate}
                      onChange={(e) => setTransferDate(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'وقت الوصول التقريبي:' : 'Time:'}</label>
                    <input
                      type="time"
                      value={transferTime}
                      onChange={(e) => setTransferTime(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'عدد الركاب:' : 'Passengers:'}</label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'عدد الحقائب:' : 'Luggage Count:'}</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={luggage}
                      onChange={(e) => setLuggage(Number(e.target.value))}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Passenger Contact */}
              <h3 className="text-base font-bold text-brand-navy border-t border-slate-100 pt-4 pb-2">
                {lang === 'ar' ? 'بيانات التواصل للمسافر' : 'Contact Information'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'الاسم:' : 'Name:'}</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'الهاتف:' : 'Phone:'}</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'البريد:' : 'Email:'}</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-sm btn-glow transition shadow-md"
              >
                {lang === 'ar' ? 'تأكيد وحجز السيارة الآن' : 'Confirm & Reserve Transfer'}
              </button>
            </form>

            {/* Vehicle Selection Cards */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-base font-bold text-brand-navy">
                {lang === 'ar' ? 'اختر فئة السيارة المطلوبة' : 'Select Vehicle Tier'}
              </h3>

              <div className="space-y-3">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setVehicleTier(v.id as any)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      vehicleTier === v.id
                        ? 'border-brand-sky bg-brand-sky-muted/40 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-brand-navy">
                        {lang === 'ar' ? v.titleAr : v.titleEn}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white text-brand-sky border border-slate-200">
                        {v.badge}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{v.passengers}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Luggage className="w-3.5 h-3.5" />
                          <span>{v.luggage}</span>
                        </span>
                      </div>

                      <span className="text-base font-black text-brand-navy">
                        {v.price} {v.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-brand-navy">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'ar' ? 'مزايا خدمة مسافرين لتوصيل المطار:' : 'Masaferin Chauffeur Advantages:'}</span>
                </div>
                <ul className="space-y-1 text-slate-500 list-disc list-inside">
                  <li>{lang === 'ar' ? 'ساعة انتظار مجانية بعد هبوط الطائرة' : '60 minutes complimentary waiting time'}</li>
                  <li>{lang === 'ar' ? 'سائقون معتمدون ومركبات مكيفة ومجهزة' : 'Vetted licensed drivers & climate control'}</li>
                  <li>{lang === 'ar' ? 'أسعار ثابتة شاملة رسوم الطرق والوقود' : 'Fixed pricing inclusive of highway tolls'}</li>
                </ul>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
