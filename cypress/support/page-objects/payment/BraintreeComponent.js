// BraintreeComponent.js - Braintree Payment Component
// Handles Braintree Drop-in UI

class BraintreeComponent {
  // ==================== PAYMENT METHOD SELECTION ====================

  // Selector
  get cardOption() {
    return cy.get('.braintree-option.braintree-option__card');
  }

  // Action
  selectCard() {
    this.cardOption.click();
    cy.log('✓ Selected Braintree Card');
  }

  // ==================== CARD FORM IFRAMES ====================

  // Selector
  get cardNumberIframe() {
    return cy.get('iframe[title*="Secure Credit Card Frame - Credit Card Number"]');
  }

  // Selector
  get expiryDateIframe() {
    return cy.get('iframe[title*="Secure Credit Card Frame - Expiration Date"]');
  }

  // Selector
  get cvcIframe() {
    return cy.get('iframe[title*="Secure Credit Card Frame - CVV"]');
  }

  // ==================== CARD ACTIONS ====================

  // Action
  fillCardNumber(cardNumber) {
    this.cardNumberIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find("input[name='credit-card-number']").click().type(cardNumber);
      });
    cy.wait(1000);
  }

  // Action
  fillExpiryDate(expiry) {
    this.expiryDateIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find("input[name='expiration']").click().type(expiry);
      });
    cy.wait(1000);
  }

  // Action
  fillCvc(cvc) {
    this.cvcIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find("input[name='cvv']").click().type(cvc);
      });
    cy.wait(1000);
  }

  // Action - Fill all card details
  fillCardDetails(cardNumber, expiry, cvc) {
    this.selectCard();
    this.fillCardNumber(cardNumber);
    this.fillExpiryDate(expiry);
    this.fillCvc(cvc);
    cy.log('✓ Filled Braintree card details');
  }

  // ==================== SUBMIT ====================

  // Selector
  get payButton() {
    return cy.get("button[data-test-id='btn-pay']");
  }

  // Action
  clickPay() {
    this.payButton.click();
    cy.wait(30000);
    cy.log('✓ Clicked Braintree Pay');
  }
}

export default new BraintreeComponent();
