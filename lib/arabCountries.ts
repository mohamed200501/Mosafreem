export interface Airport {
  code: string;
  nameAr: string;
  nameEn: string;
  cityAr: string;
  cityEn: string;
}

export interface ArabCountry {
  id: string;
  code: string; // ISO 2-letter
  nameAr: string;
  nameEn: string;
  capitalAr: string;
  capitalEn: string;
  currency: string;
  currencySymbolAr: string;
  phoneCode: string;
  flagEmoji: string;
  airports: Airport[];
  popularHotelsCount: number;
}

export const ARAB_COUNTRIES: ArabCountry[] = [
  {
    id: 'egypt',
    code: 'EG',
    nameAr: 'مصر',
    nameEn: 'Egypt',
    capitalAr: 'القاهرة',
    capitalEn: 'Cairo',
    currency: 'EGP',
    currencySymbolAr: 'ج.م',
    phoneCode: '+20',
    flagEmoji: '🇪🇬',
    airports: [
      { code: 'CAI', nameAr: 'مطار القاهرة الدولي', nameEn: 'Cairo International Airport', cityAr: 'القاهرة', cityEn: 'Cairo' },
      { code: 'HBE', nameAr: 'مطار برج العرب الدولي', nameEn: 'Borg El Arab International', cityAr: 'الإسكندرية', cityEn: 'Alexandria' },
      { code: 'SSH', nameAr: 'مطار شرم الشيخ الدولي', nameEn: 'Sharm El Sheikh International', cityAr: 'شرم الشيخ', cityEn: 'Sharm El Sheikh' },
      { code: 'HRG', nameAr: 'مطار الغردقة الدولي', nameEn: 'Hurghada International', cityAr: 'الغردقة', cityEn: 'Hurghada' },
      { code: 'LXR', nameAr: 'مطار الأقصر الدولي', nameEn: 'Luxor International Airport', cityAr: 'الأقصر', cityEn: 'Luxor' },
      { code: 'ASW', nameAr: 'مطار أسوان الدولي', nameEn: 'Aswan International Airport', cityAr: 'أسوان', cityEn: 'Aswan' }
    ],
    popularHotelsCount: 420
  },
  {
    id: 'saudi_arabia',
    code: 'SA',
    nameAr: 'المملكة العربية السعودية',
    nameEn: 'Saudi Arabia',
    capitalAr: 'الرياض',
    capitalEn: 'Riyadh',
    currency: 'SAR',
    currencySymbolAr: 'ر.س',
    phoneCode: '+966',
    flagEmoji: '🇸🇦',
    airports: [
      { code: 'RUH', nameAr: 'مطار الملك خالد الدولي', nameEn: 'King Khalid International', cityAr: 'الرياض', cityEn: 'Riyadh' },
      { code: 'JED', nameAr: 'مطار الملك عبد العزيز الدولي', nameEn: 'King Abdulaziz International', cityAr: 'جدة', cityEn: 'Jeddah' },
      { code: 'DMM', nameAr: 'مطار الملك فهد الدولي', nameEn: 'King Fahd International', cityAr: 'الدمام', cityEn: 'Dammam' },
      { code: 'MED', nameAr: 'مطار الأمير محمد بن عبد العزيز', nameEn: 'Prince Mohammad Bin Abdulaziz', cityAr: 'المدينة المنورة', cityEn: 'Madinah' },
      { code: 'AHB', nameAr: 'مطار أبها الدولي', nameEn: 'Abha International', cityAr: 'أبها', cityEn: 'Abha' },
      { code: 'TIF', nameAr: 'مطار الطائف الدولي', nameEn: 'Taif Regional Airport', cityAr: 'الطائف', cityEn: 'Taif' }
    ],
    popularHotelsCount: 380
  },
  {
    id: 'uae',
    code: 'AE',
    nameAr: 'الإمارات العربية المتحدة',
    nameEn: 'United Arab Emirates',
    capitalAr: 'أبو ظبي',
    capitalEn: 'Abu Dhabi',
    currency: 'AED',
    currencySymbolAr: 'د.إ',
    phoneCode: '+971',
    flagEmoji: '🇦🇪',
    airports: [
      { code: 'DXB', nameAr: 'مطار دبي الدولي', nameEn: 'Dubai International Airport', cityAr: 'دبي', cityEn: 'Dubai' },
      { code: 'AUH', nameAr: 'مطار زايد الدولي', nameEn: 'Zayed International Airport', cityAr: 'أبو ظبي', cityEn: 'Abu Dhabi' },
      { code: 'SHJ', nameAr: 'مطار الشارقة الدولي', nameEn: 'Sharjah International', cityAr: 'الشارقة', cityEn: 'Sharjah' },
      { code: 'DWC', nameAr: 'مطار آل مكتوم الدولي', nameEn: 'Al Maktoum International', cityAr: 'دبي الجنوب', cityEn: 'Dubai South' }
    ],
    popularHotelsCount: 510
  },
  {
    id: 'kuwait',
    code: 'KW',
    nameAr: 'الكويت',
    nameEn: 'Kuwait',
    capitalAr: 'مدينة الكويت',
    capitalEn: 'Kuwait City',
    currency: 'KWD',
    currencySymbolAr: 'د.ك',
    phoneCode: '+965',
    flagEmoji: '🇰🇼',
    airports: [
      { code: 'KWI', nameAr: 'مطار الكويت الدولي', nameEn: 'Kuwait International Airport', cityAr: 'مدينة الكويت', cityEn: 'Kuwait City' }
    ],
    popularHotelsCount: 140
  },
  {
    id: 'qatar',
    code: 'QA',
    nameAr: 'قطر',
    nameEn: 'Qatar',
    capitalAr: 'الدوحة',
    capitalEn: 'Doha',
    currency: 'QAR',
    currencySymbolAr: 'ر.ق',
    phoneCode: '+974',
    flagEmoji: '🇶🇦',
    airports: [
      { code: 'DOH', nameAr: 'مطار حمد الدولي', nameEn: 'Hamad International Airport', cityAr: 'الدوحة', cityEn: 'Doha' }
    ],
    popularHotelsCount: 190
  },
  {
    id: 'bahrain',
    code: 'BH',
    nameAr: 'البحرين',
    nameEn: 'Bahrain',
    capitalAr: 'المنامة',
    capitalEn: 'Manama',
    currency: 'BHD',
    currencySymbolAr: 'د.ب',
    phoneCode: '+973',
    flagEmoji: '🇧🇭',
    airports: [
      { code: 'BAH', nameAr: 'مطار البحرين الدولي', nameEn: 'Bahrain International Airport', cityAr: 'المنامة', cityEn: 'Manama' }
    ],
    popularHotelsCount: 110
  },
  {
    id: 'oman',
    code: 'OM',
    nameAr: 'سلطنة عُمان',
    nameEn: 'Oman',
    capitalAr: 'مسقط',
    capitalEn: 'Muscat',
    currency: 'OMR',
    currencySymbolAr: 'ر.ع',
    phoneCode: '+968',
    flagEmoji: '🇴🇲',
    airports: [
      { code: 'MCT', nameAr: 'مطار مسقط الدولي', nameEn: 'Muscat International Airport', cityAr: 'مسقط', cityEn: 'Muscat' },
      { code: 'SLL', nameAr: 'مطار صلالة الدولي', nameEn: 'Salalah Airport', cityAr: 'صلالة', cityEn: 'Salalah' }
    ],
    popularHotelsCount: 160
  },
  {
    id: 'jordan',
    code: 'JO',
    nameAr: 'الأردن',
    nameEn: 'Jordan',
    capitalAr: 'عمّان',
    capitalEn: 'Amman',
    currency: 'JOD',
    currencySymbolAr: 'د.أ',
    phoneCode: '+962',
    flagEmoji: '🇯🇴',
    airports: [
      { code: 'AMM', nameAr: 'مطار الملكة علياء الدولي', nameEn: 'Queen Alia International', cityAr: 'عمّان', cityEn: 'Amman' },
      { code: 'AQJ', nameAr: 'مطار الملك حسين الدولي', nameEn: 'King Hussein International', cityAr: 'العقبة', cityEn: 'Aqaba' }
    ],
    popularHotelsCount: 175
  },
  {
    id: 'lebanon',
    code: 'LB',
    nameAr: 'لبنان',
    nameEn: 'Lebanon',
    capitalAr: 'بيروت',
    capitalEn: 'Beirut',
    currency: 'USD',
    currencySymbolAr: '$',
    phoneCode: '+961',
    flagEmoji: '🇱🇧',
    airports: [
      { code: 'BEY', nameAr: 'مطار رفيق الحريري الدولي', nameEn: 'Beirut-Rafic Hariri International', cityAr: 'بيروت', cityEn: 'Beirut' }
    ],
    popularHotelsCount: 130
  },
  {
    id: 'iraq',
    code: 'IQ',
    nameAr: 'العراق',
    nameEn: 'Iraq',
    capitalAr: 'بغداد',
    capitalEn: 'Baghdad',
    currency: 'IQD',
    currencySymbolAr: 'د.ع',
    phoneCode: '+964',
    flagEmoji: '🇮🇶',
    airports: [
      { code: 'BGW', nameAr: 'مطار بغداد الدولي', nameEn: 'Baghdad International Airport', cityAr: 'بغداد', cityEn: 'Baghdad' },
      { code: 'EBL', nameAr: 'مطار أربيل الدولي', nameEn: 'Erbil International Airport', cityAr: 'أربيل', cityEn: 'Erbil' },
      { code: 'BSR', nameAr: 'مطار البصرة الدولي', nameEn: 'Basra International Airport', cityAr: 'البصرة', cityEn: 'Basra' },
      { code: 'NJF', nameAr: 'مطار النجف الدولي', nameEn: 'Al Najaf International Airport', cityAr: 'النجف', cityEn: 'Najaf' }
    ],
    popularHotelsCount: 120
  },
  {
    id: 'syria',
    code: 'SY',
    nameAr: 'سوريا',
    nameEn: 'Syria',
    capitalAr: 'دمشق',
    capitalEn: 'Damascus',
    currency: 'SYP',
    currencySymbolAr: 'ل.س',
    phoneCode: '+963',
    flagEmoji: '🇸🇾',
    airports: [
      { code: 'DAM', nameAr: 'مطار دمشق الدولي', nameEn: 'Damascus International Airport', cityAr: 'دمشق', cityEn: 'Damascus' },
      { code: 'ALP', nameAr: 'مطار حلب الدولي', nameEn: 'Aleppo International Airport', cityAr: 'حلب', cityEn: 'Aleppo' }
    ],
    popularHotelsCount: 75
  },
  {
    id: 'palestine',
    code: 'PS',
    nameAr: 'فلسطين',
    nameEn: 'Palestine',
    capitalAr: 'القدس',
    capitalEn: 'Jerusalem',
    currency: 'JOD',
    currencySymbolAr: 'د.أ',
    phoneCode: '+970',
    flagEmoji: '🇵🇸',
    airports: [
      { code: 'JRS', nameAr: 'مطار القدس / عطروت', nameEn: 'Jerusalem Atarot Airport', cityAr: 'القدس', cityEn: 'Jerusalem' }
    ],
    popularHotelsCount: 85
  },
  {
    id: 'yemen',
    code: 'YE',
    nameAr: 'اليمن',
    nameEn: 'Yemen',
    capitalAr: 'صنعاء',
    capitalEn: 'Sanaa',
    currency: 'YER',
    currencySymbolAr: 'ر.ي',
    phoneCode: '+967',
    flagEmoji: '🇾🇪',
    airports: [
      { code: 'ADE', nameAr: 'مطار عدن الدولي', nameEn: 'Aden International Airport', cityAr: 'عدن', cityEn: 'Aden' },
      { code: 'SAH', nameAr: 'مطار صنعاء الدولي', nameEn: 'Sanaa International Airport', cityAr: 'صنعاء', cityEn: 'Sanaa' },
      { code: 'RIY', nameAr: 'مطار الريان الدولي', nameEn: 'Riyan Airport', cityAr: 'المكلا', cityEn: 'Mukalla' }
    ],
    popularHotelsCount: 60
  },
  {
    id: 'sudan',
    code: 'SD',
    nameAr: 'السودان',
    nameEn: 'Sudan',
    capitalAr: 'الخرطوم',
    capitalEn: 'Khartoum',
    currency: 'SDG',
    currencySymbolAr: 'ج.س',
    phoneCode: '+249',
    flagEmoji: '🇸🇩',
    airports: [
      { code: 'PZU', nameAr: 'مطار بورتسودان الدولي', nameEn: 'Port Sudan New International', cityAr: 'بورتسودان', cityEn: 'Port Sudan' },
      { code: 'KRT', nameAr: 'مطار الخرطوم الدولي', nameEn: 'Khartoum International Airport', cityAr: 'الخرطوم', cityEn: 'Khartoum' }
    ],
    popularHotelsCount: 70
  },
  {
    id: 'libya',
    code: 'LY',
    nameAr: 'ليبيا',
    nameEn: 'Libya',
    capitalAr: 'طرابلس',
    capitalEn: 'Tripoli',
    currency: 'LYD',
    currencySymbolAr: 'د.ل',
    phoneCode: '+218',
    flagEmoji: '🇱🇾',
    airports: [
      { code: 'MJI', nameAr: 'مطار معيتيقة الدولي', nameEn: 'Mitiga International Airport', cityAr: 'طرابلس', cityEn: 'Tripoli' },
      { code: 'BEN', nameAr: 'مطار بنينا الدولي', nameEn: 'Benina International Airport', cityAr: 'بنغازي', cityEn: 'Benghazi' },
      { code: 'MRA', nameAr: 'مطار مصراتة الدولي', nameEn: 'Misrata Airport', cityAr: 'مصراتة', cityEn: 'Misrata' }
    ],
    popularHotelsCount: 65
  },
  {
    id: 'tunisia',
    code: 'TN',
    nameAr: 'تونس',
    nameEn: 'Tunisia',
    capitalAr: 'تونس',
    capitalEn: 'Tunis',
    currency: 'TND',
    currencySymbolAr: 'د.ت',
    phoneCode: '+216',
    flagEmoji: '🇹🇳',
    airports: [
      { code: 'TUN', nameAr: 'مطار تونس قرطاج الدولي', nameEn: 'Tunis-Carthage International', cityAr: 'تونس', cityEn: 'Tunis' },
      { code: 'DJE', nameAr: 'مطار جربة جرجيس الدولي', nameEn: 'Djerba-Zarzis International', cityAr: 'جربة', cityEn: 'Djerba' },
      { code: 'MIR', nameAr: 'مطار الحبيب بورقيبة المنستير', nameEn: 'Monastir Habib Bourguiba', cityAr: 'المنستير', cityEn: 'Monastir' }
    ],
    popularHotelsCount: 220
  },
  {
    id: 'algeria',
    code: 'DZ',
    nameAr: 'الجزائر',
    nameEn: 'Algeria',
    capitalAr: 'الجزائر العاصمة',
    capitalEn: 'Algiers',
    currency: 'DZD',
    currencySymbolAr: 'د.ج',
    phoneCode: '+213',
    flagEmoji: '🇩🇿',
    airports: [
      { code: 'ALG', nameAr: 'مطار هواري بومدين الدولي', nameEn: 'Houari Boumediene Airport', cityAr: 'الجزائر العاصمة', cityEn: 'Algiers' },
      { code: 'ORN', nameAr: 'مطار وهران الدولي', nameEn: 'Ahmed Ben Bella Airport', cityAr: 'وهران', cityEn: 'Oran' },
      { code: 'CZL', nameAr: 'مطار قسنطينة الدولي', nameEn: 'Mohamed Boudiaf Airport', cityAr: 'قسنطينة', cityEn: 'Constantine' }
    ],
    popularHotelsCount: 180
  },
  {
    id: 'morocco',
    code: 'MA',
    nameAr: 'المغرب',
    nameEn: 'Morocco',
    capitalAr: 'الرباط',
    capitalEn: 'Rabat',
    currency: 'MAD',
    currencySymbolAr: 'د.م',
    phoneCode: '+212',
    flagEmoji: '🇲🇦',
    airports: [
      { code: 'CMN', nameAr: 'مطار محمد الخامس الدولي', nameEn: 'Mohammed V International', cityAr: 'الدار البيضاء', cityEn: 'Casablanca' },
      { code: 'RAK', nameAr: 'مطار مراكش المنارة الدولي', nameEn: 'Marrakech Menara Airport', cityAr: 'مراكش', cityEn: 'Marrakech' },
      { code: 'RBA', nameAr: 'مطار الرباط سلا الدولي', nameEn: 'Rabat-Salé Airport', cityAr: 'الرباط', cityEn: 'Rabat' },
      { code: 'TNG', nameAr: 'مطار طنجة ابن بطوطة', nameEn: 'Tangier Ibn Battouta Airport', cityAr: 'طنجة', cityEn: 'Tangier' },
      { code: 'AGA', nameAr: 'مطار أكادير المسيرة', nameEn: 'Agadir Al Massira Airport', cityAr: 'أكادير', cityEn: 'Agadir' }
    ],
    popularHotelsCount: 390
  },
  {
    id: 'mauritania',
    code: 'MR',
    nameAr: 'موريتانيا',
    nameEn: 'Mauritania',
    capitalAr: 'نواكشوط',
    capitalEn: 'Nouakchott',
    currency: 'MRU',
    currencySymbolAr: 'أ.م',
    phoneCode: '+222',
    flagEmoji: '🇲🇷',
    airports: [
      { code: 'NKC', nameAr: 'مطار نواكشوط الدولي - أم التونسي', nameEn: 'Nouakchott-Oumtounsy', cityAr: 'نواكشوط', cityEn: 'Nouakchott' },
      { code: 'NDB', nameAr: 'مطار نواذيبو الدولي', nameEn: 'Nouadhibou International', cityAr: 'نواذيبو', cityEn: 'Nouadhibou' }
    ],
    popularHotelsCount: 45
  },
  {
    id: 'somalia',
    code: 'SO',
    nameAr: 'الصومال',
    nameEn: 'Somalia',
    capitalAr: 'مقديشو',
    capitalEn: 'Mogadishu',
    currency: 'USD',
    currencySymbolAr: '$',
    phoneCode: '+252',
    flagEmoji: '🇸🇴',
    airports: [
      { code: 'MGQ', nameAr: 'مطار آدم عدي الدولي', nameEn: 'Aden Adde International', cityAr: 'مقديشو', cityEn: 'Mogadishu' },
      { code: 'HGA', nameAr: 'مطار هرجيسا الدولي', nameEn: 'Egal International Airport', cityAr: 'هرجيسا', cityEn: 'Hargeisa' }
    ],
    popularHotelsCount: 35
  },
  {
    id: 'djibouti',
    code: 'DJ',
    nameAr: 'جيبوتي',
    nameEn: 'Djibouti',
    capitalAr: 'جيبوتي العاصمة',
    capitalEn: 'Djibouti City',
    currency: 'DJF',
    currencySymbolAr: 'ف.ج',
    phoneCode: '+253',
    flagEmoji: '🇩🇯',
    airports: [
      { code: 'JIB', nameAr: 'مطار جيبوتي أمبولي الدولي', nameEn: 'Djibouti-Ambouli International', cityAr: 'جيبوتي العاصمة', cityEn: 'Djibouti City' }
    ],
    popularHotelsCount: 40
  },
  {
    id: 'comoros',
    code: 'KM',
    nameAr: 'جزر القمر',
    nameEn: 'Comoros',
    capitalAr: 'موروني',
    capitalEn: 'Moroni',
    currency: 'KMF',
    currencySymbolAr: 'ف.ق',
    phoneCode: '+269',
    flagEmoji: '🇰🇲',
    airports: [
      { code: 'HAH', nameAr: 'مطار الأمير سعيد إبراهيم الدولي', nameEn: 'Prince Said Ibrahim International', cityAr: 'موروني', cityEn: 'Moroni' }
    ],
    popularHotelsCount: 30
  }
];

// Helper to get all airports across the 22 Arab countries
export const ALL_ARAB_AIRPORTS: Airport[] = ARAB_COUNTRIES.flatMap(c => c.airports);

// Find country by ID or Code
export function findCountry(idOrCode: string): ArabCountry | undefined {
  const q = idOrCode.toLowerCase();
  return ARAB_COUNTRIES.find(c => c.id.toLowerCase() === q || c.code.toLowerCase() === q || c.nameEn.toLowerCase() === q || c.nameAr === idOrCode);
}
