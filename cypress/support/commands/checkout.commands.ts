// Checkout flow commands

Cypress.Commands.add(
  'completeCheckout',
  (options: { address: Address; shippingMethod?: string; paymentMethod?: string }) => {
    cy.fillAddressForm(options.address);

    if (options.shippingMethod) {
      cy.selectShippingMethod(options.shippingMethod);
    }

    cy.proceedToPayment();

    if (options.paymentMethod) {
      cy.selectPaymentMethod(options.paymentMethod);
    }
  },
);

Cypress.Commands.add('fillAddressForm', (address: Address) => {
  cy.get('[data-testid="input-first-name"]').clear();
  cy.get('[data-testid="input-first-name"]').type(address.first_name);
  cy.get('[data-testid="input-last-name"]').clear();
  cy.get('[data-testid="input-last-name"]').type(address.last_name);
  cy.get('[data-testid="input-street"]').clear();
  cy.get('[data-testid="input-street"]').type(address.street);
  cy.get('[data-testid="input-city"]').clear();
  cy.get('[data-testid="input-city"]').type(address.city);
  cy.get('[data-testid="input-postal-code"]').clear();
  cy.get('[data-testid="input-postal-code"]').type(address.postal_code);
  cy.get('[data-testid="select-country"]').select(address.alpha2);
});

Cypress.Commands.add('fillBillingAddress', (address: Address) => {
  cy.get('[data-testid="billing-first-name"]').clear();
  cy.get('[data-testid="billing-first-name"]').type(address.first_name);
  cy.get('[data-testid="billing-last-name"]').clear();
  cy.get('[data-testid="billing-last-name"]').type(address.last_name);
  cy.get('[data-testid="billing-street"]').clear();
  cy.get('[data-testid="billing-street"]').type(address.street);
  cy.get('[data-testid="billing-city"]').clear();
  cy.get('[data-testid="billing-city"]').type(address.city);
  cy.get('[data-testid="billing-postal-code"]').clear();
  cy.get('[data-testid="billing-postal-code"]').type(address.postal_code);
  cy.get('[data-testid="billing-country"]').select(address.alpha2);
});

Cypress.Commands.add('proceedToPayment', () => {
  cy.get('[data-testid="proceed-to-payment-btn"]').click();
});
