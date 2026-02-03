import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  readonly path = '/checkout/confirmation';

  // --- Selectors ---

  private get confirmationContainer() {
    return this.getByTestId('order-confirmation');
  }

  private get orderIdDisplay() {
    return this.getByTestId('order-id');
  }

  private get orderTotalDisplay() {
    return this.getByTestId('order-total');
  }

  private get paymentStatusDisplay() {
    return this.getByTestId('payment-status');
  }

  private get orderItemsList() {
    return this.getByTestId('order-items');
  }

  // --- Actions ---

  verifyConfirmationVisible(): this {
    this.confirmationContainer.should('be.visible');
    return this;
  }

  verifyOrderId(orderId: string): this {
    this.orderIdDisplay.should('contain.text', orderId);
    return this;
  }

  getOrderId(): Cypress.Chainable<string> {
    return this.orderIdDisplay.invoke('text').then((text) => text.trim());
  }

  verifyTotal(expectedTotal: string): this {
    this.orderTotalDisplay.should('contain.text', expectedTotal);
    return this;
  }

  verifyPaymentStatus(status: string): this {
    this.paymentStatusDisplay.should('contain.text', status);
    return this;
  }

  verifyItemCount(count: number): this {
    this.orderItemsList.find('[data-testid="order-item-row"]').should('have.length', count);
    return this;
  }
}
