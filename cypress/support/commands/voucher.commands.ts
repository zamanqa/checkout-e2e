// Voucher commands

Cypress.Commands.add('applyVoucher', (code: string) => {
  cy.get('[data-testid="voucher-code-input"]').clear();
  cy.get('[data-testid="voucher-code-input"]').type(code);
  cy.get('[data-testid="apply-voucher-btn"]').click();
  cy.get('[data-testid="loading-spinner"]').should('not.exist');
});

Cypress.Commands.add('removeVoucher', () => {
  cy.get('[data-testid="remove-voucher-btn"]').click();
  cy.get('[data-testid="loading-spinner"]').should('not.exist');
});

Cypress.Commands.add('verifyVoucherDiscount', (expectedDiscount: number) => {
  cy.get('[data-testid="voucher-discount"]').should(
    'contain',
    expectedDiscount.toFixed(2),
  );
});
