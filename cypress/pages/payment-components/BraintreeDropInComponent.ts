export class BraintreeDropInComponent {
  private getBraintreeIframe() {
    return cy
      .get('[data-testid="braintree-dropin"] iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap);
  }

  fillCardNumber(cardNumber: string): this {
    this.getBraintreeIframe().find('#credit-card-number').type(cardNumber);
    return this;
  }

  fillExpiry(expiry: string): this {
    this.getBraintreeIframe().find('#expiration').type(expiry);
    return this;
  }

  fillCvv(cvv: string): this {
    this.getBraintreeIframe().find('#cvv').type(cvv);
    return this;
  }

  fillCard(card: PaymentCard): this {
    this.fillCardNumber(card.number);
    this.fillExpiry(card.expiry);
    this.fillCvv(card.cvc);
    return this;
  }

  selectPayPal(): this {
    cy.get('[data-testid="braintree-paypal-btn"]').click();
    return this;
  }

  selectApplePay(): this {
    cy.get('[data-testid="braintree-applepay-btn"]').click();
    return this;
  }

  selectGooglePay(): this {
    cy.get('[data-testid="braintree-googlepay-btn"]').click();
    return this;
  }
}
