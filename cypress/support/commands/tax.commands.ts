// Tax verification commands

Cypress.Commands.add('verifyTaxCalculation', (expected: TaxCalculation) => {
  cy.get('[data-testid="tax-amount"]').should('contain', expected.expected_tax.toFixed(2));
  cy.get('[data-testid="order-total"]').should('contain', expected.expected_total.toFixed(2));
});

Cypress.Commands.add('verifyVatNumber', (vatNumber: string) => {
  cy.get('[data-testid="vat-number-input"]').clear();
  cy.get('[data-testid="vat-number-input"]').type(vatNumber);
  cy.get('[data-testid="validate-vat-btn"]').click();
  cy.get('[data-testid="vat-validation-status"]', { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('switchCountry', (alpha2: string) => {
  cy.get('[data-testid="select-country"]').select(alpha2);
  // Wait for tax recalculation
  cy.get('[data-testid="loading-spinner"]').should('not.exist');
});
