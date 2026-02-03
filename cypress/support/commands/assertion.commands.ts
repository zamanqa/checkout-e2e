// Domain-specific assertion commands

Cypress.Commands.add(
  'assertCartTotal',
  (expected: {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  }) => {
    cy.get('[data-testid="cart-subtotal"]').should('contain', expected.subtotal.toFixed(2));
    cy.get('[data-testid="cart-tax"]').should('contain', expected.tax.toFixed(2));
    cy.get('[data-testid="cart-shipping"]').should('contain', expected.shipping.toFixed(2));

    if (expected.discount > 0) {
      cy.get('[data-testid="cart-discount"]').should('contain', expected.discount.toFixed(2));
    }

    cy.get('[data-testid="cart-total"]').should('contain', expected.total.toFixed(2));
  },
);

Cypress.Commands.add(
  'assertPaymentStatus',
  (status: 'succeeded' | 'failed' | 'pending') => {
    cy.get('[data-testid="payment-status"]').should('contain', status);
  },
);

Cypress.Commands.add('assertOrderCreated', (orderId: string) => {
  cy.get('[data-testid="order-confirmation"]').should('be.visible');
  cy.get('[data-testid="order-id"]').should('contain', orderId);
});
