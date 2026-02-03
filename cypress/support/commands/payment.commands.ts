// Payment gateway commands

Cypress.Commands.add('selectPaymentMethod', (method: string) => {
  cy.get(`[data-testid="payment-method-${method}"]`).click();
});

Cypress.Commands.add('fillStripeCard', (card: PaymentCard) => {
  // Stripe Elements renders inside an iframe
  cy.get('[data-testid="stripe-card-element"] iframe')
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap)
    .within(() => {
      cy.get('input[name="cardnumber"]').type(card.number);
      cy.get('input[name="exp-date"]').type(card.expiry);
      cy.get('input[name="cvc"]').type(card.cvc);
    });
});

Cypress.Commands.add('fillAdyenCard', (card: PaymentCard) => {
  // Adyen Drop-In renders inside iframes
  cy.get('[data-testid="adyen-card-number"] iframe')
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap)
    .find('input')
    .type(card.number);

  cy.get('[data-testid="adyen-expiry"] iframe')
    .its('0.contentDocument.body')
    .then(cy.wrap)
    .find('input')
    .type(card.expiry);

  cy.get('[data-testid="adyen-cvc"] iframe')
    .its('0.contentDocument.body')
    .then(cy.wrap)
    .find('input')
    .type(card.cvc);
});

Cypress.Commands.add('confirmPayment', () => {
  cy.get('[data-testid="confirm-payment-btn"]').click();
});

Cypress.Commands.add('waitForPaymentProcessing', () => {
  cy.get('[data-testid="payment-processing"]', { timeout: 30000 }).should('not.exist');
});
