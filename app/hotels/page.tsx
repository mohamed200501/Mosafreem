'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Building2, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Sparkles,
  Wifi,
  Coffee,
  X,
  ArrowRight,
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { Hotel, HotelReservationRequest } from '@/lib/types';
import { INITIAL_HOTELS, INITIAL_HOTEL_REQUESTS, getStoredData, saveStoredData } from '@/lib/store';
import { ARAB_COUNTRIES } from '@/lib/arabCountries';

export default function HotelsPage() {
  const { lang, t } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // Reservation form state
  const [guestName, setGuestName] = useState('أحمد مصطفى الشامي');
  const [guestPhone, setGuestPhone] = useState('+20 100 234 5678');
  const [guestEmail, setGuestEmail] = useState('ahmed.elshamy@example.com');
  const [checkIn, setCheckIn] = useState('2026-11-16');
  const [checkOut, setCheckOut] = useState('2026-11-20');
  const [roomType, setRoomType] = useState('Deluxe Suite with Breakfast');
  const [roomsCount, setRoomsCount] = useState(1);
  const [adultsCount, setAdultsCount] = useState(2);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  const hotels = INITIAL_HOTELS;

  // Filter logic
  const filteredHotels = hotels.filter((h) => {
    // Country filter
    if (selectedCountryFilter !== 'all') {
      const matchCountry = h.country.toLowerCase().includes(selectedCountryFilter.toLowerCase()) || 
                           h.countryAr.includes(selectedCountryFilter);
      if (!matchCountry) return false;
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match = h.name.toLowerCase().includes(q) ||
                    h.nameAr.includes(q) ||
                    h.city.toLowerCase().includes(q) ||
                    h.cityAr.includes(q) ||
                    h.country.toLowerCase().includes(q) ||
                    h.countryAr.includes(q);
      if (!match) return false;
    }

    return true;
  });

  const handleBookHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotel) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `MSF-HTL-${randomNum}`;

    const newReservation: HotelReservationRequest = {
      id: `htl_req_${Date.now()}`,
      referenceNumber: ref,
      hotelId: selectedHotel.id,
      hotelName: lang === 'ar' ? selectedHotel.nameAr : selectedHotel.name,
      city: lang === 'ar' ? selectedHotel.cityAr : selectedHotel.city,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      rooms: roomsCount,
      adults: adultsCount,
      children: 0,
      roomType,
      guestName,
      guestPhone,
      guestEmail,
      status: 'submitted',
      quotedAmount: selectedHotel.pricePerNight * 4 * roomsCount,
      currency: selectedHotel.currency,
      adminNotes: `طلب حجز فندقي تم تسجيله عبر البوابة (${selectedHotel.nameAr} - ${selectedHotel.cityAr}). جاري تأكيد توافر الغرفة مع إدارة الفندق.`,
      createdAt: new Date().toISOString()
    };

    const existing = getStoredData<HotelReservationRequest[]>('hotel_requests', INITIAL_HOTEL_REQUESTS);
    saveStoredData('hotel_requests', [newReservation, ...existing]);

    setConfirmedRef(ref);
  };

  const destinationPills = [
    { id: 'all', label: lang === 'ar' ? 'جميع الوجهات العربية' : 'All Arab Destinations' },
    { id: 'Egypt', label: lang === 'ar' ? '🇪🇬 مصر' : '🇪🇬 Egypt' },
    { id: 'Saudi', label: lang === 'ar' ? '🇸🇦 السعودية' : '🇸🇦 Saudi Arabia' },
    { id: 'UAE', label: lang === 'ar' ? '🇦🇪 الإمارات' : '🇦🇪 UAE' },
    { id: 'Qatar', label: lang === 'ar' ? '🇶🇦 قطر' : '🇶🇦 Qatar' },
    { id: 'Kuwait', label: lang === 'ar' ? '🇰🇼 الكويت' : '🇰🇼 Kuwait' },
    { id: 'Jordan', label: lang === 'ar' ? '🇯🇴 الأردن' : '🇯🇴 Jordan' },
    { id: 'Bahrain', label: lang === 'ar' ? '🇧🇭 البحرين' : '🇧🇭 Bahrain' },
    { id: 'Oman', label: lang === 'ar' ? '🇴🇲 عُمان' : '🇴🇲 Oman' },
    { id: 'Morocco', label: lang === 'ar' ? '🇲🇦 المغرب' : '🇲🇦 Morocco' },
    { id: 'Lebanon', label: lang === 'ar' ? '🇱🇧 لبنان' : '🇱🇧 Lebanon' },
    { id: 'Iraq', label: lang === 'ar' ? '🇮🇶 العراق' : '🇮🇶 Iraq' },
    { id: 'Tunisia', label: lang === 'ar' ? '🇹🇳 تونس' : '🇹🇳 Tunisia' },
    { id: 'Algeria', label: lang === 'ar' ? '🇩🇿 الجزائر' : '🇩🇿 Algeria' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-brand-turquoise uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إقامات وفنادق فاخرة عبر العالم العربي' : 'Luxury Stays Across the Arab World'}</span>
              </span>
              <h1 className="text-3xl font-black text-brand-navy">
                {lang === 'ar' ? 'فنادق ومنتجعات مختارة بعناية للمسافرين' : 'Hand-Picked Properties for Discerning Travelers'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                {lang === 'ar'
                  ? 'خيارات إقامة راقية في عواصم ومدن العالم العربي (القاهرة، الرياض، دبي، الدوحة، الكويت، عمّان، المنامة، مسقط، مراكش، بيروت، وبغداد) بأسعار تفضيلية وضمان خدمة VIP.'
                  : 'Curated luxury accommodations across Arab capitals with exclusive corporate rates and concierge support.'}
              </p>
            </div>

            {/* Quick Search Input */}
            <div className="w-full md:w-80 relative">
              <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث باسم الفندق أو المدينة...' : 'Search by hotel or city...'}
                className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-brand-turquoise bg-slate-50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Destination Filter Pills */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            {destinationPills.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedCountryFilter(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  selectedCountryFilter === item.id
                    ? 'bg-brand-turquoise text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        {filteredHotels.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4">
            <Compass className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold text-brand-navy">
              {lang === 'ar' ? 'لم يتم العثور على فنادق مطابقة' : 'No properties matched your search'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {lang === 'ar' ? 'جرب البحث بمدينة أخرى أو اختر "جميع الوجهات العربية" لعرض القائمة الكاملة.' : 'Try searching another city or reset your filter.'}
            </p>
            <button
              onClick={() => { setSelectedCountryFilter('all'); setSearchQuery(''); }}
              className="px-5 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold"
            >
              {lang === 'ar' ? 'عرض جميع الفنادق' : 'Show All Hotels'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map(hotel => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-turquoise/40 hover:shadow-soft-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 start-4 bg-brand-navy/85 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-white/20">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{hotel.rating}</span>
                      <span className="text-slate-400 text-[10px]">({hotel.reviewCount})</span>
                    </div>

                    <div className="absolute bottom-4 start-4 bg-white/95 backdrop-blur-md text-slate-900 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow">
                      <MapPin className="w-3.5 h-3.5 text-brand-turquoise" />
                      <span>{lang === 'ar' ? hotel.cityAr : hotel.city} • {lang === 'ar' ? hotel.countryAr : hotel.country}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-turquoise transition-colors">
                        {lang === 'ar' ? hotel.nameAr : hotel.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {lang === 'ar' ? hotel.descriptionAr : hotel.descriptionEn}
                      </p>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      {lang === 'ar' ? 'ابتداءً من لليلة' : 'From / Night'}
                    </span>
                    <div className="text-xl font-black text-brand-navy">
                      ${hotel.pricePerNight} <span className="text-xs font-bold text-slate-500">{hotel.currency}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setSelectedHotel(hotel); setConfirmedRef(null); }}
                    className="px-5 py-2.5 rounded-xl bg-brand-turquoise hover:bg-teal-700 text-white font-bold text-xs btn-glow flex items-center gap-2"
                  >
                    <span>{lang === 'ar' ? 'طلب الحجز' : 'Reserve'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Reservation Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => { setSelectedHotel(null); setConfirmedRef(null); }}
              className="absolute top-5 end-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            {confirmedRef ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-brand-navy">
                  {lang === 'ar' ? 'تم استلام طلب الحجز الفندقي!' : 'Reservation Request Logged!'}
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {lang === 'ar'
                    ? `رقم الحجز المرجعي: ${confirmedRef}. سيقوم فريق الحجوزات بتأكيد تفاصيل الغرفة وإرسال قسيمة الفندق (Voucher) إلى لوحة تحكم حسابك فوراً.`
                    : `Reservation reference: ${confirmedRef}. Our team is verifying room availability and hotel voucher.`}
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => { setSelectedHotel(null); window.location.href = '/dashboard'; }}
                    className="w-full py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold"
                  >
                    {lang === 'ar' ? 'الانتقال إلى لوحة تحكم طلباتي' : 'Go to My Dashboard'}
                  </button>
                  <button
                    onClick={() => { setSelectedHotel(null); setConfirmedRef(null); }}
                    className="w-full py-2.5 text-xs text-slate-500 font-semibold hover:underline"
                  >
                    {lang === 'ar' ? 'إغلاق ومتابعة الاستعراض' : 'Close and Browse'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookHotel} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-brand-turquoise uppercase">
                    {lang === 'ar' ? 'تفاصيل الإقامة الفندقية' : 'Hotel Reservation'}
                  </span>
                  <h3 className="text-xl font-black text-brand-navy">
                    {lang === 'ar' ? selectedHotel.nameAr : selectedHotel.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'ar' ? selectedHotel.cityAr : selectedHotel.city} • {lang === 'ar' ? selectedHotel.countryAr : selectedHotel.country}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-600">{lang === 'ar' ? 'السعر المقدر لـ 4 ليالٍ:' : 'Estimated 4 Nights Total:'}</span>
                  <span className="text-base font-black text-brand-navy">
                    ${selectedHotel.pricePerNight * 4 * roomsCount} {selectedHotel.currency}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {lang === 'ar' ? 'تاريخ الوصول (Check-in):' : 'Check-in:'}
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-brand-turquoise"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {lang === 'ar' ? 'تاريخ المغادرة (Check-out):' : 'Check-out:'}
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-brand-turquoise"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {lang === 'ar' ? 'عدد الغرف:' : 'Rooms:'}
                    </label>
                    <select
                      value={roomsCount}
                      onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold bg-white"
                    >
                      <option value={1}>1 غرفة</option>
                      <option value={2}>2 غرف</option>
                      <option value={3}>3 غرف</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {lang === 'ar' ? 'عدد النزلاء البالغين:' : 'Adults:'}
                    </label>
                    <select
                      value={adultsCount}
                      onChange={(e) => setAdultsCount(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold bg-white"
                    >
                      <option value={1}>1 نـزيل</option>
                      <option value={2}>2 نـزلاء</option>
                      <option value={3}>3 نـزلاء</option>
                      <option value={4}>4 نـزلاء</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'ar' ? 'اسم النزيل الأساسي:' : 'Lead Guest Name:'}
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {lang === 'ar' ? 'رقم الهاتف:' : 'Phone:'}
                    </label>
                    <input
                      type="text"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {lang === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'ar' ? 'نوع الغرفة المفضل:' : 'Room Type:'}
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold bg-white"
                  >
                    <option value="Deluxe Suite with Breakfast">جناح ديلوكس مع إفطار مجاني (Deluxe Suite)</option>
                    <option value="Executive Room City View">غرفة رجال أعمال بإطلالة على المدينة (Executive Room)</option>
                    <option value="Standard Room King Bed">غرفة كينج قياسية (Standard King)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-turquoise hover:bg-teal-700 text-white font-bold text-xs btn-glow mt-4 shadow-lg"
                >
                  {lang === 'ar' ? 'إرسال طلب الحجز الفندقي' : 'Confirm Hotel Reservation'}
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
