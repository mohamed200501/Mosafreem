export type Language = 'ar' | 'en';

export type UserRole = 'customer' | 'admin' | 'partner_agent';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  country?: string;
  nationality?: string;
  passportNumber?: string;
  createdAt?: string;
}

export type RequestStatus = 
  | 'submitted' 
  | 'under_review' 
  | 'partner_quoted' 
  | 'confirmed' 
  | 'ticketed'
  | 'in_transit'
  | 'delivered'
  | 'completed' 
  | 'cancelled';

export interface FlightSearchQuery {
  tripType: 'one-way' | 'round-trip' | 'multi-city';
  origin: string;
  originCode: string;
  originCountry?: string;
  destination: string;
  destinationCode: string;
  destinationCountry?: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
}

export interface FlightOption {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  originCode: string;
  originCity: string;
  originCountry?: string;
  destinationCode: string;
  destinationCity: string;
  destinationCountry?: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopoverCities?: string[];
  baggageKg: number;
  cabinBaggageKg: number;
  priceAmount: number;
  currency: string;
  aircraft: string;
  isSimulatedDemo: boolean;
}

export interface FlightBookingRequest {
  id: string;
  referenceNumber: string;
  searchQuery: FlightSearchQuery;
  selectedFlight?: FlightOption;
  userId?: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  passportNumber?: string;
  status: RequestStatus;
  quotedAmount?: number;
  currency: string;
  partnerReference?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CargoRequest {
  id: string;
  referenceNumber: string;
  userId?: string;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  originCountry: string;
  originCity: string;
  destCountry: string;
  destCity: string;
  shipmentType: 'excess_baggage' | 'personal_parcels' | 'commercial_cargo';
  weightKg: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  description: string;
  preferredDate: string;
  receiverName?: string;
  receiverPhone?: string;
  status: RequestStatus;
  quotedPrice?: number;
  currency: string;
  partnerCarrier?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  country: string;
  countryAr: string;
  stars: number;
  rating: number;
  reviewCount: number;
  image: string;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  descriptionAr: string;
  descriptionEn: string;
  cancellationPolicyAr?: string;
  cancellationPolicyEn?: string;
}

export interface HotelReservationRequest {
  id: string;
  referenceNumber: string;
  userId?: string;
  hotelId: string;
  hotelName: string;
  city: string;
  country?: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  adults: number;
  children: number;
  roomType: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  status: RequestStatus;
  quotedAmount?: number;
  currency: string;
  adminNotes?: string;
  createdAt: string;
}

export interface AirportTransferRequest {
  id: string;
  referenceNumber: string;
  userId?: string;
  pickupLocation: string;
  destination: string;
  isAirportPickup: boolean;
  flightNumber?: string;
  date: string;
  time: string;
  passengers: number;
  luggageCount: number;
  vehicleType: 'sedan' | 'business' | 'van' | 'vip';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: RequestStatus;
  quotedAmount?: number;
  currency: string;
  adminNotes?: string;
  createdAt: string;
}

export interface VisaAssistanceRequest {
  id: string;
  referenceNumber: string;
  userId?: string;
  destinationCountry: string;
  applicantNationality: string;
  visaCategory: 'tourist' | 'business' | 'umrah' | 'work_visit';
  applicantName: string;
  phone: string;
  email: string;
  status: RequestStatus;
  notes?: string;
  adminNotes?: string;
  createdAt: string;
}

export interface TravelInsuranceRequest {
  id: string;
  referenceNumber: string;
  userId?: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelersCount: number;
  policyTier: 'silver' | 'gold' | 'platinum';
  applicantName: string;
  phone: string;
  email: string;
  status: RequestStatus;
  quotedAmount?: number;
  currency: string;
  adminNotes?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  createdAt: string;
  isRead: boolean;
  link?: string;
}

export interface AuditLogItem {
  id: string;
  actorName: string;
  actorRole: string;
  action: string;
  targetRef: string;
  timestamp: string;
  details: string;
}

// Fixed Designer Credit Constant
export const DESIGNER_CREDIT = {
  ar: 'تصميم وتطوير المهندس محمد سمير',
  en: 'Designed and Developed by Engineer Mohamed Samir'
};
