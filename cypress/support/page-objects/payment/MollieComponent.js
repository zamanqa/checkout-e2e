// MollieComponent.js - Mollie Payment Component
// Handles Mollie payment flow and iframes

class MollieComponent {
  // ==================== PAYMENT METHOD SELECTION ====================

  // Selector
  get creditCardButton() {
    return cy.get("button[data-test-id='mollie-payment-method-creditcard']");
  }

  // Action
  selectCreditCard() {
    this.creditCardButton.click();
    cy.log('✓ Selected Mollie Credit Card');
  }

  // ==================== CARD FORM IFRAMES ====================

  // Selector
  get cardNumberIframe() {
    return cy.get('iframe[title*="cardNumber input"]');
  }

  // Selector
  get cardHolderIframe() {
    return cy.get('iframe[title*="cardHolder input"]');
  }

  // Selector
  get expiryDateIframe() {
    return cy.get('iframe[title*="expiryDate input"]');
  }

  // Selector
  get cvcIframe() {
    return cy.get('iframe[title*="verificationCode input"]');
  }

  // ==================== ACTIONS ====================

  // Action - Fill all card details
  fillCardDetails(cardNumber, cardName, expireDate, cvc) {
    // Card Number
    this.cardNumberIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find('div.input-container').type(cardNumber);
      });

    // Card Holder Name
    this.cardHolderIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find('div.input-container').type(cardName);
      });

    // Expiry Date
    this.expiryDateIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find('div.input-container').type(expireDate);
      });

    // CVC
    this.cvcIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find('div.input-container').type(cvc);
      });

    cy.log('✓ Filled Mollie card details');
  }

  // Selector
  get submitButton() {
    return cy.get('#submit-button');
  }

  // Action
  submit() {
    this.submitButton.click();
    cy.wait(30000);
    cy.log('✓ Submitted Mollie payment');
  }
}

export default new MollieComponent();
