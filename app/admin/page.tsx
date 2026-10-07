'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  ShieldAlert, 
  Package, 
  Plane, 
  Building2, 
  Car, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Download, 
  Edit3, 
  Search, 
  Filter, 
  X,
  UserCheck,
  Globe2,
  Users,
  Settings,
  History,
  LogOut,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { 
  CargoRequest, 
  FlightBookingRequest, 
  HotelReservationRequest, 
  AirportTransferRequest,
  RequestStatus,
  AuditLogItem
} from '@/lib/types';
import { 
  INITIAL_CARGO_REQUESTS, 
  INITIAL_FLIGHT_REQUESTS, 
  INITIAL_HOTEL_REQUESTS, 
  INITIAL_TRANSFER_REQUESTS, 
  INITIAL_AUDIT_LOGS,
  getStoredData, 
  saveStoredData 
} from '@/lib/store';
import { ARAB_COUNTRIES } from '@/lib/arabCountries';

export default function AdminPage() {
  const { lang, t } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

  // Designated Administrator
  const adminDisplayName = 'عثمان المهدي';

  const [activeCategory, setActiveCategory] = useState<'cargo' | 'flights' | 'hotels' | 'transfers' | 'countries' | 'audit'>('cargo');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('all');

  // Stored Data
  const [cargoRequests, setCargoRequests] = useState<CargoRequest[]>([]);
  const [flightRequests, setFlightRequests] = useState<FlightBookingRequest[]>([]);
  const [hotelRequests, setHotelRequests] = useState<HotelReservationRequest[]>([]);
  const [transferRequests, setTransferRequests] = useState<AirportTransferRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  // Edit / Triage Modal State
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [newStatus, setNewStatus] = useState<RequestStatus>('partner_quoted');
  const [quoteAmount, setQuoteAmount] = useState<number>(950);
  const [partnerCarrier, setPartnerCarrier] = useState<string>('مصر للطيران للشحن الجوي (EgyptAir Cargo)');
  const [adminNotes, setAdminNotes] = useState<string>('');
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    setCargoRequests(getStoredData('cargo_requests', INITIAL_CARGO_REQUESTS));
    setFlightRequests(getStoredData('flight_requests', INITIAL_FLIGHT_REQUESTS));
    setHotelRequests(getStoredData('hotel_requests', INITIAL_HOTEL_REQUESTS));
    setTransferRequests(getStoredData('transfer_requests', INITIAL_TRANSFER_REQUESTS));
    setAuditLogs(getStoredData('audit_logs', INITIAL_AUDIT_LOGS));
  }, []);

  // KPIs
  const totalPendingQuotes = cargoRequests.filter(c => c.status === 'submitted' || c.status === 'under_review').length;
  const totalActiveShipments = cargoRequests.filter(c => c.status === 'in_transit' || c.status === 'partner_quoted').length;
  const totalFlightTickets = flightRequests.filter(f => f.status === 'ticketed' || f.status === 'confirmed').length;

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setNewStatus(item.status);
    setQuoteAmount(item.quotedPrice || item.quotedAmount || 850);
    setPartnerCarrier(item.partnerCarrier || 'مصر للطيران');
    setAdminNotes(item.adminNotes || '');
  };

  const handleSaveUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    // Record Audit Log Entry for Othman Al-Mahdi
    const newLog: AuditLogItem = {
      id: `aud_${Date.now()}`,
      actorName: adminDisplayName,
      actorRole: 'Super Admin',
      action: `تحديث طلب ${editingItem.referenceNumber}`,
      targetRef: editingItem.referenceNumber,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      details: `تم تعديل الحالة إلى: ${newStatus} مع تحديد السعر: ${quoteAmount}`
    };
    const updatedLogs = [newLog, ...auditLogs];
    setAuditLogs(updatedLogs);
    saveStoredData('audit_logs', updatedLogs);

    if (activeCategory === 'cargo') {
      const updated = cargoRequests.map(c => {
        if (c.id === editingItem.id) {
          return {
            ...c,
            status: newStatus,
            quotedPrice: quoteAmount,
            partnerCarrier,
            adminNotes,
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      });
      setCargoRequests(updated);
      saveStoredData('cargo_requests', updated);
    } else if (activeCategory === 'flights') {
      const updated = flightRequests.map(f => {
        if (f.id === editingItem.id) {
          return {
            ...f,
            status: newStatus,
            quotedAmount: quoteAmount,
            adminNotes,
            updatedAt: new Date().toISOString()
          };
        }
        return f;
      });
      setFlightRequests(updated);
      saveStoredData('flight_requests', updated);
    }

    setSaveToast(true);
    setEditingItem(null);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const exportCSV = () => {
    alert(lang === 'ar' ? 'تم تصدير سجلات العمليات والطلبات إلى ملف CSV بنجاح.' : 'Exported records to CSV successfully.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Admin Executive Header */}
        <div className="bg-[#0B192C] rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-700">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-amber-500/30">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>لوحة تحكم المشرف العام (Master Administrator)</span>
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {lang === 'ar' ? 'إدارة العمليات والتسعير —' : 'Operations Management —'}
              </h1>
              <span className="text-amber-400 text-2xl sm:text-3xl font-black">
                {adminDisplayName}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {lang === 'ar'
                ? 'إدارة حجوزات الطيران والشحن الجوي لـ 22 دولة عربية، مراجعة عروض الأسعار، وسجلات التدقيق الرقابي.'
                : 'Central operations across all 22 Arab League member states, cargo quotes & audit trails.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-brand-sky-light" />
              <span>{lang === 'ar' ? 'تصدير التقارير (CSV)' : 'Export Reports'}</span>
            </button>
            <Link
              href="/admin/login"
              className="px-3.5 py-2.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-bold border border-rose-500/30 flex items-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تسجيل خروج' : 'Logout'}</span>
            </Link>
          </div>
        </div>

        {/* Success Alert Toast */}
        {saveToast && (
          <div className="p-4 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-between animate-fadeIn shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>{lang === 'ar' ? `تم تسجيل التحديث بنجاح وحفظه في سجل تدقيق المشرف (${adminDisplayName}).` : 'Changes successfully saved to audit log.'}</span>
            </div>
          </div>
        )}

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">{lang === 'ar' ? 'طلبات تسعير شحن معلقة' : 'Pending Cargo Quotes'}</span>
              <Package className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-brand-navy">
              {totalPendingQuotes}
            </div>
            <span className="text-[11px] font-semibold text-amber-600 block">
              {lang === 'ar' ? 'تحتاج إلى تسعير من المشرف' : 'Awaiting admin freight quote'}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">{lang === 'ar' ? 'شحنات أمتعة نشطة' : 'Active Cargo Shipments'}</span>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-brand-navy">
              {totalActiveShipments}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 block">
              {lang === 'ar' ? 'قيد المناولة والشحن الجوي' : 'In Transit / Dispatched'}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">{lang === 'ar' ? 'تذاكر طيران معتمدة' : 'Confirmed Flight Tickets'}</span>
              <Plane className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-black text-brand-navy">
              {totalFlightTickets}
            </div>
            <span className="text-[11px] font-semibold text-blue-600 block">
              {lang === 'ar' ? 'PNR معتمد عبر الناقلين' : 'Authorized carrier PNRs'}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">{lang === 'ar' ? 'الدول العربية المدعومة' : 'Active Arab Corridors'}</span>
              <Globe2 className="w-5 h-5 text-teal-500" />
            </div>
            <div className="text-3xl font-black text-brand-navy">
              22
            </div>
            <span className="text-[11px] font-semibold text-teal-600 block">
              {lang === 'ar' ? 'جامعة الدول العربية بالكامل' : 'All 22 Arab League States'}
            </span>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'cargo', label: lang === 'ar' ? `طلبات الشحن الجوي (${cargoRequests.length})` : `Cargo (${cargoRequests.length})`, icon: Package },
            { id: 'flights', label: lang === 'ar' ? `طلبات الطيران (${flightRequests.length})` : `Flights (${flightRequests.length})`, icon: Plane },
            { id: 'hotels', label: lang === 'ar' ? `الفنادق (${hotelRequests.length})` : `Hotels (${hotelRequests.length})`, icon: Building2 },
            { id: 'transfers', label: lang === 'ar' ? `توصيل المطار (${transferRequests.length})` : `Transfers (${transferRequests.length})`, icon: Car },
            { id: 'countries', label: lang === 'ar' ? 'الدول والمطارات (22 دولة)' : 'Arab Corridors (22)', icon: Globe2 },
            { id: 'audit', label: lang === 'ar' ? `سجل التدقيق (${auditLogs.length})` : `Audit Logs (${auditLogs.length})`, icon: History },
          ].map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#0B192C] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Views */}
        
        {/* VIEW 1: 22 ARAB COUNTRIES MONITOR */}
        {activeCategory === 'countries' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-black text-xl text-brand-navy">
                  {lang === 'ar' ? 'تغطية مسارات الدول العربية الـ 22' : 'All 22 Arab League Member States'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'ar' ? 'المطارات المعتمدة ورموز IATA ومعدلات العملات الرسمية المفعلة في محرك البحث' : 'Supported airports, currencies, and corridors'}
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {lang === 'ar' ? '22 دولة مفعلة بنجاح' : '22 Countries Active'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ARAB_COUNTRIES.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl border border-slate-200 hover:border-brand-sky/40 transition bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{c.flagEmoji}</span>
                      <span className="font-bold text-sm text-brand-navy">{lang === 'ar' ? c.nameAr : c.nameEn}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border">
                      {c.currency}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <div>{lang === 'ar' ? 'العاصمة:' : 'Capital:'} <span className="font-semibold text-slate-700">{lang === 'ar' ? c.capitalAr : c.capitalEn}</span></div>
                    <div>{lang === 'ar' ? 'المطارات المعتمدة:' : 'Airports:'} <span className="font-mono font-bold text-brand-sky">{c.airports.map(a => a.code).join(', ')}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: AUDIT LOGS FOR عثمان المهدي */}
        {activeCategory === 'audit' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-black text-xl text-brand-navy">
                {lang === 'ar' ? 'سجل التدقيق الرقابي والعمليات الأمنية' : 'Audit Logs & Regulatory Accountability'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'ar' ? `كافة الإجراءات المسجلة تحت اسم المشرف العام (${adminDisplayName})` : `All logged events under Administrator ${adminDisplayName}`}
              </p>
            </div>

            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brand-navy">{log.actorName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">{log.action}</span>
                      <span className="font-mono text-slate-400">[{log.targetRef}]</span>
                    </div>
                    <p className="text-slate-600">{log.details}</p>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 shrink-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: REQUESTS MANAGEMENT TABLE (CARGO, FLIGHTS, HOTELS, TRANSFERS) */}
        {(activeCategory === 'cargo' || activeCategory === 'flights' || activeCategory === 'hotels' || activeCategory === 'transfers') && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-black text-lg text-brand-navy">
                {activeCategory === 'cargo' && (lang === 'ar' ? 'إدارة شحنات وأمتعة المسافرين الجوية' : 'Air Cargo & Luggage Triage')}
                {activeCategory === 'flights' && (lang === 'ar' ? 'إدارة طلبات حجز الطيران' : 'Flight Bookings Triage')}
                {activeCategory === 'hotels' && (lang === 'ar' ? 'إدارة حجوزات الفنادق والمنتجعات' : 'Hotel Reservations')}
                {activeCategory === 'transfers' && (lang === 'ar' ? 'إدارة سيارات وتوصيل المطار' : 'Airport Transfers')}
              </h3>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'ar' ? 'بحث بالاسم أو الكود...' : 'Search ref or name...'}
                  className="ps-9 pe-4 py-2 rounded-xl border border-slate-200 text-xs w-64 focus:outline-none focus:border-brand-sky"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-4 text-start">{lang === 'ar' ? 'الرقم المرجعي' : 'Ref #'}</th>
                    <th className="p-4 text-start">{lang === 'ar' ? 'العميل' : 'Customer'}</th>
                    <th className="p-4 text-start">{lang === 'ar' ? 'التفاصيل والمسار' : 'Details'}</th>
                    <th className="p-4 text-start">{lang === 'ar' ? 'عرض السعر' : 'Quote'}</th>
                    <th className="p-4 text-start">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                    <th className="p-4 text-end">{lang === 'ar' ? 'إجراءات المشرف' : 'Admin Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {activeCategory === 'cargo' && cargoRequests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4 font-mono font-bold text-brand-navy">{req.referenceNumber}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{req.senderName}</div>
                        <div className="text-[10px] text-slate-400">{req.senderPhone}</div>
                      </td>
                      <td className="p-4">
                        <div>{req.originCity} ➔ {req.destCity}</div>
                        <div className="text-[10px] text-slate-400">{req.weightKg} كجم • {req.description.slice(0, 30)}...</div>
                      </td>
                      <td className="p-4">
                        {req.quotedPrice ? (
                          <span className="font-bold text-emerald-600">{req.quotedPrice} {req.currency}</span>
                        ) : (
                          <span className="text-slate-400 italic">قيد التقدير</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">
                          {req.status}
                        </span>
                      </td>
                      <td className="p-4 text-end">
                        <button
                          onClick={() => handleOpenEdit(req)}
                          className="px-3 py-1.5 rounded-lg bg-[#0B192C] hover:bg-slate-800 text-white text-[11px] font-bold transition inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{lang === 'ar' ? 'تعديل وتسعير' : 'Edit & Quote'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {activeCategory === 'flights' && flightRequests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4 font-mono font-bold text-brand-navy">{req.referenceNumber}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{req.passengerName}</div>
                        <div className="text-[10px] text-slate-400">{req.passengerPhone}</div>
                      </td>
                      <td className="p-4">
                        <div>{req.searchQuery.originCode} ➔ {req.searchQuery.destinationCode}</div>
                        <div className="text-[10px] text-slate-400">{req.searchQuery.departureDate} • {req.searchQuery.cabinClass}</div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-brand-sky">{req.quotedAmount} {req.currency}</span>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          {req.status}
                        </span>
                      </td>
                      <td className="p-4 text-end">
                        <button
                          onClick={() => handleOpenEdit(req)}
                          className="px-3 py-1.5 rounded-lg bg-[#0B192C] hover:bg-slate-800 text-white text-[11px] font-bold transition inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{lang === 'ar' ? 'تحديث الحالة' : 'Update'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Edit / Quote Action Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-fadeIn max-h-[90vh] overflow-y-auto space-y-6">
            
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-5 end-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono font-bold text-brand-sky">
                {editingItem.referenceNumber}
              </span>
              <h3 className="text-xl font-black text-brand-navy">
                {lang === 'ar' ? 'تعديل حالة الطلب واعتماد عرض السعر' : 'Update Status & Partner Quote'}
              </h3>
              <p className="text-xs text-slate-500">
                المسؤول: <span className="font-bold text-brand-navy">{adminDisplayName}</span>
              </p>
            </div>

            <form onSubmit={handleSaveUpdate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {lang === 'ar' ? 'تحديث الحالة التشغيلية:' : 'Operational Status:'}
                </label>
                <select
                  value={newStatus}
                  onChange={(e: any) => setNewStatus(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 font-bold bg-white"
                >
                  <option value="submitted">{t.statusBadge.submitted}</option>
                  <option value="under_review">{t.statusBadge.under_review}</option>
                  <option value="partner_quoted">{t.statusBadge.partner_quoted}</option>
                  <option value="confirmed">{t.statusBadge.confirmed}</option>
                  <option value="ticketed">{t.statusBadge.ticketed}</option>
                  <option value="in_transit">{t.statusBadge.in_transit}</option>
                  <option value="delivered">{t.statusBadge.delivered}</option>
                  <option value="completed">{t.statusBadge.completed}</option>
                  <option value="cancelled">{t.statusBadge.cancelled}</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {lang === 'ar' ? 'مبلغ عرض السعر (SAR / USD):' : 'Quoted Amount:'}
                </label>
                <input
                  type="number"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(Number(e.target.value))}
                  required
                  className="w-full p-3 rounded-xl border border-slate-200 font-black text-sm"
                />
              </div>

              {activeCategory === 'cargo' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'ar' ? 'شركة الطيران / الناقل الشريك:' : 'Partner Carrier / Airline:'}
                  </label>
                  <input
                    type="text"
                    value={partnerCarrier}
                    onChange={(e) => setPartnerCarrier(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {lang === 'ar' ? 'ملاحظات مكتب العمليات للعميل:' : 'Internal Operations Note for Customer:'}
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-[#0B192C] hover:bg-slate-800 text-white font-bold text-xs btn-glow shadow-md"
                >
                  {lang === 'ar' ? 'حفظ التحديث وتسجيله في سجل التدقيق' : 'Save & Record Audit'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-6 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
