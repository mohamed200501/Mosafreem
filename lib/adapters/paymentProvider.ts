export interface PaymentInitiationRequest {
  bookingId: string;
  bookingType: 'flight' | 'cargo' | 'hotel' | 'transfer' | 'visa' | 'insurance';
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  returnUrl: string;
}

export interface PaymentInitiationResponse {
  paymentSessionId: string;
  checkoutUrl?: string; // For hosted redirect flows (Paymob / Tap / Stripe)
  status: 'pending' | 'success' | 'failed';
  provider: 'paymob' | 'tap' | 'stripe' | 'demo';
}

export interface IPaymentProvider {
  createPaymentSession(request: PaymentInitiationRequest): Promise<PaymentInitiationResponse>;
  verifyWebhookSignature(payload: any, signature: string): boolean;
  capturePayment(transactionId: string): Promise<boolean>;
}

export class DemoPaymentProvider implements IPaymentProvider {
  async createPaymentSession(request: PaymentInitiationRequest): Promise<PaymentInitiationResponse> {
    // Generates a secure hosted simulation session
    const sessionId = `sess_${Math.random().toString(36).substring(2, 10)}`;
    return {
      paymentSessionId: sessionId,
      checkoutUrl: `/checkout/simulated?session=${sessionId}&amount=${request.amount}&currency=${request.currency}`,
      status: 'pending',
      provider: 'demo'
    };
  }

  verifyWebhookSignature(payload: any, signature: string): boolean {
    return true; // Verified in demo mode
  }

  async capturePayment(transactionId: string): Promise<boolean> {
    return true;
  }
}

export const paymentProvider = new DemoPaymentProvider();
