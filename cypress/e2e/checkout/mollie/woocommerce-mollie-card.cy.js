// woocommerce-mollie-card.cy.js - WooCommerce + Mollie + Card Checkout Test

import CheckoutPage from '../../../support/page-objects/CheckoutPage';
import MollieComponent from '../../../support/page-objects/payment/MollieComponent';
import ApiHealthCheck from '../../../support/helpers/api-health-check';
import '../../../support/helpers/db-helper';
import apiKeys from '../../../fixtures/api-keys-cartid.json';
import checkoutData from '../../../fixtures/checkout-data.json';

describe('WooCommerce + Mollie + Card Checkout', () => {
  const apiHealthCheck = new ApiHealthCheck();
  const testData = checkoutData.germany;
  const paymentData = checkoutData.payment.mollie;

  before(() => {
    // Run API health check before all tests
    apiHealthCheck.checkAllApis();
  });

  beforeEach(() => {
    // Build URL from fixtures
    const checkoutUrl = Cypress.env('CHECKOUT_URL');
    const apiKey = apiKeys.woocommerceMollie.api_key;
    const cartId = apiKeys.woocommerceMollie.cart_id;
    const url = `${checkoutUrl}${apiKey}/${cartId}`;

    cy.visit(url);
    cy.wait(2000);
  });

  it('Complete an Order for WooCommerce Mollie Card and Validate in CMS Database', function () {
    cy.log('========== WooCommerce Mollie Card Checkout Test ==========');

    // Step 1: Verify page loaded
    cy.log('--- Step 1: Verify checkout page loaded ---');
    cy.url().should('include', apiKeys.woocommerceMollie.api_key);
    cy.contains('Address & Payment').should('be.visible');

    // Step 2: Select delivery date (if available)
    cy.log('--- Step 2: Select delivery date ---');
    CheckoutPage.selectDeliveryDate();

    // Step 3: Enter company details (if available)
    cy.log('--- Step 3: Enter company details ---');
    CheckoutPage.enterCompany(testData.company);
    CheckoutPage.enterVatNumber(testData.vatNumber);

    // Step 4: Enter personal details
    cy.log('--- Step 4: Enter personal details ---');
    CheckoutPage.enterFirstName(testData.firstName);
    CheckoutPage.enterLastName(testData.lastName);
    CheckoutPage.enterEmail(); // Generates random email automatically
    CheckoutPage.enterPhone(testData.phone);

    // Step 5: Select date of birth (if available)
    cy.log('--- Step 5: Select date of birth ---');
    CheckoutPage.selectDateOfBirth();

    // Step 6: Enter address details
    cy.log('--- Step 6: Enter address details ---');
    CheckoutPage.enterStreet(testData.street);
    CheckoutPage.enterStreetNumber(testData.streetNumber);
    CheckoutPage.enterPostalCode(testData.postalCode);
    CheckoutPage.enterCity(testData.city);
    CheckoutPage.selectCountry(testData.country);
    cy.wait(2000);

    // Step 7: Enter notes (if available)
    cy.log('--- Step 7: Enter notes ---');
    CheckoutPage.enterNotes(testData.notes);

    // Step 8: Select Mollie Credit Card payment method
    cy.log('--- Step 8: Select Mollie Credit Card ---');
    MollieComponent.selectCreditCard();
    cy.wait(3000);

    // Step 9: Click Continue to proceed to Review & Confirm
    cy.log('--- Step 9: Click Continue ---');
    CheckoutPage.clickContinue();
    cy.wait(5000);

    // Step 10: Check all required checkboxes (Terms & Conditions)
    cy.log('--- Step 10: Check all checkboxes ---');
    CheckoutPage.checkAllCheckboxes();
    cy.wait(2000);

    // Step 11: Click Pay button to redirect to Mollie payment page
    cy.log('--- Step 11: Click Pay button ---');
    CheckoutPage.clickPay();

    // Step 12: Handle Mollie payment page (cross-origin)
    cy.log('--- Step 12: Fill Mollie card details ---');
    cy.url().then((mollieUrl) => {
      cy.log(`Mollie URL: ${mollieUrl}`);
      cy.visit(mollieUrl);
      cy.wait(5000);

      // Fill card details on Mollie page
      MollieComponent.fillCardDetails(
        paymentData.cardNumber,
        paymentData.cardName,
        paymentData.expireDate,
        paymentData.cvc
      );

      // Submit payment
      MollieComponent.submit();

      // Select Paid and Continue on test mode page
      MollieComponent.selectPaidAndContinue();
    });

    // Step 13: Verify order confirmation and save order number
    cy.log('--- Step 13: Verify order confirmation ---');
    cy.url({ timeout: 60000 }).should('include', 'confirmation');
    CheckoutPage.saveOrderNumber();

    // Step 14: Validate order in CMS Database
    cy.log('--- Step 14: Validate order in database ---');
    cy.checkOrderExistsInDatabase();

    cy.log('========== Test Completed Successfully ==========');
  });
});
