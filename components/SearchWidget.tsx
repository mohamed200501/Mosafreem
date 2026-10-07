'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Plane, 
  Building2, 
  Package, 
  Car, 
  Calendar, 
  Users, 
  MapPin, 
  ArrowRightLeft, 
  Weight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { 
  FlightSearchQuery, 
  CargoRequest, 
  HotelReservationRequest, 
  AirportTransferRequest 
} from '@/lib/types';
import { 
  INITIAL_CARGO_REQUESTS, 
  INITIAL_HOTEL_REQUESTS, 
  INITIAL_TRANSFER_REQUESTS, 
  getStoredData, 
  saveStoredData 
} from '@/lib/store';
import { ARAB_COUNTRIES, ALL_ARAB_AIRPORTS } from '@/lib/arabCountries';

export const SearchWidget: React.FC = () => {
  const { lang, t } = useLanguage();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'cargo' | 'transfers'>('flights');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 1. Flight Form State
  const [flightTripType, setFlightTripType] = useState<'round-trip' | 'one-way' | 'multi-city'>('round-trip');
  const [flightOrigin, setFlightOrigin] = useState('CAI');
  const [flightDestination, setFlightDestination] = useState('RUH');
  const [flightDepartDate, setFlightDepartDate] = useState('2026-11-15');
  const [flightReturnDate, setFlightReturnDate] = useState('2026-11-28');
  const [flightAdults, setFlightAdults] = useState(1);
  const [flightChildren, setFlightChildren] = useState(0);
  const [flightCabin, setFlightCabin] = useState<'economy' | 'premium_economy' | 'business' | 'first'>('economy');

  // 2. Hotel Form State
  const [hotelCity, setHotelCity] = useState('Riyadh');
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-11-16');
  const [hotelCheckOut, setHotelCheckOut] = useState('2026-11-20');
  const [hotelRooms, setHotelRooms] = useState(1);
  const [hotelGuests, setHotelGuests] = useState(2);

  // 3. Cargo Form State
  const [cargoOriginCountry, setCargoOriginCountry] = useState('مصر (Egypt)');
  const [cargoOriginCity, setCargoOriginCity] = useState('القاهرة (Cairo)');
  const [cargoDestCountry, setCargoDestCountry] = useState('المملكة العربية السعودية (Saudi Arabia)');
  const [cargoDestCity, setCargoDestCity] = useState('الرياض (Riyadh)');
  const [cargoShipmentType, setCargoShipmentType] = useState<'excess_baggage' | 'personal_parcels' | 'commercial_cargo'>('excess_baggage');
  const [cargoWeight, setCargoWeight] = useState(35);
  const [cargoLength, setCargoLength] = useState(70);
  const [cargoWidth, setCargoWidth] = useState(45);
  const [cargoHeight, setCargoHeight] = useState(35);
  const [cargoDescription, setCargoDescription] = useState('حقائب أمتعة شخصية وملابس وهدايا عائلية');
  const [cargoDate, setCargoDate] = useState('2026-11-10');
  const [cargoSenderName, setCargoSenderName] = useState('أحمد مصطفى الشامي');
  const [cargoSenderPhone, setCargoSenderPhone] = useState('+20 100 234 5678');
  const [cargoSenderEmail, setCargoSenderEmail] = useState('ahmed.elshamy@example.com');

  // 4. Transfer Form State
  const [transferPickup, setTransferPickup] = useState('مطار القاهرة الدولي (CAI)');
  const [transferDropoff, setTransferDropoff] = useState('فندق فور سيزونز نايل بلازا');
  const [transferDate, setTransferDate] = useState('2026-11-15');
  const [transferTime, setTransferTime] = useState('14:30');
  const [transferPassengers, setTransferPassengers] = useState(2);
  const [transferLuggage, setTransferLuggage] = useState(3);
  const [transferVehicle, setTransferVehicle] = useState<'sedan' | 'business' | 'van' | 'vip'>('business');

  // Popular Airports/Cities dictionary
  const airports = [
    { code: 'CAI', cityAr: 'القاهرة الدولي (CAI)', cityEn: 'Cairo Intl (CAI)' },
    { code: 'RUH', cityAr: 'الرياض - الملك خالد (RUH)', cityEn: 'Riyadh - King Khalid (RUH)' },
    { code: 'JED', cityAr: 'جدة - الملك عبد العزيز (JED)', cityEn: 'Jeddah - King Abdulaziz (JED)' },
    { code: 'DXB', cityAr: 'دبي الدولي (DXB)', cityEn: 'Dubai Intl (DXB)' },
    { code: 'DOH', cityAr: 'الدوحة - حمد الدولي (DOH)', cityEn: 'Doha - Hamad Intl (DOH)' },
    { code: 'KWI', cityAr: 'الكويت الدولي (KWI)', cityEn: 'Kuwait Intl (KWI)' },
    { code: 'LHR', cityAr: 'لندن هيثرو (LHR)', cityEn: 'London Heathrow (LHR)' },
    { code: 'IST', cityAr: 'إسطنبول الدولي (IST)', cityEn: 'Istanbul Airport (IST)' },
  ];

  // Submit Handlers
  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      tripType: flightTripType,
      origin: flightOrigin,
      destination: flightDestination,
      departureDate: flightDepartDate,
      returnDate: flightTripType === 'round-trip' ? flightReturnDate : '',
      adults: flightAdults.toString(),
      cabinClass: flightCabin
    });
    router.push(`/flights?${queryParams.toString()}`);
  };

  const handleCargoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const refNum = `MSF-CRG-${randomCode}`;

    const newCargo: CargoRequest = {
      id: `crg_${Date.now()}`,
      referenceNumber: refNum,
      senderName: cargoSenderName,
      senderPhone: cargoSenderPhone,
      senderEmail: cargoSenderEmail,
      originCountry: cargoOriginCountry,
      originCity: cargoOriginCity,
      destCountry: cargoDestCountry,
      destCity: cargoDestCity,
      shipmentType: cargoShipmentType,
      weightKg: cargoWeight,
      dimensions: { length: cargoLength, width: cargoWidth, height: cargoHeight },
      description: cargoDescription,
      preferredDate: cargoDate,
      status: 'submitted',
      currency: 'SAR',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const existing = getStoredData<CargoRequest[]>('cargo_requests', INITIAL_CARGO_REQUESTS);
    saveStoredData('cargo_requests', [newCargo, ...existing]);

    setSuccessMessage(
      lang === 'ar' 
        ? `تم استلام طلب الشحن برقم مرجعي: ${refNum}. يمكنك متابعته من حسابك الآن.`
        : `Cargo quotation request received (#${refNum}). You can track it in your dashboard.`
    );
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const refNum = `MSF-TRF-${randomCode}`;

    const newTransfer: AirportTransferRequest = {
      id: `trf_${Date.now()}`,
      referenceNumber: refNum,
      pickupLocation: transferPickup,
      destination: transferDropoff,
      isAirportPickup: true,
      date: transferDate,
      time: transferTime,
      passengers: transferPassengers,
      luggageCount: transferLuggage,
      vehicleType: transferVehicle,
      customerName: 'أحمد مصطفى الشامي',
      customerPhone: '+20 100 234 5678',
      customerEmail: 'ahmed.elshamy@example.com',
      status: 'submitted',
      currency: 'SAR',
      createdAt: new Date().toISOString()
    };

    const existing = getStoredData<AirportTransferRequest[]>('transfer_requests', INITIAL_TRANSFER_REQUESTS);
    saveStoredData('transfer_requests', [newTransfer, ...existing]);

    setSuccessMessage(
      lang === 'ar'
        ? `تم تسجيل طلب توصيل المطار بنجاح برقم: ${refNum}.`
        : `Airport transfer request booked successfully (#${refNum}).`
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto -mt-16 sm:-mt-24 relative z-30 px-4">
      <div className="bg-white rounded-2xl shadow-soft-xl border border-slate-200/90 overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { setActiveTab('flights'); setSuccessMessage(null); }}
            className={`flex items-center gap-2.5 px-6 py-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'flights'
                ? 'border-brand-sky text-brand-navy bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
            }`}
          >
            <Plane className={`w-4 h-4 ${activeTab === 'flights' ? 'text-brand-sky' : 'text-slate-400'}`} />
            <span>{t.searchTabs.flights}</span>
          </button>

          <button
            onClick={() => { setActiveTab('cargo'); setSuccessMessage(null); }}
            className={`flex items-center gap-2.5 px-6 py-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'cargo'
                ? 'border-brand-gold text-brand-navy bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
            }`}
          >
            <Package className={`w-4 h-4 ${activeTab === 'cargo' ? 'text-brand-gold' : 'text-slate-400'}`} />
            <span className="flex items-center gap-1.5">
              <span>{t.searchTabs.cargo}</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {lang === 'ar' ? 'مميز للأهل' : 'Special'}
              </span>
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('hotels'); setSuccessMessage(null); }}
            className={`flex items-center gap-2.5 px-6 py-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'hotels'
                ? 'border-brand-turquoise text-brand-navy bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
            }`}
          >
            <Building2 className={`w-4 h-4 ${activeTab === 'hotels' ? 'text-brand-turquoise' : 'text-slate-400'}`} />
            <span>{t.searchTabs.hotels}</span>
          </button>

          <button
            onClick={() => { setActiveTab('transfers'); setSuccessMessage(null); }}
            className={`flex items-center gap-2.5 px-6 py-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'transfers'
                ? 'border-brand-navy text-brand-navy bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
            }`}
          >
            <Car className={`w-4 h-4 ${activeTab === 'transfers' ? 'text-brand-navy' : 'text-slate-400'}`} />
            <span>{t.searchTabs.transfers}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 md:p-8">
          
          {/* Success Banner */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-sm font-semibold">{successMessage}</span>
              </div>
              <button 
                onClick={() => router.push('/dashboard')}
                className="text-xs bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition"
              >
                {lang === 'ar' ? 'عرض في لوحة التحكم' : 'View in Dashboard'}
              </button>
            </div>
          )}

          {/* =========================================================================
              TAB 1: FLIGHTS SEARCH
             ========================================================================= */}
          {activeTab === 'flights' && (
            <form onSubmit={handleFlightSearch} className="space-y-6">
              {/* Trip Type & Cabin Class Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm pb-2 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  {(['round-trip', 'one-way', 'multi-city'] as const).map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="radio"
                        name="tripType"
                        value={type}
                        checked={flightTripType === type}
                        onChange={() => setFlightTripType(type)}
                        className="text-brand-sky focus:ring-brand-sky w-4 h-4"
                      />
                      <span>
                        {type === 'round-trip' ? t.flightForm.roundTrip : type === 'one-way' ? t.flightForm.oneWay : t.flightForm.multiCity}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-semibold">{t.flightForm.cabinClass}:</span>
                  <select
                    value={flightCabin}
                    onChange={(e: any) => setFlightCabin(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-brand-sky"
                  >
                    <option value="economy">{t.flightForm.economy}</option>
                    <option value="premium_economy">{t.flightForm.premiumEconomy}</option>
                    <option value="business">{t.flightForm.business}</option>
                    <option value="first">{t.flightForm.first}</option>
                  </select>
                </div>
              </div>

              {/* Main Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Origin */}
                <div className="bg-slate-50 hover:bg-slate-100/70 transition p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <label className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-sky" />
                    <span>{t.flightForm.from}</span>
                  </label>
                  <select
                    value={flightOrigin}
                    onChange={(e) => setFlightOrigin(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 text-xs sm:text-sm focus:outline-none cursor-pointer"
                  >
                    <optgroup label={lang === 'ar' ? '🇪🇬 مطارات مصر' : '🇪🇬 Egypt Airports'}>
                      <option value="CAI">القاهرة الدولي (CAI)</option>
                      <option value="HBE">الإسكندرية - برج العرب (HBE)</option>
                      <option value="SSH">شرم الشيخ الدولي (SSH)</option>
                      <option value="HRG">الغردقة الدولي (HRG)</option>
                    </optgroup>
                    <optgroup label={lang === 'ar' ? '🇸🇦 المملكة العربية السعودية' : '🇸🇦 Saudi Arabia'}>
                      <option value="RUH">الرياض - الملك خالد (RUH)</option>
                      <option value="JED">جدة - الملك عبد العزيز (JED)</option>
                      <option value="DMM">الدمام - الملك فهد (DMM)</option>
                      <option value="MED">المدينة المنورة (MED)</option>
                    </optgroup>
                    <optgroup label={lang === 'ar' ? '🇦🇪 الإمارات العربية المتحدة' : '🇦🇪 United Arab Emirates'}>
                      <option value="DXB">دبي الدولي (DXB)</option>
                      <option value="AUH">أبو ظبي الدولي (AUH)</option>
                      <option value="SHJ">الشارقة الدولي (SHJ)</option>
                    </optgroup>
                    <optgroup label={lang === 'ar' ? 'عواصم ومطارات الدول العربية الـ 22' : 'Arab League Countries'}>
                      {ARAB_COUNTRIES.filter(c => !['egypt', 'saudi_arabia', 'uae'].includes(c.id)).map(c => (
                        <option key={c.airports[0]?.code || c.id} value={c.airports[0]?.code}>
                          {c.flagEmoji} {lang === 'ar' ? `${c.nameAr} - ${c.airports[0]?.nameAr}` : `${c.nameEn} - ${c.airports[0]?.code}`}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label={lang === 'ar' ? 'مطارات دولية شائعة' : 'International Destinations'}>
                      <option value="LHR">لندن هيثرو (LHR)</option>
                      <option value="IST">إسطنبول الدولي (IST)</option>
                      <option value="CDG">باريس شارل ديغول (CDG)</option>
                    </optgroup>
                  </select>
                </div>

                {/* Destination */}
                <div className="bg-slate-50 hover:bg-slate-100/70 transition p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <label className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-sky" />
                    <span>{t.flightForm.to}</span>
                  </label>
                  <select
                    value={flightDestination}
                    onChange={(e) => setFlightDestination(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 text-xs sm:text-sm focus:outline-none cursor-pointer"
                  >
                    <optgroup label={lang === 'ar' ? '🇸🇦 المملكة العربية السعودية' : '🇸🇦 Saudi Arabia'}>
                      <option value="RUH">الرياض - الملك خالد (RUH)</option>
                      <option value="JED">جدة - الملك عبد العزيز (JED)</option>
                      <option value="DMM">الدمام - الملك فهد (DMM)</option>
                      <option value="MED">المدينة المنورة (MED)</option>
                    </optgroup>
                    <optgroup label={lang === 'ar' ? '🇦🇪 الإمارات العربية المتحدة' : '🇦🇪 United Arab Emirates'}>
                      <option value="DXB">دبي الدولي (DXB)</option>
                      <option value="AUH">أبو ظبي الدولي (AUH)</option>
                    </optgroup>
                    <optgroup label={lang === 'ar' ? '🇪🇬 مطارات مصر' : '🇪🇬 Egypt Airports'}>
                      <option value="CAI">القاهرة الدولي (CAI)</option>
                      <option value="HBE">الإسكندرية - برج العرب (HBE)</option>
                      <option value="SSH">شرم الشيخ الدولي (SSH)</option>
                    </optgroup>
                    <optgroup label={lang === 'ar' ? 'عواصم ومطارات الدول العربية الـ 22' : 'Arab League Countries'}>
                      {ARAB_COUNTRIES.filter(c => !['egypt', 'saudi_arabia', 'uae'].includes(c.id)).map(c => (
                        <option key={c.airports[0]?.code || c.id} value={c.airports[0]?.code}>
                          {c.flagEmoji} {lang === 'ar' ? `${c.nameAr} - ${c.airports[0]?.nameAr}` : `${c.nameEn} - ${c.airports[0]?.code}`}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label={lang === 'ar' ? 'مطارات دولية شائعة' : 'International Destinations'}>
                      <option value="LHR">لندن هيثرو (LHR)</option>
                      <option value="IST">إسطنبول الدولي (IST)</option>
                      <option value="CDG">باريس شارل ديغول (CDG)</option>
                    </optgroup>
                  </select>
                </div>

                {/* Departure & Return Dates */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <label className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-sky" />
                    <span>{t.flightForm.departureDate}</span>
                  </label>
                  <input
                    type="date"
                    value={flightDepartDate}
                    onChange={(e) => setFlightDepartDate(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                    required
                  />
                </div>

                {flightTripType === 'round-trip' ? (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <label className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-sky" />
                      <span>{t.flightForm.returnDate}</span>
                    </label>
                    <input
                      type="date"
                      value={flightReturnDate}
                      onChange={(e) => setFlightReturnDate(e.target.value)}
                      className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                      required
                    />
                  </div>
                ) : (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <label className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5 mb-1">
                      <Users className="w-3.5 h-3.5 text-brand-sky" />
                      <span>{t.flightForm.passengers}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={flightAdults}
                        onChange={(e) => setFlightAdults(Number(e.target.value))}
                        className="bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                      >
                        <option value={1}>1 {lang === 'ar' ? 'بالغ' : 'Adult'}</option>
                        <option value={2}>2 {lang === 'ar' ? 'بالغين' : 'Adults'}</option>
                        <option value={3}>3 {lang === 'ar' ? 'بالغين' : 'Adults'}</option>
                        <option value={4}>4+ {lang === 'ar' ? 'مسافرين' : 'Passengers'}</option>
                      </select>
                    </div>
                  </div>
                )}

              </div>

              {/* Submit CTA & Demo Disclosure */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-sky shrink-0" />
                  <span>{t.flightForm.demoNotice}</span>
                </p>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-sm btn-glow flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  <Plane className="w-4 h-4" />
                  <span>{t.flightForm.searchBtn}</span>
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              TAB 2: AIR CARGO & EXCESS BAGGAGE FORM
             ========================================================================= */}
          {activeTab === 'cargo' && (
            <form onSubmit={handleCargoSubmit} className="space-y-6">
              
              {/* Type selector */}
              <div className="flex flex-wrap items-center gap-4 pb-2 border-b border-slate-100 text-sm">
                <span className="text-xs font-bold text-slate-500">{t.cargoForm.shipmentType}:</span>
                {[
                  { id: 'excess_baggage', label: t.cargoForm.excessBaggage },
                  { id: 'personal_parcels', label: t.cargoForm.personalParcels },
                  { id: 'commercial_cargo', label: t.cargoForm.commercialCargo }
                ].map((type) => (
                  <label key={type.id} className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                    <input
                      type="radio"
                      name="cargoType"
                      value={type.id}
                      checked={cargoShipmentType === type.id}
                      onChange={() => setCargoShipmentType(type.id as any)}
                      className="text-brand-gold focus:ring-brand-gold w-4 h-4"
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>

              {/* Origin & Destination & Weight Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.cargoForm.originCountry} & {t.cargoForm.originCity}
                  </label>
                  <input
                    type="text"
                    value={cargoOriginCity}
                    onChange={(e) => setCargoOriginCity(e.target.value)}
                    placeholder="القاهرة (Cairo)"
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                    required
                  />
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.cargoForm.destCountry} & {t.cargoForm.destCity}
                  </label>
                  <input
                    type="text"
                    value={cargoDestCity}
                    onChange={(e) => setCargoDestCity(e.target.value)}
                    placeholder="الرياض (Riyadh)"
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                    required
                  />
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 flex items-center justify-between">
                    <span>{t.cargoForm.weightKg}</span>
                    <span className="text-brand-gold text-[10px] font-bold">~ 14 SAR / كجم</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={5}
                      max={500}
                      value={cargoWeight}
                      onChange={(e) => setCargoWeight(Number(e.target.value))}
                      className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                      required
                    />
                    <span className="text-xs font-bold text-slate-500">KG</span>
                  </div>
                </div>
              </div>

              {/* Description & Sender Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.cargoForm.description}
                  </label>
                  <input
                    type="text"
                    value={cargoDescription}
                    onChange={(e) => setCargoDescription(e.target.value)}
                    className="w-full bg-transparent text-slate-900 text-xs font-semibold focus:outline-none"
                    required
                  />
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.cargoForm.senderName}
                  </label>
                  <input
                    type="text"
                    value={cargoSenderName}
                    onChange={(e) => setCargoSenderName(e.target.value)}
                    className="w-full bg-transparent text-slate-900 text-xs font-semibold focus:outline-none"
                    required
                  />
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.cargoForm.senderPhone}
                  </label>
                  <input
                    type="text"
                    value={cargoSenderPhone}
                    onChange={(e) => setCargoSenderPhone(e.target.value)}
                    className="w-full bg-transparent text-slate-900 text-xs font-semibold focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Footer notes & Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
                  {t.cargoForm.disclaimer}
                </p>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-white font-bold text-sm btn-gold-glow flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  <Package className="w-4 h-4" />
                  <span>{t.cargoForm.requestBtn}</span>
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              TAB 3: HOTELS SEARCH
             ========================================================================= */}
          {activeTab === 'hotels' && (
            <form onSubmit={(e) => { e.preventDefault(); router.push(`/hotels?city=${hotelCity}`); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.hotelForm.destination}
                  </label>
                  <select
                    value={hotelCity}
                    onChange={(e) => setHotelCity(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 text-xs sm:text-sm focus:outline-none cursor-pointer"
                  >
                    <optgroup label={lang === 'ar' ? 'الوجهات الأكثر طلباً' : 'Popular Destinations'}>
                      <option value="Cairo">{lang === 'ar' ? '🇪🇬 القاهرة، مصر' : '🇪🇬 Cairo, Egypt'}</option>
                      <option value="Riyadh">{lang === 'ar' ? '🇸🇦 الرياض، السعودية' : '🇸🇦 Riyadh, Saudi Arabia'}</option>
                      <option value="Dubai">{lang === 'ar' ? '🇦🇪 دبي، الإمارات' : '🇦🇪 Dubai, UAE'}</option>
                      <option value="Jeddah">{lang === 'ar' ? '🇸🇦 جدة، السعودية' : '🇸🇦 Jeddah, Saudi Arabia'}</option>
                      <option value="Doha">{lang === 'ar' ? '🇶🇦 الدوحة، قطر' : '🇶🇦 Doha, Qatar'}</option>
                      <option value="Kuwait City">{lang === 'ar' ? '🇰🇼 الكويت، الكويت' : '🇰🇼 Kuwait City, Kuwait'}</option>
                      <option value="Marrakech">{lang === 'ar' ? '🇲🇦 مراكش، المغرب' : '🇲🇦 Marrakech, Morocco'}</option>
                      <option value="Amman">{lang === 'ar' ? '🇯🇴 عمّان، الأردن' : '🇯🇴 Amman, Jordan'}</option>
                    </optgroup>
                    <optgroup label={lang === 'ar' ? 'كافة عواصم ومدن الدول العربية الـ 22' : 'All 22 Arab Countries'}>
                      {ARAB_COUNTRIES.map(c => (
                        <option key={c.id} value={c.capitalEn}>
                          {c.flagEmoji} {lang === 'ar' ? `${c.capitalAr} (${c.nameAr})` : `${c.capitalEn} (${c.nameEn})`}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.hotelForm.checkIn}
                  </label>
                  <input
                    type="date"
                    value={hotelCheckIn}
                    onChange={(e) => setHotelCheckIn(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                    required
                  />
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.hotelForm.checkOut}
                  </label>
                  <input
                    type="date"
                    value={hotelCheckOut}
                    onChange={(e) => setHotelCheckOut(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                    required
                  />
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.hotelForm.guests} & {t.hotelForm.rooms}
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">{hotelGuests} {lang === 'ar' ? 'نزيل' : 'Guests'}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-sm text-slate-800">{hotelRooms} {lang === 'ar' ? 'غرفة' : 'Room'}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-turquoise hover:bg-brand-turquoise-dark text-white font-bold text-sm btn-glow flex items-center justify-center gap-2 shadow-md"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{t.hotelForm.searchBtn}</span>
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              TAB 4: AIRPORT TRANSFERS FORM
             ========================================================================= */}
          {activeTab === 'transfers' && (
            <form onSubmit={handleTransferSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.transferForm.pickupLocation}
                  </label>
                  <input
                    type="text"
                    value={transferPickup}
                    onChange={(e) => setTransferPickup(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                    required
                  />
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.transferForm.destination}
                  </label>
                  <input
                    type="text"
                    value={transferDropoff}
                    onChange={(e) => setTransferDropoff(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                    required
                  />
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    {t.transferForm.date} & {t.transferForm.time}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={transferDate}
                      onChange={(e) => setTransferDate(e.target.value)}
                      className="w-2/3 bg-transparent font-bold text-xs text-slate-900 focus:outline-none"
                      required
                    />
                    <input
                      type="time"
                      value={transferTime}
                      onChange={(e) => setTransferTime(e.target.value)}
                      className="w-1/3 bg-transparent font-bold text-xs text-slate-900 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1 block">
                    فئة السيارة (Vehicle Tier)
                  </label>
                  <select
                    value={transferVehicle}
                    onChange={(e: any) => setTransferVehicle(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="sedan">سيدان اقتصادية (Sedan)</option>
                    <option value="business">رجال أعمال فاخرة (Executive Business)</option>
                    <option value="van">فان عائلي كبير (Family Van)</option>
                    <option value="vip">مرسيدس VIP مع سائق خاص</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-sm btn-glow flex items-center justify-center gap-2 shadow-md"
                >
                  <Car className="w-4 h-4" />
                  <span>{t.transferForm.requestBtn}</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
