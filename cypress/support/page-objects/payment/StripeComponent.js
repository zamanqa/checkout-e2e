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
  // First selects "Card" option, then fills card number, expiry, CVC
  fillCardDetails(cardNumber, expiry, cvc) {
    // Wait for Stripe iframe to load
    cy.wait(3000);

    this.paymentIframe
      .should('exist')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');

        // Step 1: Click on "Card" payment method option (handles dynamic position)
        cy.wrap($body).find('[data-testid="card"]').click({ force: true });
        cy.log('✓ Selected Card payment method');
        cy.wait(1000);

        // Step 2: Fill card number
        cy.wrap($body).find('input[name="number"]').clear().type(cardNumber);
        cy.log('✓ Entered card number');

        // Step 3: Fill expiry date
        cy.wrap($body).find('input[name="expiry"]').clear().type(expiry);
        cy.log('✓ Entered expiry date');

        // Step 4: Fill CVC
        cy.wrap($body).find('input[name="cvc"]').clear().type(cvc);
        cy.log('✓ Entered CVC');
      });

    // Click Select button to confirm payment method
    cy.wait(2000);
    cy.get("[data-test-id='next-step']").contains('Select').click();
    cy.log('✓ Clicked Select button');
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

  // ==================== PAYPAL ====================

  // Action - Select PayPal payment method
  // Clicks on PayPal option, then clicks Select button
  selectPayPal() {
    // Wait for Stripe iframe to load
    cy.wait(3000);

    this.paymentIframe
      .should('exist')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');

        // Click on "PayPal" payment method option (handles dynamic position)
        cy.wrap($body).find('[data-testid="paypal"]').click({ force: true });
        cy.log('✓ Selected PayPal payment method');
      });

    // Click Select button to confirm payment method
    cy.wait(2000);
    cy.get("[data-test-id='next-step']").contains('Select').click();
    cy.log('✓ Clicked Select button');
    cy.wait(3000);
    cy.log('✓ PayPal payment method selected');
  }

  // ==================== SEPA DEBIT ====================

  // Action - Fill SEPA debit
  // First selects "SEPA Debit" option, then fills IBAN
  fillSepaDebit(iban) {
    // Wait for Stripe iframe to load
    cy.wait(3000);

    this.paymentIframe
      .should('exist')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');

        // Step 1: Click on "SEPA Debit" payment method option (handles dynamic position)
        cy.wrap($body).find('[data-testid="sepa_debit"]').click({ force: true });
        cy.log('✓ Selected SEPA Debit payment method');
        cy.wait(1000);

        // Step 2: Fill IBAN
        cy.wrap($body).find('input[name="iban"]').clear().type(iban);
        cy.log('✓ Entered IBAN');
      });

    // Click Select button to confirm payment method
    cy.wait(2000);
    cy.get("[data-test-id='next-step']").contains('Select').click();
    cy.log('✓ Clicked Select button');
    cy.wait(5000);
    cy.log('✓ Filled SEPA Debit details');
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
