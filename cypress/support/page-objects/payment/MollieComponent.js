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

  // Selector - SEPA Direct Debit button
  get sepaButton() {
    return cy.get("button[data-test-id='mollie-payment-method-sepa']");
  }

  // Action
  selectSepa() {
    this.sepaButton.click();
    cy.log('✓ Selected Mollie SEPA Direct Debit');
  }

  // ==================== SEPA FORM ====================

  // Selector - IBAN input
  get sepaIbanInput() {
    return cy.get("#input-v-0-0-0-5");
  }

  // Action - Enter IBAN
  enterSepaIban(iban) {
    this.sepaIbanInput.clear().type(iban);
    cy.log(`✓ Entered SEPA IBAN: ${iban}`);
  }

  // Selector - SEPA Select/Submit button
  get sepaSubmitButton() {
    return cy.get("button[data-test-id='mollie-sepa-submit']");
  }

  // Action - Click SEPA Select button
  clickSepaSelect() {
    this.sepaSubmitButton.click();
    cy.log('✓ Clicked SEPA Select button');
  }

  // Action - Fill SEPA details and select
  fillSepaAndSelect(iban) {
    this.enterSepaIban(iban);
    cy.wait(1000);
    //this.clickSepaSelect();
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
    cy.wait(10000);
    cy.log('✓ Submitted Mollie payment');
  }

  // ==================== MOLLIE TEST MODE PAGE ====================

  // Selector - Paid radio button
  get paidRadioButton() {
    return cy.get('input[type="radio"][value="paid"]');
  }

  // Selector - Continue button
  get continueButton() {
    return cy.get('.button.form__button');
  }

  // Action - Select Paid status and click Continue
  selectPaidAndContinue() {
    // Select "Paid" radio button
    this.paidRadioButton.click();
    cy.log('✓ Selected Paid status');

    // Click Continue button
    this.continueButton.click();
    cy.log('✓ Clicked Continue on Mollie test page');

    // Wait for redirect back to checkout
    cy.wait(30000);
  }
}

export default new MollieComponent();
