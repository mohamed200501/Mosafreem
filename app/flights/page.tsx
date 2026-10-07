'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Plane, 
  Clock, 
  Luggage, 
  ArrowLeft, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  Sparkles, 
  Calendar,
  Building2,
  X,
  CreditCard,
  UserCheck,
  Search,
  Globe2,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { FlightOption, FlightBookingRequest, FlightSearchQuery } from '@/lib/types';
import { DemoFlightProvider } from '@/lib/adapters/flightProvider';
import { INITIAL_FLIGHT_REQUESTS, getStoredData, saveStoredData } from '@/lib/store';
import { ARAB_COUNTRIES, ALL_ARAB_AIRPORTS } from '@/lib/arabCountries';

export default function FlightsPage() {
  const { lang, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const initialOrigin = searchParams.get('origin') || 'CAI';
  const initialDest = searchParams.get('destination') || 'RUH';
  const initialTripType = (searchParams.get('tripType') as any) || 'round-trip';
  const initialCabinClass = (searchParams.get('cabinClass') as any) || 'economy';

  const [originCode, setOriginCode] = useState(initialOrigin);
  const [destCode, setDestCode] = useState(initialDest);
  const [tripType, setTripType] = useState<'round-trip' | 'one-way'>(initialTripType);
  const [cabinClass, setCabinClass] = useState<'economy' | 'business' | 'first'>(initialCabinClass);
  const [departureDate, setDepartureDate] = useState('2026-11-15');
  const [returnDate, setReturnDate] = useState('2026-11-28');
  const [isModifyOpen, setIsModifyOpen] = useState(false);

  const [flights, setFlights] = useState<FlightOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAirlineFilter, setSelectedAirlineFilter] = useState<string>('all');
  const [selectedStopsFilter, setSelectedStopsFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');

  // Booking Modal State
  const [selectedFlightForBooking, setSelectedFlightForBooking] = useState<FlightOption | null>(null);
  const [passengerName, setPassengerName] = useState('أحمد مصطفى الشامي');
  const [passengerPhone, setPassengerPhone] = useState('+20 100 234 5678');
  const [passengerEmail, setPassengerEmail] = useState('ahmed.elshamy@example.com');
  const [passportNumber, setPassportNumber] = useState('A29481902');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Look up city labels
  const originAirportObj = ALL_ARAB_AIRPORTS.find(a => a.code === originCode);
  const destAirportObj = ALL_ARAB_AIRPORTS.find(a => a.code === destCode);
  const originDisplay = originAirportObj ? `${originAirportObj.cityAr} (${originAirportObj.code})` : originCode;
  const destDisplay = destAirportObj ? `${destAirportObj.cityAr} (${destAirportObj.code})` : destCode;

  // Load flights using adapter
  const fetchFlights = async (orig: string, dst: string, trip: string, cClass: string) => {
    setLoading(true);
    const provider = new DemoFlightProvider();
    const results = await provider.searchFlights({
      tripType: trip as any,
      origin: originDisplay,
      originCode: orig,
      destination: destDisplay,
      destinationCode: dst,
      departureDate,
      returnDate: trip === 'round-trip' ? returnDate : undefined,
      adults: 1,
      children: 0,
      cabinClass: cClass as any
    });
    setFlights(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchFlights(originCode, destCode, tripType, cabinClass);
  }, [originCode, destCode, tripType, cabinClass]);

  const handleApplyNewRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModifyOpen(false);
    fetchFlights(originCode, destCode, tripType, cabinClass);
  };

  // Popular Arab Corridors Shortcut
  const popularCorridors = [
    { label: 'القاهرة ⇄ الرياض', origin: 'CAI', dest: 'RUH' },
    { label: 'القاهرة ⇄ جدة', origin: 'CAI', dest: 'JED' },
    { label: 'القاهرة ⇄ دبي', origin: 'CAI', dest: 'DXB' },
    { label: 'الرياض ⇄ دبي', origin: 'RUH', dest: 'DXB' },
    { label: 'القاهرة ⇄ الكويت', origin: 'CAI', dest: 'KWI' },
    { label: 'القاهرة ⇄ عمّان', origin: 'CAI', dest: 'AMM' },
    { label: 'الدوحة ⇄ الرياض', origin: 'DOH', dest: 'RUH' },
    { label: 'الدار البيضاء ⇄ القاهرة', origin: 'CMN', dest: 'CAI' },
  ];

  // Filtering & Sorting
  const filteredFlights = flights.filter((flight) => {
    if (selectedAirlineFilter !== 'all' && !flight.airline.includes(selectedAirlineFilter)) {
      return false;
    }
    if (selectedStopsFilter === 'direct' && flight.stops !== 0) return false;
    if (selectedStopsFilter === 'one-stop' && flight.stops !== 1) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price') return a.priceAmount - b.priceAmount;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
    return 0;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFlightForBooking) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `MSF-FLT-${randomNum}`;

    const newRequest: FlightBookingRequest = {
      id: `flt_${Date.now()}`,
      referenceNumber: ref,
      searchQuery: {
        tripType,
        origin: selectedFlightForBooking.originCity,
        originCode: selectedFlightForBooking.originCode,
        destination: selectedFlightForBooking.destinationCity,
        destinationCode: selectedFlightForBooking.destinationCode,
        departureDate,
        returnDate: tripType === 'round-trip' ? returnDate : undefined,
        adults: 1,
        children: 0,
        cabinClass
      },
      selectedFlight: selectedFlightForBooking,
      passengerName,
      passengerEmail,
      passengerPhone,
      passportNumber,
      status: 'submitted',
      quotedAmount: selectedFlightForBooking.priceAmount,
      currency: selectedFlightForBooking.currency,
      partnerReference: `${selectedFlightForBooking.airlineCode}-${Math.floor(100000 + Math.random() * 900000)}`,
      adminNotes: `تم تقديم طلب الحجز للرحلة ${selectedFlightForBooking.flightNumber} (${selectedFlightForBooking.originCode} -> ${selectedFlightForBooking.destinationCode}). بانتظار مراجعة مكتب العمليات.`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const existing = getStoredData<FlightBookingRequest[]>('flight_requests', INITIAL_FLIGHT_REQUESTS);
    saveStoredData('flight_requests', [newRequest, ...existing]);

    setBookingSuccess(ref);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header Breadcrumb & Search Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-sky">
                <Plane className="w-4 h-4 transform -rotate-45" />
                <span>{lang === 'ar' ? 'شبكة رحلات الطيران العربية والدولية' : 'Arab & International Flight Network'}</span>
                <span className="bg-brand-sky-muted text-brand-sky px-2 py-0.5 rounded-full text-[11px] font-bold">
                  {lang === 'ar' ? '22 دولة عربية' : '22 Arab States'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-3">
                <span>{originDisplay}</span>
                <ArrowIcon className="w-5 h-5 text-brand-sky" />
                <span>{destDisplay}</span>
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <span>
                  {tripType === 'round-trip' 
                    ? (lang === 'ar' ? `ذهاب وعودة • ${departureDate} إلى ${returnDate}` : `Round-Trip • ${departureDate} - ${returnDate}`) 
                    : (lang === 'ar' ? `ذهاب فقط • ${departureDate}` : `One-Way • ${departureDate}`)}
                </span>
                <span>•</span>
                <span className="capitalize font-semibold text-slate-700">
                  {cabinClass === 'economy' ? (lang === 'ar' ? 'درجة اقتصادية' : 'Economy') : (lang === 'ar' ? 'درجة رجال أعمال' : 'Business')}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModifyOpen(!isModifyOpen)}
                className="text-xs font-bold px-5 py-2.5 rounded-xl bg-brand-sky-muted text-brand-navy hover:bg-sky-100 border border-sky-200 transition flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-brand-sky" />
                <span>{lang === 'ar' ? (isModifyOpen ? 'إغلاق نافذة البحث' : 'تغيير الوجهات والتواريخ') : (isModifyOpen ? 'Close Editor' : 'Change Route & Dates')}</span>
              </button>
            </div>
          </div>

          {/* Popular Corridors Quick Filter */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 block mb-2">
              {lang === 'ar' ? 'أكثر المسارات العربية طلباً:' : 'Popular Arab Corridors:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {popularCorridors.map((c) => (
                <button
                  key={`${c.origin}-${c.dest}`}
                  onClick={() => {
                    setOriginCode(c.origin);
                    setDestCode(c.dest);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                    originCode === c.origin && destCode === c.dest
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Expandable Route Modifier (Covering all 22 Arab countries) */}
          {isModifyOpen && (
            <form onSubmit={handleApplyNewRoute} className="pt-6 border-t border-slate-200 space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                
                {/* Origin Selector (22 Arab Countries) */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    {lang === 'ar' ? 'مطار المغادرة (22 دولة عربية):' : 'Origin Airport:'}
                  </label>
                  <select
                    value={originCode}
                    onChange={(e) => setOriginCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white text-slate-800 focus:outline-none focus:border-brand-sky"
                  >
                    {ARAB_COUNTRIES.map((country) => (
                      <optgroup key={country.id} label={`${country.flagEmoji} ${lang === 'ar' ? country.nameAr : country.nameEn}`}>
                        {country.airports.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.code} - {lang === 'ar' ? airport.cityAr : airport.cityEn} ({lang === 'ar' ? airport.nameAr : airport.nameEn})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Destination Selector (22 Arab Countries) */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    {lang === 'ar' ? 'مطار الوصول (22 دولة عربية):' : 'Destination Airport:'}
                  </label>
                  <select
                    value={destCode}
                    onChange={(e) => setDestCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white text-slate-800 focus:outline-none focus:border-brand-sky"
                  >
                    {ARAB_COUNTRIES.map((country) => (
                      <optgroup key={country.id} label={`${country.flagEmoji} ${lang === 'ar' ? country.nameAr : country.nameEn}`}>
                        {country.airports.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.code} - {lang === 'ar' ? airport.cityAr : airport.cityEn} ({lang === 'ar' ? airport.nameAr : airport.nameEn})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    {lang === 'ar' ? 'تاريخ المغادرة:' : 'Departure Date:'}
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white text-slate-800 focus:outline-none focus:border-brand-sky"
                  />
                </div>

                {/* Cabin Class */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    {lang === 'ar' ? 'فئة المقصورة:' : 'Cabin Class:'}
                  </label>
                  <select
                    value={cabinClass}
                    onChange={(e: any) => setCabinClass(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white text-slate-800 focus:outline-none focus:border-brand-sky"
                  >
                    <option value="economy">{lang === 'ar' ? 'الدرجة السياحية (Economy)' : 'Economy'}</option>
                    <option value="business">{lang === 'ar' ? 'درجة رجال الأعمال (Business)' : 'Business'}</option>
                    <option value="first">{lang === 'ar' ? 'الدرجة الأولى (First)' : 'First'}</option>
                  </select>
                </div>

              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs btn-glow flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تحديث نتائج الرحلات الآن' : 'Update Search Results'}</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Demo Mode Notice */}
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 text-xs flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {lang === 'ar'
              ? 'تنبيه الشفافية: محرك البحث يعمل بنظام محاكاة شبكة الطيران العربي المتكامل عبر كافة مطارات الدول العربية الـ22. عند التوصيل المباشر بأنظمة GDS (Amadeus / Sabre)، تظهر التذاكر المؤكدة فورياً مع المقاعد المتاحة.'
              : 'Transparency notice: Interactive simulation actively covers airports across all 22 Arab League nations. Seamless GDS production connector attaches in deployment phase.'}
          </p>
        </div>

        {/* Results Layout: Filters Sidebar + Flight Cards List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-brand-navy flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-sky" />
                  <span>{lang === 'ar' ? 'تصفية النتائج' : 'Filter Flights'}</span>
                </span>
                <button
                  onClick={() => { setSelectedAirlineFilter('all'); setSelectedStopsFilter('all'); }}
                  className="text-xs text-brand-sky hover:underline font-semibold"
                >
                  {lang === 'ar' ? 'إعادة ضبط' : 'Reset'}
                </button>
              </div>

              {/* Airlines Filter */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">
                  {lang === 'ar' ? 'شركة الطيران' : 'Airlines'}
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'all', label: lang === 'ar' ? 'جميع الشركات' : 'All Airlines' },
                    { id: 'مصر للطيران', label: 'مصر للطيران (EgyptAir)' },
                    { id: 'السعودية', label: 'الخطوط السعودية (Saudia)' },
                    { id: 'طيران ناس', label: 'طيران ناس (Flynas)' },
                    { id: 'الإمارات', label: 'طيران الإمارات (Emirates)' },
                    { id: 'القطرية', label: 'الخطوط القطرية (Qatar Airways)' },
                    { id: 'الكويتية', label: 'الخطوط الكويتية (Kuwait Airways)' },
                    { id: 'الأردنية', label: 'الملكية الأردنية (Royal Jordanian)' }
                  ].map((airline) => (
                    <label key={airline.id} className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input
                        type="radio"
                        name="airlineFilter"
                        value={airline.id}
                        checked={selectedAirlineFilter === airline.id}
                        onChange={() => setSelectedAirlineFilter(airline.id)}
                        className="text-brand-sky focus:ring-brand-sky"
                      />
                      <span>{airline.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stops Filter */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">
                  {lang === 'ar' ? 'محطات التوقف' : 'Stops'}
                </label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="radio"
                      name="stopsFilter"
                      value="all"
                      checked={selectedStopsFilter === 'all'}
                      onChange={() => setSelectedStopsFilter('all')}
                      className="text-brand-sky focus:ring-brand-sky"
                    />
                    <span>{lang === 'ar' ? 'الكل' : 'All'}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="radio"
                      name="stopsFilter"
                      value="direct"
                      checked={selectedStopsFilter === 'direct'}
                      onChange={() => setSelectedStopsFilter('direct')}
                      className="text-brand-sky focus:ring-brand-sky"
                    />
                    <span>{lang === 'ar' ? 'رحلات مباشرة فقط' : 'Direct Only'}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="radio"
                      name="stopsFilter"
                      value="one-stop"
                      checked={selectedStopsFilter === 'one-stop'}
                      onChange={() => setSelectedStopsFilter('one-stop')}
                      className="text-brand-sky focus:ring-brand-sky"
                    />
                    <span>{lang === 'ar' ? 'توقف واحد (ترانزيت)' : '1 Stop (Transit)'}</span>
                  </label>
                </div>
              </div>

              {/* Sorting */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">
                  {lang === 'ar' ? 'الترتيب حسب' : 'Sort By'}
                </label>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50 font-medium focus:outline-none"
                >
                  <option value="price">{lang === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Lowest first'}</option>
                  <option value="duration">{lang === 'ar' ? 'المدة: الأسرع' : 'Duration: Shortest'}</option>
                  <option value="departure">{lang === 'ar' ? 'وقت المغادرة' : 'Departure time'}</option>
                </select>
              </div>

            </div>
          </div>

          {/* Flight Cards List */}
          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-44 bg-white rounded-2xl animate-pulse border border-slate-200 p-6" />
                ))}
              </div>
            ) : filteredFlights.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <Plane className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-brand-navy">
                  {lang === 'ar' ? 'لا توجد رحلات مطابقة لمعايير التصفية' : 'No flights matched your filter'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'ar' ? 'جرب تعديل خيارات التصفية أو اختيار شركة طيران أخرى.' : 'Try adjusting your filters or resetting.'}
                </p>
              </div>
            ) : (
              filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-sky/50 hover:shadow-soft-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Airline & Timing */}
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between md:justify-start gap-4">
                      <span className="text-sm font-bold text-brand-navy">
                        {flight.airline}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                        {flight.flightNumber}
                      </span>
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        {flight.aircraft}
                      </span>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Departure */}
                      <div>
                        <div className="text-xl font-black text-slate-900 font-mono">
                          {flight.departureTime}
                        </div>
                        <div className="text-xs font-bold text-slate-500">
                          {flight.originCode}
                        </div>
                      </div>

                      {/* Flight Path visual */}
                      <div className="flex-1 max-w-xs flex flex-col items-center">
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{flight.duration}</span>
                        </span>
                        
                        <div className="w-full flex items-center gap-2 my-1">
                          <div className="h-0.5 bg-slate-300 flex-1 relative">
                            {flight.stops === 1 && (
                              <div className="w-2 h-2 rounded-full bg-amber-500 absolute left-1/2 -top-[3px] transform -translate-x-1/2" />
                            )}
                          </div>
                          <Plane className="w-4 h-4 text-brand-sky transform -rotate-45 shrink-0" />
                          <div className="h-0.5 bg-slate-300 flex-1" />
                        </div>

                        <span className="text-[11px] font-bold text-emerald-600">
                          {flight.stops === 0 ? (lang === 'ar' ? 'مباشرة بدون توقف' : 'Direct Flight') : (lang === 'ar' ? `توقف واحد (${flight.stopoverCities?.join(', ')})` : `1 Stop (${flight.stopoverCities?.join(', ')})`)}
                        </span>
                      </div>

                      {/* Arrival */}
                      <div>
                        <div className="text-xl font-black text-slate-900 font-mono">
                          {flight.arrivalTime}
                        </div>
                        <div className="text-xs font-bold text-slate-500">
                          {flight.destinationCode}
                        </div>
                      </div>
                    </div>

                    {/* Baggage Specs */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Luggage className="w-3.5 h-3.5 text-brand-sky" />
                        <span>{lang === 'ar' ? `الأمتعة المفحوصة: ${flight.baggageKg} كجم` : `Checked: ${flight.baggageKg} kg`}</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span>{lang === 'ar' ? `حقيبة المقصورة: ${flight.cabinBaggageKg} كجم` : `Cabin: ${flight.cabinBaggageKg} kg`}</span>
                    </div>
                  </div>

                  {/* Price & Book CTA */}
                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-s border-slate-100 pt-4 md:pt-0 md:ps-6 shrink-0">
                    <div className="text-start md:text-end">
                      <span className="text-[11px] text-slate-400 block">
                        {lang === 'ar' ? 'السعر التقديري للمسافر' : 'Estimated Fare / Person'}
                      </span>
                      <div className="text-2xl font-black text-brand-navy">
                        {flight.priceAmount} <span className="text-xs font-bold text-slate-600">{flight.currency}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedFlightForBooking(flight)}
                      className="mt-3 px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs btn-glow flex items-center gap-2 shadow-sm"
                    >
                      <span>{lang === 'ar' ? 'طلب حجز التذكرة' : 'Request Booking'}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </main>

      {/* Booking Details Modal */}
      {selectedFlightForBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => { setSelectedFlightForBooking(null); setBookingSuccess(null); }}
              className="absolute top-5 end-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-brand-navy">
                  {lang === 'ar' ? 'تم تسجيل طلب الحجز بنجاح!' : 'Booking Request Confirmed!'}
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {lang === 'ar'
                    ? `رقم طلبك المرجعي هو ${bookingSuccess}. يمكنك مراجعة حالة حجزك وتفاصيل التذكرة فوراً من لوحة تحكم حسابك.`
                    : `Your booking reference code is ${bookingSuccess}. You can monitor its status right now in your dashboard.`}
                </p>

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-sm"
                  >
                    {lang === 'ar' ? 'الانتقال إلى لوحة تحكم طلباتي' : 'Go to My Dashboard'}
                  </button>
                  <button
                    onClick={() => { setSelectedFlightForBooking(null); setBookingSuccess(null); }}
                    className="w-full py-2.5 text-xs text-slate-500 font-semibold hover:underline"
                  >
                    {lang === 'ar' ? 'إغلاق ومتابعة البحث' : 'Close and Continue'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-brand-sky uppercase">
                    {lang === 'ar' ? 'بيانات المسافر والحجز' : 'Passenger Information'}
                  </span>
                  <h3 className="text-xl font-black text-brand-navy">
                    {selectedFlightForBooking.airline} ({selectedFlightForBooking.flightNumber})
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedFlightForBooking.originCity} ➔ {selectedFlightForBooking.destinationCity} • {selectedFlightForBooking.departureTime}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">{lang === 'ar' ? 'قيمة الحجز التقديرية:' : 'Estimated Total:'}</span>
                  <span className="text-base font-black text-brand-navy">
                    {selectedFlightForBooking.priceAmount} {selectedFlightForBooking.currency}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {lang === 'ar' ? 'الاسم الكامل كما في جواز السفر:' : 'Full Name (as in Passport):'}
                    </label>
                    <input
                      type="text"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-brand-sky"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        {lang === 'ar' ? 'رقم الهاتف / واتساب:' : 'Phone Number:'}
                      </label>
                      <input
                        type="text"
                        value={passengerPhone}
                        onChange={(e) => setPassengerPhone(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-brand-sky"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        {lang === 'ar' ? 'رقم جواز السفر:' : 'Passport Number:'}
                      </label>
                      <input
                        type="text"
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-brand-sky uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {lang === 'ar' ? 'البريد الإلكتروني لاستلام التذكرة:' : 'Email Address:'}
                    </label>
                    <input
                      type="email"
                      value={passengerEmail}
                      onChange={(e) => setPassengerEmail(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-brand-sky"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {lang === 'ar'
                    ? 'سيتم تدقيق الحجز والتواصل معك لتأكيد إصدار التذكرة وخيارات السداد دون أي رسوم مخفية.'
                    : 'Your booking will be queued for confirmation and ticketing with authorized airline partners.'}
                </p>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-sm btn-glow transition shadow-lg"
                >
                  {lang === 'ar' ? 'تأكيد وإرسال طلب الحجز' : 'Confirm & Submit Booking'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
