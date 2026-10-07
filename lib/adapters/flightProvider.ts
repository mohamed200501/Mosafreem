import { FlightOption, FlightSearchQuery } from '../types';
import { ALL_ARAB_AIRPORTS, ARAB_COUNTRIES } from '../arabCountries';

export interface IFlightProvider {
  name: string;
  isLive: boolean;
  searchFlights(query: FlightSearchQuery): Promise<FlightOption[]>;
  createBookingReference(flightId: string, passengers: any[]): Promise<{ pnr: string; status: string }>;
}

export class DemoFlightProvider implements IFlightProvider {
  name = 'Masaferin Travel Engine (Realistic Arab Network Simulation)';
  isLive = false;

  async searchFlights(query: FlightSearchQuery): Promise<FlightOption[]> {
    // Artificial slight delay to simulate live GDS query
    await new Promise((resolve) => setTimeout(resolve, 350));

    const origin = query.originCode || 'CAI';
    const dest = query.destinationCode || 'RUH';
    const classMultiplier = query.cabinClass === 'business' ? 2.4 : query.cabinClass === 'first' ? 4.2 : 1;

    // Look up airport and country metadata
    const originAirport = ALL_ARAB_AIRPORTS.find(a => a.code === origin);
    const destAirport = ALL_ARAB_AIRPORTS.find(a => a.code === dest);

    const originCityLabel = originAirport ? `${originAirport.cityAr} (${originAirport.code})` : (query.origin || origin);
    const destCityLabel = destAirport ? `${destAirport.cityAr} (${destAirport.code})` : (query.destination || dest);

    // Identify carriers based on origin/dest
    const originCountry = ARAB_COUNTRIES.find(c => c.airports.some(a => a.code === origin));
    const destCountry = ARAB_COUNTRIES.find(c => c.airports.some(a => a.code === dest));

    // Curated airline definitions across Arab network
    const airlinePresets: Record<string, { name: string; code: string; aircraft: string; baggage: number }> = {
      EG: { name: 'مصر للطيران | EgyptAir', code: 'MS', aircraft: 'Boeing 787-9 Dreamliner', baggage: 46 },
      SA: { name: 'الخطوط السعودية | Saudia', code: 'SV', aircraft: 'Airbus A330-300', baggage: 46 },
      AE: { name: 'طيران الإمارات | Emirates', code: 'EK', aircraft: 'Boeing 777-300ER', baggage: 30 },
      QA: { name: 'الخطوط الجوية القطرية | Qatar Airways', code: 'QR', aircraft: 'Airbus A350-900', baggage: 30 },
      KW: { name: 'الخطوط الجوية الكويتية | Kuwait Airways', code: 'KU', aircraft: 'Boeing 777-300ER', baggage: 46 },
      JO: { name: 'الملكية الأردنية | Royal Jordanian', code: 'RJ', aircraft: 'Boeing 787-8 Dreamliner', baggage: 30 },
      OM: { name: 'الطيران العماني | Oman Air', code: 'WY', aircraft: 'Boeing 787-9 Dreamliner', baggage: 30 },
      BH: { name: 'طيران الخليج | Gulf Air', code: 'GF', aircraft: 'Boeing 787-9 Dreamliner', baggage: 30 },
      MA: { name: 'الخطوط الملكية المغربية | Royal Air Maroc', code: 'AT', aircraft: 'Boeing 787-8 Dreamliner', baggage: 46 },
      DZ: { name: 'الخطوط الجوية الجزائرية | Air Algérie', code: 'AH', aircraft: 'Airbus A330-200', baggage: 30 },
      TN: { name: 'الخطوط التونسية | Tunisair', code: 'TU', aircraft: 'Airbus A330neo', baggage: 32 },
      LB: { name: 'طيران الشرق الأوسط | Middle East Airlines', code: 'ME', aircraft: 'Airbus A321neo', baggage: 30 },
      IQ: { name: 'الخطوط الجوية العراقية | Iraqi Airways', code: 'IA', aircraft: 'Boeing 737 MAX 8', baggage: 30 },
      SD: { name: 'بدر للطيران | Badr Airlines', code: 'J4', aircraft: 'Boeing 737-800', baggage: 40 },
      LY: { name: 'الخطوط الجوية الليبية | Libyan Airlines', code: 'LN', aircraft: 'Airbus A320', baggage: 30 },
      YE: { name: 'الخطوط الجوية اليمنية | Yemenia', code: 'IY', aircraft: 'Airbus A330-200', baggage: 40 },
    };

    // Determine 1st and 2nd airline options
    const carrier1 = originCountry && airlinePresets[originCountry.code] ? airlinePresets[originCountry.code] : airlinePresets['EG'];
    const carrier2 = destCountry && airlinePresets[destCountry.code] ? airlinePresets[destCountry.code] : airlinePresets['SA'];
    const carrier3 = { name: 'طيران ناس | Flynas', code: 'XY', aircraft: 'Airbus A320neo', baggage: 20 };
    const carrier4 = { name: 'طيران الإمارات | Emirates (ترانزيت دبي)', code: 'EK', aircraft: 'Boeing 777-300ER', baggage: 30 };

    const flights: FlightOption[] = [
      {
        id: `flt_${origin}_${dest}_1`,
        airline: carrier1.name,
        airlineCode: carrier1.code,
        flightNumber: `${carrier1.code}-${Math.floor(200 + Math.random() * 700)}`,
        originCode: origin,
        originCity: originCityLabel,
        destinationCode: dest,
        destinationCity: destCityLabel,
        departureTime: '08:30',
        arrivalTime: '11:45',
        duration: '2h 15m',
        stops: 0,
        baggageKg: carrier1.baggage,
        cabinBaggageKg: 8,
        priceAmount: Math.round(980 * classMultiplier),
        currency: 'SAR',
        aircraft: carrier1.aircraft,
        isSimulatedDemo: true
      },
      {
        id: `flt_${origin}_${dest}_2`,
        airline: carrier2.name,
        airlineCode: carrier2.code,
        flightNumber: `${carrier2.code}-${Math.floor(200 + Math.random() * 700)}`,
        originCode: origin,
        originCity: originCityLabel,
        destinationCode: dest,
        destinationCity: destCityLabel,
        departureTime: '13:15',
        arrivalTime: '16:30',
        duration: '2h 15m',
        stops: 0,
        baggageKg: carrier2.baggage,
        cabinBaggageKg: 7,
        priceAmount: Math.round(1040 * classMultiplier),
        currency: 'SAR',
        aircraft: carrier2.aircraft,
        isSimulatedDemo: true
      },
      {
        id: `flt_${origin}_${dest}_3`,
        airline: carrier3.name,
        airlineCode: carrier3.code,
        flightNumber: `XY-${Math.floor(200 + Math.random() * 700)}`,
        originCode: origin,
        originCity: originCityLabel,
        destinationCode: dest,
        destinationCity: destCityLabel,
        departureTime: '19:40',
        arrivalTime: '22:55',
        duration: '2h 15m',
        stops: 0,
        baggageKg: carrier3.baggage,
        cabinBaggageKg: 7,
        priceAmount: Math.round(790 * classMultiplier),
        currency: 'SAR',
        aircraft: carrier3.aircraft,
        isSimulatedDemo: true
      },
      {
        id: `flt_${origin}_${dest}_4`,
        airline: carrier4.name,
        airlineCode: carrier4.code,
        flightNumber: `EK-${Math.floor(900 + Math.random() * 99)}`,
        originCode: origin,
        originCity: originCityLabel,
        destinationCode: dest,
        destinationCity: destCityLabel,
        departureTime: '10:00',
        arrivalTime: '16:15',
        duration: '5h 15m',
        stops: 1,
        stopoverCities: ['دبي (DXB)'],
        baggageKg: carrier4.baggage,
        cabinBaggageKg: 7,
        priceAmount: Math.round(1350 * classMultiplier),
        currency: 'SAR',
        aircraft: carrier4.aircraft,
        isSimulatedDemo: true
      }
    ];

    return flights;
  }

  async createBookingReference(flightId: string, passengers: any[]): Promise<{ pnr: string; status: string }> {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    return {
      pnr: `MSF-${randomCode}`,
      status: 'pending_provider_ticketing'
    };
  }
}

// Live Amadeus/Sabre Provider Adapter Stub for Phase 2 Integration
export class AmadeusFlightProvider implements IFlightProvider {
  name = 'Amadeus GDS Live API';
  isLive = true;
  private apiKey: string | undefined;
  private apiSecret: string | undefined;

  constructor() {
    this.apiKey = process.env.AMADEUS_CLIENT_ID;
    this.apiSecret = process.env.AMADEUS_CLIENT_SECRET;
  }

  async searchFlights(query: FlightSearchQuery): Promise<FlightOption[]> {
    if (!this.apiKey || !this.apiSecret) {
      console.warn('Amadeus API keys missing. Falling back to Demo Flight Provider.');
      return new DemoFlightProvider().searchFlights(query);
    }
    // In production, invoke Amadeus REST API `/v2/shopping/flight-offers` here
    throw new Error('Amadeus Live Credentials not yet configured on this instance.');
  }

  async createBookingReference(flightId: string, passengers: any[]): Promise<{ pnr: string; status: string }> {
    throw new Error('Amadeus Live Booking requires production PNR authorization.');
  }
}

// Default export uses appropriate provider based on environment variables
export const flightProvider: IFlightProvider = 
  process.env.AMADEUS_CLIENT_ID ? new AmadeusFlightProvider() : new DemoFlightProvider();
