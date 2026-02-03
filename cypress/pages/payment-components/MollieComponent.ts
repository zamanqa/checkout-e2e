export class MollieComponent {
  selectPaymentMethod(method: string): this {
    cy.get(`[data-testid="mollie-method-${method}"]`).click();
    return this;
  }

  verifyAvailableMethods(methods: string[]): this {
    methods.forEach((method) => {
      cy.get(`[data-testid="mollie-method-${method}"]`).should('exist');
    });
    return this;
  }

  selectSepaBank(bankName: string): this {
    cy.get('[data-testid="mollie-sepa-bank"]').select(bankName);
    return this;
  }

  fillSepaIban(iban: string): this {
    cy.get('[data-testid="mollie-sepa-iban"]').clear();
    cy.get('[data-testid="mollie-sepa-iban"]').type(iban);
    return this;
  }

  confirmPayment(): this {
    cy.get('[data-testid="mollie-confirm-btn"]').click();
    return this;
  }
}
