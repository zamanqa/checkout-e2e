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

  // ==================== CARD FORM INPUTS ====================
  // Mollie now renders card fields as direct DOM inputs (no iframes)

  // Selector
  get cardNumberInput() {
    return cy.get('input#cardNumber');
  }

  // Selector
  get cardHolderInput() {
    return cy.get('input#cardHolder');
  }

  // Selector
  get expiryDateInput() {
    return cy.get('input#cardExpiryDate');
  }

  // Selector
  get cvcInput() {
    return cy.get('input#cardCvv');
  }

  // ==================== ACTIONS ====================

  // Action - Fill all card details
  fillCardDetails(cardNumber, cardName, expireDate, cvc) {
    // Card Number
    this.cardNumberInput
      .should('be.visible')
      .clear()
      .type(cardNumber);

    // Card Holder Name
    this.cardHolderInput
      .should('be.visible')
      .clear()
      .type(cardName);

    // Expiry Date
    this.expiryDateInput
      .should('be.visible')
      .clear()
      .type(expireDate);

    // CVC
    this.cvcInput
      .should('be.visible')
      .clear()
      .type(cvc);

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
