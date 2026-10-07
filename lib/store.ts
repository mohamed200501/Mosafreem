'use client';

import { 
  User, 
  FlightBookingRequest, 
  CargoRequest, 
  Hotel, 
  HotelReservationRequest, 
  AirportTransferRequest, 
  VisaAssistanceRequest, 
  TravelInsuranceRequest,
  NotificationItem,
  AuditLogItem
} from './types';
import { ARAB_COUNTRIES } from './arabCountries';

// Initial Users with Designated Administrator: عثمان المهدي
export const DEMO_USERS: User[] = [
  {
    id: 'usr_customer_1',
    name: 'أحمد مصطفى الشامي | Ahmed M. El-Shamy',
    email: 'ahmed.elshamy@example.com',
    phone: '+20 100 234 5678',
    role: 'customer',
    country: 'مصر (Egypt)'
  },
  {
    id: 'usr_admin_othman',
    name: 'عثمان المهدي | Othman Al-Mahdi',
    email: 'othman.mahdi@masaferin.com',
    phone: '+20 101 999 8888',
    role: 'admin',
    country: 'مصر (Egypt)'
  }
];

// Seed Hotels across Arab Countries
export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'htl_cai_1',
    name: 'Nile Ritz-Carlton Cairo',
    nameAr: 'فندق النيل ريتز كارلتون القاهرة',
    city: 'Cairo',
    cityAr: 'القاهرة',
    country: 'Egypt',
    countryAr: 'مصر',
    stars: 5,
    rating: 4.9,
    reviewCount: 1240,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 280,
    currency: 'USD',
    amenities: ['إطلالة نيلية مباشرة', 'سبا ونادي صحي', 'واي فاي فائق السرعة', 'مسبح أولمبي', 'خدمة نقل المطار VIP'],
    descriptionAr: 'يقع في قلب القاهرة النابض بإطلالات ساحرة على نهر النيل وبرج القاهرة، ملاصق لمتحف التحرير.',
    descriptionEn: 'Located directly on the banks of the River Nile overlooking Cairo Tower, steps from Tahrir Square.'
  },
  {
    id: 'htl_ruh_1',
    name: 'Four Seasons Hotel Riyadh',
    nameAr: 'فندق فور سيزونز الرياض - برج المملكة',
    city: 'Riyadh',
    cityAr: 'الرياض',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    stars: 5,
    rating: 4.8,
    reviewCount: 980,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 420,
    currency: 'USD',
    amenities: ['أعلى برج المملكة', 'مطاعم عالمية راقية', 'مركز أعمال متقدم', 'خدمة كونسيرج 24/7'],
    descriptionAr: 'تجربة إقامة فاخرة ومرموقة في برج المملكة الشهير مع إطلالات بانورامية خلابة على عاصمة المملكة.',
    descriptionEn: 'Iconic luxury towering within Kingdom Centre offering panoramic vistas over the Saudi capital.'
  },
  {
    id: 'htl_dxb_1',
    name: 'Address Downtown Dubai',
    nameAr: 'فندق العنوان وسط مدينة دبي',
    city: 'Dubai',
    cityAr: 'دبي',
    country: 'UAE',
    countryAr: 'الإمارات العربية المتحدة',
    stars: 5,
    rating: 4.9,
    reviewCount: 2150,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 390,
    currency: 'USD',
    amenities: ['إطلالة على برج خليفة والنافورة', 'ممر مباشر لدبي مول', 'مسبح انفينيتي معلق', 'خدمات عائلية خاصة'],
    descriptionAr: 'وجهة استثنائية أمام نافورة دبي الراقصة وبرج خليفة مباشرة، مثالي للعائلات ورجال الأعمال.',
    descriptionEn: 'Stunning property directly facing Burj Khalifa and The Dubai Fountain with instant mall access.'
  },
  {
    id: 'htl_doh_1',
    name: 'The Ritz-Carlton Sharq Village & Spa Doha',
    nameAr: 'فندق قرية الشرق وسبا ريتز كارلتون الدوحة',
    city: 'Doha',
    cityAr: 'الدوحة',
    country: 'Qatar',
    countryAr: 'قطر',
    stars: 5,
    rating: 4.8,
    reviewCount: 750,
    image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 340,
    currency: 'USD',
    amenities: ['شاطئ خاص بالخليج الغربي', 'عمارة قطرية تراثية فاخرة', 'سبا عالمي', 'مسابح خارجية'],
    descriptionAr: 'منتجع عربي ساحلي يحاكي القرى القطرية التاريخية الفاخرة مع إطلالة خلابة على أفق الدوحة.',
    descriptionEn: 'Coastal Arabic luxury resort inspired by traditional Qatari villages on Doha Bay.'
  },
  {
    id: 'htl_kwi_1',
    name: 'Four Seasons Hotel Kuwait at Burj Alshaya',
    nameAr: 'فندق فور سيزونز الكويت في برج الشايع',
    city: 'Kuwait City',
    cityAr: 'مدينة الكويت',
    country: 'Kuwait',
    countryAr: 'الكويت',
    stars: 5,
    rating: 4.8,
    reviewCount: 610,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 360,
    currency: 'USD',
    amenities: ['موقع استراتيجي بقلب العاصمة', 'مطعم دا فايور الإيطالي', 'سبا ومسبحان', 'مركز مؤتمرات VIP'],
    descriptionAr: 'تحفة معمارية في قلب العاصمة الكويتية توفر أعلى مستويات الضيافة والفخامة لرجال الأعمال.',
    descriptionEn: 'Architectural jewel in the heart of Kuwait City delivering bespoke luxury and dining.'
  },
  {
    id: 'htl_rak_1',
    name: 'La Mamounia Marrakech',
    nameAr: 'فندق المأمونية مراكش',
    city: 'Marrakech',
    cityAr: 'مراكش',
    country: 'Morocco',
    countryAr: 'المغرب',
    stars: 5,
    rating: 4.9,
    reviewCount: 1890,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 510,
    currency: 'USD',
    amenities: ['حدائق تاريخية عمرها 300 عام', 'عمارة أندلسية مغربية ملكية', 'سبا شرقي تقليدي', 'مطاعم حائزة على جوائز'],
    descriptionAr: 'قصر أسطوري في مراكش يجسد قمة الفخامة والضيافة المغربية الملكية منذ قرن من الزمان.',
    descriptionEn: 'Legendary palace hotel in Marrakech celebrating century-old Moroccan royal hospitality.'
  },
  {
    id: 'htl_amm_1',
    name: 'The St. Regis Amman',
    nameAr: 'فندق سانت ريجيس عمّان',
    city: 'Amman',
    cityAr: 'عمّان',
    country: 'Jordan',
    countryAr: 'الأردن',
    stars: 5,
    rating: 4.7,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 290,
    currency: 'USD',
    amenities: ['حي عبدون الدبلوماسي', 'خدمة الخادم الشخصي (Butler)', 'غرف فسيحة ومجهزة', 'أرقى المطاعم'],
    descriptionAr: 'إقامة راقية في أرقى أحياء العاصمة الأردنية توفر أقصى درجات الراحة والخدمة الشخصية الرفيعة.',
    descriptionEn: 'Refined sanctuary in Amman’s prestigious Abdoun district with signature butler service.'
  },
  {
    id: 'htl_bah_1',
    name: 'The Ritz-Carlton Bahrain',
    nameAr: 'فندق ريتز كارلتون البحرين',
    city: 'Manama',
    cityAr: 'المنامة',
    country: 'Bahrain',
    countryAr: 'مملكة البحرين',
    stars: 5,
    rating: 4.8,
    reviewCount: 840,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 350,
    currency: 'USD',
    amenities: ['شاطئ خاص وبحيرة لاجون', 'مارينا لليخوت', 'سبا ونادي تالاسو', 'مطاعم حائزة على جوائز'],
    descriptionAr: 'منتجع ساحلي استثنائي في ضاحية السيف بالمنامة مع شاطئ رملي أبيض وبحيرة هادئة.',
    descriptionEn: 'Exclusive beachfront resort in Manama’s Seef District with private lagoon and marina.'
  },
  {
    id: 'htl_mct_1',
    name: 'Al Bustan Palace, a Ritz-Carlton Hotel',
    nameAr: 'قصر البستان، فندق ريتز كارلتون مسقط',
    city: 'Muscat',
    cityAr: 'مسقط',
    country: 'Oman',
    countryAr: 'سلطنة عمان',
    stars: 5,
    rating: 4.9,
    reviewCount: 910,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 380,
    currency: 'USD',
    amenities: ['إطلالة جبلية وبحرية ساحرة', 'شاطئ خاص بطول كيلومتر', 'قاعة بهو أسطورية بارتفاع 38 متراً', 'نادي صحي سي سبا'],
    descriptionAr: 'قصر أيقوني يقع بين جبال الحجر وبحر عمان، يجسد عراقة الضيافة العمانية الأصيلة بأبهى صورها.',
    descriptionEn: 'Iconic palace framed by Al Hajar mountains and Sea of Oman offering unmatched natural grandeur.'
  },
  {
    id: 'htl_bey_1',
    name: 'Phoenicia Hotel Beirut',
    nameAr: 'فندق فينيسيا بيروت',
    city: 'Beirut',
    cityAr: 'بيروت',
    country: 'Lebanon',
    countryAr: 'لبنان',
    stars: 5,
    rating: 4.8,
    reviewCount: 1100,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 260,
    currency: 'USD',
    amenities: ['إطلالة بانورامية على خليج مارين الزيتونة', 'مطاعم كلاسيكية راقية', 'مركز سبا فاخر', 'موقع مركزي وسط بيروت'],
    descriptionAr: 'درة الضيافة اللبنانية على الواجهة البحرية لكورنيش بيروت مع تاريخ عريق يمتد لعقود.',
    descriptionEn: 'Beirut landmark overlooking Zaitunay Bay celebrating legendary Lebanese charm and gourmet dining.'
  },
  {
    id: 'htl_bgw_1',
    name: 'Babylon Rotana Baghdad',
    nameAr: 'فندق بابل روتانا بغداد',
    city: 'Baghdad',
    cityAr: 'بغداد',
    country: 'Iraq',
    countryAr: 'العراق',
    stars: 5,
    rating: 4.7,
    reviewCount: 640,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 270,
    currency: 'USD',
    amenities: ['إطلالة مباشرة على نهر دجلة', 'عمارة هرمية زقوراتية شهيرة', 'أعلى معايير الأمان الدولية', 'صالات اجتماعات متطورة'],
    descriptionAr: 'تحفة هندسية مستوحاة من زقورة بابل التاريخية تطل مباشرة على ضفاف نهر دجلة في حي الجادرية الراقي.',
    descriptionEn: 'Architectural gem on the banks of Tigris River in prestigious Jadriya offering world-class comfort.'
  },
  {
    id: 'htl_tun_1',
    name: 'The Residence Tunis',
    nameAr: 'فندق ذا ريزيدنس تونس - قمرت',
    city: 'Tunis',
    cityAr: 'تونس',
    country: 'Tunisia',
    countryAr: 'تونس',
    stars: 5,
    rating: 4.8,
    reviewCount: 780,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 230,
    currency: 'USD',
    amenities: ['ملعب جولف 18 حفرة من تصميم روبرت ترينت جونز', 'مركز ثالاسوتيرابي استشفائي', 'شاطئ خاص بالبحر المتوسط', 'مطاعم تونسية وصينية راقية'],
    descriptionAr: 'منتجع هادئ على شواطئ قمرت يجمع بين الهندسة الأندلسية والخدمة التونسية الدافئة وملاعب الجولف الدولية.',
    descriptionEn: 'Serene haven on the shores of Gammarth blending Arab-Andalusian design with championship golf.'
  },
  {
    id: 'htl_alg_1',
    name: 'El Aurassi Hotel Algiers',
    nameAr: 'فندق الأوراسي الجزائر العاصمة',
    city: 'Algiers',
    cityAr: 'الجزائر العاصمة',
    country: 'Algeria',
    countryAr: 'الجزائر',
    stars: 5,
    rating: 4.6,
    reviewCount: 590,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 210,
    currency: 'USD',
    amenities: ['إطلالة علوية شاملة على خليج الجزائر', 'موقع استراتيجي قرب قصر الشعب', 'مركز مؤتمرات دولي', 'مسابح خارجية وحدائق'],
    descriptionAr: 'فندق عريق يتربع على تلال العاصمة الجزائرية ويوفر إطلالات أخّاذة على البحر الأبيض المتوسط وميناء الجزائر.',
    descriptionEn: 'Prestige hotel towering on Algiers hillside overlooking the sweeping Mediterranean bay.'
  },
  {
    id: 'htl_hbe_1',
    name: 'Four Seasons Hotel Alexandria at San Stefano',
    nameAr: 'فندق فور سيزونز الإسكندرية في سان ستيفانو',
    city: 'Alexandria',
    cityAr: 'الإسكندرية',
    country: 'Egypt',
    countryAr: 'مصر',
    stars: 5,
    rating: 4.9,
    reviewCount: 1450,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    pricePerNight: 310,
    currency: 'USD',
    amenities: ['شاطئ خاص على البحر الأبيض المتوسط', 'ممر مباشر لمول سان ستيفانو', 'سبا عالمي ومسبح انفينيتي', 'مطعم بيبلوس اللبناني الفاخر'],
    descriptionAr: 'أرقى إقامة ساحلية في عروس البحر الأبيض المتوسط مع شاطئ خاص وتراسات تطل على الكورنيش.',
    descriptionEn: 'Glamorous Mediterranean seaside retreat with private beach and panoramic Corniche views.'
  }
];

// Seed Flight Booking Requests
export const INITIAL_FLIGHT_REQUESTS: FlightBookingRequest[] = [
  {
    id: 'flt_req_101',
    referenceNumber: 'MSF-FLT-8192',
    userId: 'usr_customer_1',
    searchQuery: {
      tripType: 'round-trip',
      origin: 'القاهرة الدولي (CAI)',
      originCode: 'CAI',
      destination: 'الرياض - الملك خالد (RUH)',
      destinationCode: 'RUH',
      departureDate: '2026-11-15',
      returnDate: '2026-11-28',
      adults: 2,
      children: 1,
      cabinClass: 'economy'
    },
    passengerName: 'أحمد مصطفى الشامي',
    passengerEmail: 'ahmed.elshamy@example.com',
    passengerPhone: '+20 100 234 5678',
    status: 'ticketed',
    quotedAmount: 1850,
    currency: 'SAR',
    partnerReference: 'MS-RUH-784910',
    adminNotes: 'تم تأكيد الحجز وإصدار التذاكر الإلكترونية عبر شريك الطيران.',
    createdAt: '2026-10-02T11:30:00Z',
    updatedAt: '2026-10-03T09:15:00Z'
  },
  {
    id: 'flt_req_102',
    referenceNumber: 'MSF-FLT-9420',
    userId: 'usr_customer_1',
    searchQuery: {
      tripType: 'one-way',
      origin: 'القاهرة الدولي (CAI)',
      originCode: 'CAI',
      destination: 'جدة - الملك عبد العزيز (JED)',
      destinationCode: 'JED',
      departureDate: '2026-12-01',
      adults: 1,
      children: 0,
      cabinClass: 'business'
    },
    passengerName: 'محمد عبد الله القحطاني',
    passengerEmail: 'm.qahtani@example.com',
    passengerPhone: '+966 50 123 4567',
    status: 'partner_quoted',
    quotedAmount: 2450,
    currency: 'SAR',
    adminNotes: 'تم الحصول على خيار رجال الأعمال من الخطوط السعودية مع وجبة ساخنة ووزن 2x32 كجم.',
    createdAt: '2026-10-05T14:20:00Z',
    updatedAt: '2026-10-05T16:00:00Z'
  }
];

// Seed Cargo Requests
export const INITIAL_CARGO_REQUESTS: CargoRequest[] = [
  {
    id: 'crg_req_201',
    referenceNumber: 'MSF-CRG-8921',
    userId: 'usr_customer_1',
    senderName: 'أحمد مصطفى الشامي',
    senderPhone: '+20 100 234 5678',
    senderEmail: 'ahmed.elshamy@example.com',
    originCountry: 'مصر',
    originCity: 'القاهرة',
    destCountry: 'المملكة العربية السعودية',
    destCity: 'الرياض',
    shipmentType: 'excess_baggage',
    weightKg: 55,
    dimensions: { length: 80, width: 50, height: 40 },
    description: 'حقيبتان كبيرتان تحتويان على ملابس شتوية، كتب، وأغراض شخصية للأهل',
    preferredDate: '2026-11-10',
    receiverName: 'ياسر مصطفى الشامي',
    receiverPhone: '+966 55 987 6543',
    status: 'partner_quoted',
    quotedPrice: 920,
    currency: 'SAR',
    partnerCarrier: 'مصر للطيران للشحن الجوي (EgyptAir Cargo)',
    adminNotes: 'تم التنسيق مع مستودع مطار القاهرة للشحن. العرض يشمل التغليف الآمن والتخليص الجمركي.',
    createdAt: '2026-10-04T08:45:00Z',
    updatedAt: '2026-10-05T10:10:00Z'
  },
  {
    id: 'crg_req_202',
    referenceNumber: 'MSF-CRG-7744',
    userId: 'usr_customer_2',
    senderName: 'فاطمة الزهراء علي',
    senderPhone: '+971 50 882 1100',
    senderEmail: 'fatima.ali@example.com',
    originCountry: 'الإمارات العربية المتحدة',
    originCity: 'دبي',
    destCountry: 'مصر',
    destCity: 'الإسكندرية',
    shipmentType: 'personal_parcels',
    weightKg: 30,
    dimensions: { length: 60, width: 45, height: 35 },
    description: 'صندوق هدايا عائلية، أدوات إلكترونية شخصية، وألعاب أطفال',
    preferredDate: '2026-11-05',
    receiverName: 'حسين أحمد علي',
    receiverPhone: '+20 122 345 6789',
    status: 'in_transit',
    quotedPrice: 650,
    currency: 'AED',
    partnerCarrier: 'طيران الإمارات للشحن (Emirates SkyCargo)',
    adminNotes: 'الشحنة غادرت مطار دبي DXB وهي في مرحلة المناولة الجوية المتجهة لمصر.',
    createdAt: '2026-10-01T12:00:00Z',
    updatedAt: '2026-10-06T15:30:00Z'
  }
];

// Seed Hotel Requests
export const INITIAL_HOTEL_REQUESTS: HotelReservationRequest[] = [
  {
    id: 'htl_req_301',
    referenceNumber: 'MSF-HTL-4412',
    userId: 'usr_customer_1',
    hotelId: 'htl_ruh_1',
    hotelName: 'Four Seasons Hotel Riyadh',
    city: 'Riyadh',
    checkInDate: '2026-11-16',
    checkOutDate: '2026-11-20',
    rooms: 1,
    adults: 2,
    children: 0,
    roomType: 'Deluxe Tower Suite',
    guestName: 'أحمد مصطفى الشامي',
    guestPhone: '+20 100 234 5678',
    guestEmail: 'ahmed.elshamy@example.com',
    status: 'confirmed',
    quotedAmount: 1680,
    currency: 'USD',
    adminNotes: 'تم تأكيد الحجز مباشرة وتوفير ترقية مجانية لغرفة برج المملكة.',
    createdAt: '2026-10-03T16:00:00Z'
  }
];

// Seed Airport Transfer Requests
export const INITIAL_TRANSFER_REQUESTS: AirportTransferRequest[] = [
  {
    id: 'trf_req_401',
    referenceNumber: 'MSF-TRF-5120',
    userId: 'usr_customer_1',
    pickupLocation: 'مطار الرياض الملك خالد (RUH) صالة 4',
    destination: 'فندق فور سيزونز - برج المملكة',
    isAirportPickup: true,
    flightNumber: 'MS-649',
    date: '2026-11-15',
    time: '18:45',
    passengers: 3,
    luggageCount: 4,
    vehicleType: 'business',
    customerName: 'أحمد مصطفى الشامي',
    customerPhone: '+20 100 234 5678',
    customerEmail: 'ahmed.elshamy@example.com',
    status: 'confirmed',
    quotedAmount: 220,
    currency: 'SAR',
    adminNotes: 'سائق خاص يتحدث العربية مع لوحة ترحيبية في صالة الوصول الدولية.',
    createdAt: '2026-10-04T10:00:00Z'
  }
];

// Seed Visa Requests
export const INITIAL_VISA_REQUESTS: VisaAssistanceRequest[] = [
  {
    id: 'vsa_req_501',
    referenceNumber: 'MSF-VSA-6019',
    userId: 'usr_customer_1',
    destinationCountry: 'المملكة المتحدة (UK)',
    applicantNationality: 'مصري (Egyptian)',
    visaCategory: 'tourist',
    applicantName: 'كريم محمود إسماعيل',
    phone: '+20 111 890 1234',
    email: 'karim.ismail@example.com',
    status: 'under_review',
    notes: 'تجهيز كشف حساب بنكي مترجم وحجز طيران مبدئي وفندقي',
    adminNotes: 'تم تدقيق الأوراق وجاري تحديد موعد البصمة في مركز التأشيرات المعتمد بالقاهرة.',
    createdAt: '2026-10-05T09:30:00Z'
  }
];

// Seed Insurance Requests
export const INITIAL_INSURANCE_REQUESTS: TravelInsuranceRequest[] = [
  {
    id: 'ins_req_601',
    referenceNumber: 'MSF-INS-7321',
    userId: 'usr_customer_1',
    destination: 'منطقة شنغن وأوروبا (Schengen Zone)',
    startDate: '2026-11-20',
    endDate: '2026-12-05',
    travelersCount: 2,
    policyTier: 'platinum',
    applicantName: 'زياد طارق كامل',
    phone: '+20 106 555 4321',
    email: 'ziad.kamel@example.com',
    status: 'partner_quoted',
    quotedAmount: 140,
    currency: 'USD',
    adminNotes: 'وثيقة مطابقة لمتطلبات سفارات الاتحاد الأوروبي بتغطية طبية 50,000 يورو.',
    createdAt: '2026-10-06T11:00:00Z'
  }
];

// Seed Audit Logs for Administrator عثمان المهدي
export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log_1',
    actorName: 'عثمان المهدي',
    actorRole: 'Super Admin',
    action: 'تسعير شحن جوي',
    targetRef: 'MSF-CRG-8921',
    timestamp: '2026-10-05 10:10',
    details: 'اعتماد عرض سعر شحن الأمتعة مع مصر للطيران بقيمة 920 ر.س'
  },
  {
    id: 'log_2',
    actorName: 'عثمان المهدي',
    actorRole: 'Super Admin',
    action: 'تأكيد إصدار تذكرة',
    targetRef: 'MSF-FLT-8192',
    timestamp: '2026-10-03 09:15',
    details: 'إصدار PNR ومطابقة بيانات المسافر مع الخطوط الناقلة'
  },
  {
    id: 'log_3',
    actorName: 'عثمان المهدي',
    actorRole: 'Super Admin',
    action: 'تفعيل مسارات الدول العربية',
    targetRef: 'SYSTEM_CONFIG',
    timestamp: '2026-10-07 05:00',
    details: 'تحديث جداول المطارات لـ 22 دولة عربية'
  }
];

// Helper to access LocalStorage safely with default fallback
export function getStoredData<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(`masaferin_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return fallback;
  }
}

export function saveStoredData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`masaferin_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}
