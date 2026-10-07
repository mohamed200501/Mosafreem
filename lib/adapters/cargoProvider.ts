import { CargoRequest } from '../types';

export interface CargoRateEstimate {
  estimatedPrice: number;
  currency: string;
  recommendedCarrier: string;
  transitDays: string;
  notes: string;
}

export interface ICargoProvider {
  calculateVolumetricWeight(lengthCm: number, widthCm: number, heightCm: number): number;
  estimateShippingRate(origin: string, destination: string, weightKg: number, type: string): CargoRateEstimate;
  trackShipment(trackingCode: string): Promise<{ status: string; checkpoints: any[] }>;
}

export class MasaferinCargoEngine implements ICargoProvider {
  // Standard IATA Volumetric formula: (L x W x H in cm) / 5000 or 6000
  calculateVolumetricWeight(lengthCm: number, widthCm: number, heightCm: number): number {
    return Math.round(((lengthCm * widthCm * heightCm) / 6000) * 10) / 10;
  }

  estimateShippingRate(origin: string, destination: string, weightKg: number, type: string): CargoRateEstimate {
    // Pricing model based on weight brackets and destination
    let baseRatePerKg = 16; // approx 16 SAR / kg for Egypt <-> Gulf
    if (type === 'excess_baggage') baseRatePerKg = 14;
    if (type === 'commercial_cargo') baseRatePerKg = 18;

    const estimatedTotal = Math.max(350, Math.round(weightKg * baseRatePerKg));

    return {
      estimatedPrice: estimatedTotal,
      currency: 'SAR',
      recommendedCarrier: 'EgyptAir Cargo / Saudia Cargo Partner Network',
      transitDays: '2 - 4 أيام عمل',
      notes: 'التقدير استرشادي. يتم فحص الطرود وتثبيت الوزن النهائي في نقطة الاستلام المعتمدة.'
    };
  }

  async trackShipment(trackingCode: string) {
    return {
      status: 'in_transit',
      checkpoints: [
        { time: '2026-10-04 10:00', title: 'تم استلام الشحنة في المركز اللوجستي', location: 'القاهرة' },
        { time: '2026-10-05 14:30', title: 'تم الفحص والتغليف الأمني الجوي', location: 'مطار القاهرة الدولي' },
        { time: '2026-10-06 08:15', title: 'مغادرة على متن رحلة الشحن الجوي', location: 'في الطريق' }
      ]
    };
  }
}

export const cargoEngine = new MasaferinCargoEngine();
