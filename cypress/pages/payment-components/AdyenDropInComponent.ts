export class AdyenDropInComponent {
  private getAdyenIframe(fieldName: string) {
    return cy
      .get(`[data-testid="adyen-${fieldName}"] iframe`)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap);
  }

  fillCardNumber(cardNumber: string): this {
    this.getAdyenIframe('card-number').find('input').type(cardNumber);
    return this;
  }

  fillExpiry(expiry: string): this {
    this.getAdyenIframe('expiry').find('input').type(expiry);
    return this;
  }

  fillCvc(cvc: string): this {
    this.getAdyenIframe('cvc').find('input').type(cvc);
    return this;
  }

  fillCard(card: PaymentCard): this {
    this.fillCardNumber(card.number);
    this.fillExpiry(card.expiry);
    this.fillCvc(card.cvc);
    return this;
  }

  selectIdeal(bank: string): this {
    cy.get('[data-testid="adyen-ideal-selector"]').select(bank);
    return this;
  }
}
