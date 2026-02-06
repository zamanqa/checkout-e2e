// AdyenComponent.js - Adyen Payment Component
// Handles Adyen Drop-in and 3DS authentication

class AdyenComponent {
  // ==================== PAYMENT METHOD SELECTION ====================

  // Selector
  get creditCardButton() {
    return cy.get("button[data-test-id='selection-btn-scheme']");
  }

  // Action
  selectCreditCard() {
    this.creditCardButton.click();
    cy.log('✓ Selected Adyen Credit Card');
  }

  // ==================== CARD FORM IFRAMES ====================

  // Selector
  get cardNumberIframe() {
    return cy.get('iframe[title*="Iframe for card number"]');
  }

  // Selector
  get expiryDateIframe() {
    return cy.get('iframe[title*="Iframe for expiry date"]');
  }

  // Selector
  get cvcIframe() {
    return cy.get('iframe[title*="Iframe for security code"]');
  }

  // Selector
  get cardHolderNameInput() {
    return cy.get('input[name="holderName"]');
  }

  // ==================== CARD ACTIONS ====================

  // Action
  fillCardNumber(cardNumber) {
    this.cardNumberIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .find("input[data-fieldtype='encryptedCardNumber']")
          .click()
          .type(cardNumber);
      });
    cy.wait(1000);
  }

  // Action
  fillExpiryDate(expiry) {
    this.expiryDateIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .find("input[data-fieldtype='encryptedExpiryDate']")
          .click()
          .type(expiry);
      });
    cy.wait(1000);
  }

  // Action
  fillCvc(cvc) {
    this.cvcIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .find("input[data-fieldtype='encryptedSecurityCode']")
          .click()
          .type(cvc);
      });
    cy.wait(1000);
  }

  // Action
  fillHolderName(name) {
    this.cardHolderNameInput.click().type(name);
  }

  // Action - Fill all card details
  fillCardDetails(cardNumber, expiry, cvc, holderName) {
    this.selectCreditCard();
    this.fillCardNumber(cardNumber);
    this.fillExpiryDate(expiry);
    this.fillCvc(cvc);
    this.fillHolderName(holderName);
    cy.log('✓ Filled Adyen card details');
  }

  // Action - Select and submit
  selectAndSubmit() {
    cy.contains('Select').click();
    cy.wait(5000);
    cy.get("button[data-test-id='btn-pay']").click();
    cy.log('✓ Submitted Adyen payment');
  }

  // ==================== 3DS AUTHENTICATION ====================

  // Selector
  get threeDsIframe() {
    return cy.get('iframe[title*="components iframe"]');
  }

  // Action - Handle 3DS authentication
  handle3dsAuth(password = 'password') {
    cy.wait(15000);
    this.threeDsIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find('input.input-field').click().type(password);
        cy.wait(1000);
        cy.wrap($body).find('#buttonSubmit').click();
      });
    cy.wait(10000);
    cy.log('✓ Completed 3DS authentication');
  }
}

export default new AdyenComponent();
