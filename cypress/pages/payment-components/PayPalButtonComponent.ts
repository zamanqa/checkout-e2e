export class PayPalButtonComponent {
  clickPayPalButton(): this {
    cy.get('[data-testid="paypal-button"]').click();
    return this;
  }

  // PayPal opens a popup — handle via cy.origin or window stub
  verifyPayPalPopupOpened(): this {
    cy.window().its('open').should('be.called');
    return this;
  }

  verifyPayPalOrderCreated(): this {
    cy.get('[data-testid="paypal-order-status"]').should('contain.text', 'created');
    return this;
  }

  verifyPayPalCaptureCompleted(): this {
    cy.get('[data-testid="paypal-capture-status"]').should('contain.text', 'completed');
    return this;
  }

  cancelPayPal(): this {
    cy.get('[data-testid="paypal-cancel-btn"]').click();
    return this;
  }
}
