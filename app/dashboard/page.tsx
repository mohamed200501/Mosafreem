'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  LayoutDashboard, 
  Plane, 
  Package, 
  Building2, 
  Car, 
  FileText, 
  ShieldCheck, 
  Bell, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft,
  FileDown,
  Sparkles,
  Search,
  X
} from 'lucide-react';
import { 
  FlightBookingRequest, 
  CargoRequest, 
  HotelReservationRequest, 
  AirportTransferRequest, 
  VisaAssistanceRequest, 
  TravelInsuranceRequest,
  NotificationItem,
  User as UserType
} from '@/lib/types';
import { 
  DEMO_USERS, 
  INITIAL_FLIGHT_REQUESTS, 
  INITIAL_CARGO_REQUESTS, 
  INITIAL_HOTEL_REQUESTS, 
  INITIAL_TRANSFER_REQUESTS, 
  INITIAL_VISA_REQUESTS, 
  INITIAL_INSURANCE_REQUESTS, 
  INITIAL_NOTIFICATIONS, 
  getStoredData, 
  saveStoredData 
} from '@/lib/store';

export default function CustomerDashboardPage() {
  const { lang, t } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

  const [activeTab, setActiveTab] = useState<'all' | 'flights' | 'cargo' | 'hotels' | 'transfers' | 'visa' | 'insurance'>('all');
  const [currentUser] = useState<UserType>(DEMO_USERS[0]); // Ahmed El-Shamy

  // Loaded stored state
  const [flightRequests, setFlightRequests] = useState<FlightBookingRequest[]>([]);
  const [cargoRequests, setCargoRequests] = useState<CargoRequest[]>([]);
  const [hotelRequests, setHotelRequests] = useState<HotelReservationRequest[]>([]);
  const [transferRequests, setTransferRequests] = useState<AirportTransferRequest[]>([]);
  const [visaRequests, setVisaRequests] = useState<VisaAssistanceRequest[]>([]);
  const [insuranceRequests, setInsuranceRequests] = useState<TravelInsuranceRequest[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Selected item modal
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    setFlightRequests(getStoredData('flight_requests', INITIAL_FLIGHT_REQUESTS));
    setCargoRequests(getStoredData('cargo_requests', INITIAL_CARGO_REQUESTS));
    setHotelRequests(getStoredData('hotel_requests', INITIAL_HOTEL_REQUESTS));
    setTransferRequests(getStoredData('transfer_requests', INITIAL_TRANSFER_REQUESTS));
    setVisaRequests(getStoredData('visa_requests', INITIAL_VISA_REQUESTS));
    setInsuranceRequests(getStoredData('insurance_requests', INITIAL_INSURANCE_REQUESTS));
    setNotifications(getStoredData('notifications', INITIAL_NOTIFICATIONS));
  }, []);

  const totalRequestsCount = 
    flightRequests.length + 
    cargoRequests.length + 
    hotelRequests.length + 
    transferRequests.length + 
    visaRequests.length + 
    insuranceRequests.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ticketed':
      case 'confirmed':
      case 'delivered':
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">{t.statusBadge[status as keyof typeof t.statusBadge] || status}</span>;
      case 'partner_quoted':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">{t.statusBadge.partner_quoted}</span>;
      case 'in_transit':
        return <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold">{t.statusBadge.in_transit}</span>;
      case 'under_review':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">{t.statusBadge.under_review}</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">{t.statusBadge.submitted}</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-2xl shadow-md">
              {lang === 'ar' ? 'أ' : 'A'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-brand-navy">
                  {currentUser.name}
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-sky-muted text-brand-sky">
                  {lang === 'ar' ? 'مسافر مسجل' : 'Verified Member'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {currentUser.email} • {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-end">
              <span className="text-xs text-slate-400 block">{lang === 'ar' ? 'إجمالي الطلبات النشطة' : 'Active Requests'}</span>
              <span className="text-2xl font-black text-brand-navy">{totalRequestsCount}</span>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>{lang === 'ar' ? 'معاينة شاشة الإدارة' : 'Switch to Admin'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: lang === 'ar' ? `كل الطلبات (${totalRequestsCount})` : `All (${totalRequestsCount})`, icon: LayoutDashboard },
            { id: 'flights', label: lang === 'ar' ? `رحلات الطيران (${flightRequests.length})` : `Flights (${flightRequests.length})`, icon: Plane },
            { id: 'cargo', label: lang === 'ar' ? `الشحن والأمتعة (${cargoRequests.length})` : `Cargo (${cargoRequests.length})`, icon: Package },
            { id: 'hotels', label: lang === 'ar' ? `الفنادق (${hotelRequests.length})` : `Hotels (${hotelRequests.length})`, icon: Building2 },
            { id: 'transfers', label: lang === 'ar' ? `توصيل المطار (${transferRequests.length})` : `Transfers (${transferRequests.length})`, icon: Car },
            { id: 'visa', label: lang === 'ar' ? `التأشيرات (${visaRequests.length})` : `Visa (${visaRequests.length})`, icon: FileText },
            { id: 'insurance', label: lang === 'ar' ? `تأمين السفر (${insuranceRequests.length})` : `Insurance (${insuranceRequests.length})`, icon: ShieldCheck },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Requests Feed */}
        <div className="space-y-4">
          
          {/* FLIGHTS */}
          {(activeTab === 'all' || activeTab === 'flights') && flightRequests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedItem({ ...req, type: 'flight' })}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-sky/50 hover:shadow-soft-xl transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Plane className="w-6 h-6 transform -rotate-45" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{req.referenceNumber}</span>
                    {getStatusBadge(req.status)}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mt-1">
                    {req.searchQuery.originCode} ➔ {req.searchQuery.destinationCode} ({req.searchQuery.cabinClass})
                  </h3>
                  <p className="text-xs text-slate-500">
                    {req.passengerName} • {lang === 'ar' ? 'تاريخ السفر:' : 'Date:'} {req.searchQuery.departureDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-start md:text-end">
                  <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'التسعير المعتمد' : 'Quoted Fare'}</span>
                  <span className="text-base font-black text-brand-navy">
                    {req.quotedAmount ? `${req.quotedAmount} ${req.currency}` : (lang === 'ar' ? 'قيد المراجعة' : 'Pending')}
                  </span>
                </div>
                <ArrowIcon className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}

          {/* CARGO */}
          {(activeTab === 'all' || activeTab === 'cargo') && cargoRequests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedItem({ ...req, type: 'cargo' })}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-gold/50 hover:shadow-soft-xl transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{req.referenceNumber}</span>
                    {getStatusBadge(req.status)}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mt-1">
                    {lang === 'ar' ? 'شحن جوي:' : 'Air Cargo:'} {req.originCity} ➔ {req.destCity} ({req.weightKg} كجم)
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {req.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-start md:text-end">
                  <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'سعر الشحن الجوي' : 'Freight Quote'}</span>
                  <span className="text-base font-black text-brand-navy">
                    {req.quotedPrice ? `${req.quotedPrice} ${req.currency}` : (lang === 'ar' ? 'قيد التقدير' : 'Estimating')}
                  </span>
                </div>
                <ArrowIcon className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}

          {/* HOTELS */}
          {(activeTab === 'all' || activeTab === 'hotels') && hotelRequests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedItem({ ...req, type: 'hotel' })}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-turquoise/50 hover:shadow-soft-xl transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{req.referenceNumber}</span>
                    {getStatusBadge(req.status)}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mt-1">
                    {req.hotelName} ({req.city})
                  </h3>
                  <p className="text-xs text-slate-500">
                    {req.checkInDate} ➔ {req.checkOutDate} • {req.guestName}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-start md:text-end">
                  <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'قيمة الإقامة' : 'Stay Total'}</span>
                  <span className="text-base font-black text-brand-navy">
                    {req.quotedAmount ? `$${req.quotedAmount} ${req.currency}` : 'Pending'}
                  </span>
                </div>
                <ArrowIcon className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}

          {/* TRANSFERS */}
          {(activeTab === 'all' || activeTab === 'transfers') && transferRequests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedItem({ ...req, type: 'transfer' })}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-sky/50 hover:shadow-soft-xl transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{req.referenceNumber}</span>
                    {getStatusBadge(req.status)}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mt-1">
                    {lang === 'ar' ? 'توصيل مطار:' : 'Airport Transfer:'} {req.destination}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {req.date} at {req.time} • {req.vehicleType.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-start md:text-end">
                  <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'أجرة الرحلة' : 'Fare'}</span>
                  <span className="text-base font-black text-brand-navy">
                    {req.quotedAmount} {req.currency}
                  </span>
                </div>
                <ArrowIcon className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}

          {/* Empty state if none */}
          {totalRequestsCount === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <LayoutDashboard className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-brand-navy">
                {lang === 'ar' ? 'لا توجد طلبات مسجلة حتى الآن' : 'No requests yet'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'ar' ? 'ابدأ بالبحث عن رحلة طيران أو طلب تسعير شحن أمتعة من الصفحة الرئيسية.' : 'Start by searching for flights or requesting cargo quotes.'}
              </p>
            </div>
          )}

        </div>

      </main>

      {/* Request Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-fadeIn max-h-[90vh] overflow-y-auto space-y-6">
            
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 end-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                {selectedItem.referenceNumber}
              </span>
              <h3 className="text-xl font-black text-brand-navy">
                {lang === 'ar' ? 'تفاصيل وحالة الطلب' : 'Request Summary'}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{lang === 'ar' ? 'الحالة الحالية:' : 'Current Status:'}</span>
                {getStatusBadge(selectedItem.status)}
              </div>

              {selectedItem.quotedPrice && (
                <div className="flex justify-between items-center font-bold text-brand-navy">
                  <span>{lang === 'ar' ? 'قيمة التسعير المقررة:' : 'Quoted Amount:'}</span>
                  <span className="text-base text-brand-gold">{selectedItem.quotedPrice} {selectedItem.currency}</span>
                </div>
              )}

              {selectedItem.quotedAmount && (
                <div className="flex justify-between items-center font-bold text-brand-navy">
                  <span>{lang === 'ar' ? 'قيمة التسعير المقررة:' : 'Quoted Amount:'}</span>
                  <span className="text-base text-brand-sky">{selectedItem.quotedAmount} {selectedItem.currency}</span>
                </div>
              )}

              {selectedItem.adminNotes && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-700 block mb-1">{lang === 'ar' ? 'ملاحظات مكتب العمليات:' : 'Operations Notes:'}</span>
                  <p className="text-slate-600 italic bg-white p-3 rounded-xl border border-slate-200">
                    "{selectedItem.adminNotes}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => { alert(lang === 'ar' ? 'جاري تجهيز وثيقة الطلب للطباعة...' : 'Printing summary...'); }}
                className="flex-1 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تحميل الملخص' : 'Download Summary'}</span>
              </button>
              
              <button
                onClick={() => setSelectedItem(null)}
                className="py-3 px-6 rounded-xl bg-brand-navy text-white font-bold text-xs hover:bg-brand-navy-light"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
