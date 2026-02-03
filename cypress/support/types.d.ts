// ============================================================
// Domain Interfaces
// ============================================================

interface CartItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
  subscription?: boolean;
  subscription_length?: number;
  subscription_frequency?: string;
  tax_category?: string;
  tax_rate?: number;
}

interface CartResponse {
  cart_id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  tax_percent: number;
  shipping_cost: number;
  voucher_code: string | null;
  voucher_discount: number;
  total: number;
  price_excl_vat: number;
  price_incl_vat: number;
}

interface Address {
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  postal_code: string;
  country: string;
  alpha2: string;
  region_iso: string | null;
}

interface TaxCalculation {
  country: string;
  alpha2: string;
  region_iso?: string;
  tax_rate: number;
  price: number;
  expected_tax: number;
  expected_total: number;
}

interface PaymentCard {
  number: string;
  expiry: string;
  cvc: string;
  brand: string;
}

interface VoucherCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  recurring: boolean;
}

interface ShippingMethod {
  id: string;
  name: string;
  cost: number;
  estimated_days: number;
}

interface OrderResponse {
  order_id: string;
  status: string;
  cart_id: string;
  total: number;
  payment_status: string;
}

// ============================================================
// Custom Command Declarations
// ============================================================

declare namespace Cypress {
  interface Chainable {
    // --- Cart Commands ---
    createCart(apiKey: string, items?: CartItem[]): Chainable<CartResponse>;
    getCart(apiKey: string, cartId: string): Chainable<CartResponse>;
    addItemToCart(apiKey: string, cartId: string, item: CartItem): Chainable<CartResponse>;
    updateItemQuantity(
      apiKey: string,
      cartId: string,
      itemId: string,
      quantity: number,
    ): Chainable<CartResponse>;
    deleteCart(apiKey: string, cartId: string): Chainable<void>;
    seedCartViaApi(apiKey: string, fixtureName: string): Chainable<CartResponse>;

    // --- Payment Commands ---
    selectPaymentMethod(method: string): Chainable<void>;
    fillStripeCard(card: PaymentCard): Chainable<void>;
    fillAdyenCard(card: PaymentCard): Chainable<void>;
    confirmPayment(): Chainable<void>;
    waitForPaymentProcessing(): Chainable<void>;

    // --- Checkout Commands ---
    completeCheckout(options: {
      address: Address;
      shippingMethod?: string;
      paymentMethod?: string;
    }): Chainable<void>;
    fillAddressForm(address: Address): Chainable<void>;
    fillBillingAddress(address: Address): Chainable<void>;
    proceedToPayment(): Chainable<void>;

    // --- Tax Commands ---
    verifyTaxCalculation(expected: TaxCalculation): Chainable<void>;
    verifyVatNumber(vatNumber: string): Chainable<void>;
    switchCountry(alpha2: string): Chainable<void>;

    // --- Voucher Commands ---
    applyVoucher(code: string): Chainable<void>;
    removeVoucher(): Chainable<void>;
    verifyVoucherDiscount(expectedDiscount: number): Chainable<void>;

    // --- Shipping Commands ---
    selectShippingMethod(methodId: string): Chainable<void>;
    verifyShippingCost(expectedCost: number): Chainable<void>;
    verifyAvailableShippingMethods(expectedMethods: string[]): Chainable<void>;

    // --- API Commands ---
    apiRequest(
      method: string,
      endpoint: string,
      body?: object,
    ): Chainable<Cypress.Response<unknown>>;
    apiSetupTestData(apiKey: string, scenario: string): Chainable<void>;
    apiCleanupTestData(apiKey: string, cartId: string): Chainable<void>;

    // --- Assertion Commands ---
    assertCartTotal(expected: {
      subtotal: number;
      tax: number;
      shipping: number;
      discount: number;
      total: number;
    }): Chainable<void>;
    assertPaymentStatus(status: 'succeeded' | 'failed' | 'pending'): Chainable<void>;
    assertOrderCreated(orderId: string): Chainable<void>;
  }
}
