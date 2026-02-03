import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {
  readonly path = '/checkout/payment';

  // --- Selectors ---

  private get paymentMethodOptions() {
    return cy.get('[data-testid^="payment-method-"]');
  }

  private get confirmPaymentButton() {
    return this.getByTestId('confirm-payment-btn');
  }

  private get paymentProcessingIndicator() {
    return this.getByTestId('payment-processing');
  }

  private get paymentErrorMessage() {
    return this.getByTestId('payment-error');
  }

  private get orderSummary() {
    return this.getByTestId('order-summary');
  }

  // --- Actions ---

  selectPaymentMethod(method: string): this {
    cy.get(`[data-testid="payment-method-${method}"]`).click();
    return this;
  }

  verifyAvailablePaymentMethods(methods: string[]): this {
    methods.forEach((method) => {
      cy.get(`[data-testid="payment-method-${method}"]`).should('exist');
    });
    return this;
  }

  verifyPaymentMethodCount(count: number): this {
    this.paymentMethodOptions.should('have.length', count);
    return this;
  }

  confirmPayment(): this {
    this.confirmPaymentButton.click();
    return this;
  }

  waitForPaymentProcessing(): this {
    this.paymentProcessingIndicator.should('not.exist', { timeout: 30000 });
    return this;
  }

  verifyPaymentError(errorText: string): this {
    this.paymentErrorMessage.should('be.visible').and('contain.text', errorText);
    return this;
  }

  verifyOrderSummaryTotal(expectedTotal: string): this {
    this.orderSummary.should('contain.text', expectedTotal);
    return this;
  }
}
