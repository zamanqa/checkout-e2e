// StripeComponent.js - Stripe Payment Component
// Handles Stripe iframe interactions

class StripeComponent {
  // ==================== SELECTORS ====================

  // Selector - New Stripe Payment Element iframe
  get paymentIframe() {
    return cy.get('iframe[title*="Secure payment input frame"]');
  }

  // Selector - Legacy Stripe Card iframe
  get cardIframe() {
    return cy.get('iframe[title*="Secure card payment input frame"]');
  }

  // ==================== CARD PAYMENT ====================

  // Action - Fill card details (new Payment Element)
  fillCardDetails(cardNumber, expiry, cvc) {
    this.paymentIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find('[name="number"]').clear().type(cardNumber);
        cy.wrap($body).find('input[name="expiry"]').clear().type(expiry);
        cy.wrap($body).find('input[name="cvc"]').clear().type(cvc);
      });
    cy.contains('Select').click();
    cy.wait(5000);
    cy.log('✓ Filled Stripe card details');
  }

  // Action - Fill card details (legacy)
  fillCardDetailsLegacy(cardNumber, expiry, cvc, postalCode) {
    cy.contains('Pay with Card').click();
    this.cardIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find('[name="cardnumber"]').type(cardNumber);
        cy.wrap($body).find('input[name="exp-date"]').type(expiry);
        cy.wrap($body).find('input[name="cvc"]').type(cvc);
        cy.wrap($body).find('input[name="postal"]').type(postalCode);
      });
    cy.log('✓ Filled Stripe card details (legacy)');
  }

  // ==================== SEPA DEBIT ====================

  // Action - Fill SEPA debit
  fillSepaDebit(iban) {
    this.paymentIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find('[data-testid="sepa_debit"]').click();
        cy.wrap($body).find('input[name="iban"]').clear().type(iban);
      });
    cy.contains('Select').click();
    cy.wait(5000);
    cy.log('✓ Filled SEPA debit details');
  }

  // ==================== BACS DEBIT ====================

  // Action - Fill BACS debit
  fillBacsDebit(sortCode, accountNumber) {
    this.paymentIframe
      .should('have.length', 1)
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find('[data-testid="bacs_debit"]').click();
        cy.wrap($body).find('input[name="sortCode"]').clear().type(sortCode);
        cy.wrap($body).find('input[name="accountNumber"]').clear().type(accountNumber);
        cy.wrap($body).find('[id="Field-termsConfirmationCheckbox"]').click();
      });
    cy.wait(5000);
    cy.contains('Select').click();
    cy.wait(5000);
    cy.log('✓ Filled BACS debit details');
  }

  // Action - Confirm BACS payment
  confirmBacsPayment() {
    cy.get('iframe[allow="payment *"]').then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wait(5000);
      cy.wrap($body).find('div.SubmitButton-IconContainer').click({ force: true });
      cy.wait(5000);
    });
    cy.log('✓ Confirmed BACS payment');
  }
}

export default new StripeComponent();
