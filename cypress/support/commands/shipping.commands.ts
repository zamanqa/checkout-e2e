// Shipping commands

Cypress.Commands.add('selectShippingMethod', (methodId: string) => {
  cy.get(`[data-testid="shipping-method-${methodId}"]`).click();
  cy.get('[data-testid="loading-spinner"]').should('not.exist');
});

Cypress.Commands.add('verifyShippingCost', (expectedCost: number) => {
  cy.get('[data-testid="shipping-cost"]').should('contain', expectedCost.toFixed(2));
});

Cypress.Commands.add('verifyAvailableShippingMethods', (expectedMethods: string[]) => {
  expectedMethods.forEach((method) => {
    cy.get(`[data-testid="shipping-method-${method}"]`).should('exist');
  });
});
