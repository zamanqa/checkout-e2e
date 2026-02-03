import { BasePage } from './BasePage';

export class ShippingPage extends BasePage {
  readonly path = '/checkout/shipping';

  // --- Selectors ---

  private get shippingMethodOptions() {
    return cy.get('[data-testid^="shipping-method-"]');
  }

  private get shippingCostDisplay() {
    return this.getByTestId('shipping-cost');
  }

  private get continueToPaymentButton() {
    return this.getByTestId('continue-to-payment-btn');
  }

  private get estimatedDelivery() {
    return this.getByTestId('estimated-delivery');
  }

  // --- Actions ---

  selectMethod(methodId: string): this {
    cy.get(`[data-testid="shipping-method-${methodId}"]`).click();
    this.waitForLoadingComplete();
    return this;
  }

  verifyShippingCost(expectedCost: string): this {
    this.shippingCostDisplay.should('contain.text', expectedCost);
    return this;
  }

  verifyAvailableMethods(expectedCount: number): this {
    this.shippingMethodOptions.should('have.length', expectedCount);
    return this;
  }

  verifyMethodExists(methodId: string): this {
    cy.get(`[data-testid="shipping-method-${methodId}"]`).should('exist');
    return this;
  }

  verifyEstimatedDelivery(text: string): this {
    this.estimatedDelivery.should('contain.text', text);
    return this;
  }

  continueToPayment(): void {
    this.continueToPaymentButton.click();
    this.waitForLoadingComplete();
  }
}
