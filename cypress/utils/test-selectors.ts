// Central selector constants (data-testid based)

export const SELECTORS = {
  // Cart
  CART_CONTAINER: '[data-testid="cart-container"]',
  CART_ITEM_ROW: '[data-testid="cart-item-row"]',
  CART_SUBTOTAL: '[data-testid="cart-subtotal"]',
  CART_TAX: '[data-testid="cart-tax"]',
  CART_TOTAL: '[data-testid="cart-total"]',

  // Checkout
  CHECKOUT_CONTAINER: '[data-testid="checkout-container"]',
  LOADING_SPINNER: '[data-testid="loading-spinner"]',
  ERROR_MESSAGE: '[data-testid="error-message"]',

  // Payment
  CONFIRM_PAYMENT_BTN: '[data-testid="confirm-payment-btn"]',
  PAYMENT_STATUS: '[data-testid="payment-status"]',
  PAYMENT_PROCESSING: '[data-testid="payment-processing"]',

  // Order
  ORDER_CONFIRMATION: '[data-testid="order-confirmation"]',
  ORDER_ID: '[data-testid="order-id"]',
} as const;
