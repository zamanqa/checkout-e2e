export class StripeElementsComponent {
  private getStripeIframe(fieldName: string) {
    return cy
      .get(`[data-testid="stripe-${fieldName}"] iframe`)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap);
  }

  fillCardNumber(cardNumber: string): this {
    this.getStripeIframe('card-number').find('input[name="cardnumber"]').type(cardNumber);
    return this;
  }

  fillExpiry(expiry: string): this {
    this.getStripeIframe('card-expiry').find('input[name="exp-date"]').type(expiry);
    return this;
  }

  fillCvc(cvc: string): this {
    this.getStripeIframe('card-cvc').find('input[name="cvc"]').type(cvc);
    return this;
  }

  fillCard(card: PaymentCard): this {
    this.fillCardNumber(card.number);
    this.fillExpiry(card.expiry);
    this.fillCvc(card.cvc);
    return this;
  }

  verifyCardError(errorText: string) {
    cy.get('[data-testid="stripe-card-error"]').should('contain.text', errorText);
  }
}
