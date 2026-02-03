import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly path = '/cart';

  // --- Selectors ---

  private get cartItemRows() {
    return cy.get('[data-testid="cart-item-row"]');
  }

  private get subtotalDisplay() {
    return this.getByTestId('cart-subtotal');
  }

  private get taxDisplay() {
    return this.getByTestId('cart-tax');
  }

  private get totalDisplay() {
    return this.getByTestId('cart-total');
  }

  private get voucherInput() {
    return this.getByTestId('voucher-code-input');
  }

  private get applyVoucherButton() {
    return this.getByTestId('apply-voucher-btn');
  }

  private get proceedToCheckoutButton() {
    return this.getByTestId('proceed-to-checkout-btn');
  }

  private get emptyCartMessage() {
    return this.getByTestId('empty-cart-message');
  }

  // --- Actions ---

  verifyItemCount(expectedCount: number): this {
    this.cartItemRows.should('have.length', expectedCount);
    return this;
  }

  verifySubtotal(expectedAmount: string): this {
    this.subtotalDisplay.should('contain.text', expectedAmount);
    return this;
  }

  verifyTax(expectedTax: string): this {
    this.taxDisplay.should('contain.text', expectedTax);
    return this;
  }

  verifyTotal(expectedTotal: string): this {
    this.totalDisplay.should('contain.text', expectedTotal);
    return this;
  }

  applyVoucher(code: string): this {
    this.voucherInput.clear().type(code);
    this.applyVoucherButton.click();
    this.waitForLoadingComplete();
    return this;
  }

  proceedToCheckout() {
    this.proceedToCheckoutButton.click();
  }

  verifyEmptyCart(): this {
    this.emptyCartMessage.should('be.visible');
    return this;
  }

  verifyCartCalculations(expected: {
    subtotal: string;
    tax: string;
    total: string;
    itemCount: number;
  }): this {
    this.verifyItemCount(expected.itemCount);
    this.verifySubtotal(expected.subtotal);
    this.verifyTax(expected.tax);
    this.verifyTotal(expected.total);
    return this;
  }
}
