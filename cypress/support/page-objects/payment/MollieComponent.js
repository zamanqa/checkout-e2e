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
    return cy.contains('label', 'IBAN').invoke('attr', 'for').then((id) => cy.get(`#${id}`));
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

  // ==================== INVOICE PAYMENT ====================

  // Selector - Pay with invoice button
  get invoiceButton() {
    return cy.get("button[data-test-id='select-invoice']");
  }

  // Action - Select Pay with invoice
  selectInvoice() {
    this.invoiceButton.click();
    cy.log('✓ Selected Pay with invoice');
  }

  // ==================== CARD FORM IFRAME ====================
  // Mollie renders all card fields inside a single iframe: title="Pay with card"
  // The inputs inside are direct DOM elements (no nested iframes)

  // Selector - the single card iframe
  get cardFormIframe() {
    return cy.get('iframe[title="Pay with card"]');
  }

  // Helper - returns the body inside the card iframe
  getCardIframeBody() {
    return this.cardFormIframe
      .should('be.visible')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap);
  }

  // ==================== ACTIONS ====================

  // Action - Fill all card details
  fillCardDetails(cardNumber, cardName, expireDate, cvc) {
    this.getCardIframeBody().within(() => {
      // Card Number
      cy.get('input#cardNumber')
        .should('be.visible')
        .clear()
        .type(cardNumber);

      // Expiry Date
      cy.get('input#cardExpiryDate')
        .should('be.visible')
        .clear()
        .type(expireDate);

      // CVC
      cy.get('input#cardCvv')
        .should('be.visible')
        .clear()
        .type(cvc);

      // Card Holder Name
      cy.get('input#cardHolder')
        .should('be.visible')
        .clear()
        .type(cardName);
    });

    cy.log('✓ Filled Mollie card details');
  }

  // Action
  submit() {
    this.getCardIframeBody().within(() => {
      cy.get('button[type="submit"]').contains('Pay with card').click();
    });
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
