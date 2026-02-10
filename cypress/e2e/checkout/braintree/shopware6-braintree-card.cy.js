// shopware6-braintree-card.cy.js - Shopware6 + Braintree + Card Checkout Test

import CheckoutPage from '../../../support/page-objects/CheckoutPage';
import BraintreeComponent from '../../../support/page-objects/payment/BraintreeComponent';
import ApiHealthCheck from '../../../support/helpers/api-health-check';
import '../../../support/helpers/db-helper';
import apiKeys from '../../../fixtures/api-keys-cartid.json';
import checkoutData from '../../../fixtures/checkout-data.json';

describe('Shopware6 + Braintree + Card Checkout', () => {
  const apiHealthCheck = new ApiHealthCheck();
  const testData = checkoutData.germany;
  const paymentData = checkoutData.payment.braintree;

  before(() => {
    // Run API health check before all tests
    apiHealthCheck.checkAllApis();
  });

  beforeEach(() => {
    // Build URL from fixtures
    const checkoutUrl = Cypress.env('CHECKOUT_URL');
    const apiKey = apiKeys.shopware6Braintree.api_key;
    const cartId = apiKeys.shopware6Braintree.cart_id;
    const url = `${checkoutUrl}${apiKey}/${cartId}`;

    cy.visit(url);
    cy.wait(2000);
  });

  it('Complete an Order for Shopware6 Braintree Card and Validate in CMS Database', function () {
    cy.log('========== Shopware6 Braintree Card Checkout Test ==========');

    // Step 1: Verify page loaded
    cy.log('--- Step 1: Verify checkout page loaded ---');
    cy.url().should('include', apiKeys.shopware6Braintree.api_key);
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

    // Step 8: Click Continue to proceed to Review & Confirm
    cy.log('--- Step 8: Click Continue ---');
    CheckoutPage.clickContinue();
    cy.wait(5000);

    // Step 9: Select Card payment option
    cy.log('--- Step 9: Select Card payment ---');
    BraintreeComponent.selectCard();
    cy.wait(2000);

    // Step 10: Fill Braintree card details (Card Number, Expiry, CVV in iframes)
    cy.log('--- Step 10: Fill card details ---');
    BraintreeComponent.fillCardNumber(paymentData.cardNumber);
    BraintreeComponent.fillExpiryDate(paymentData.expireDate);
    BraintreeComponent.fillCvc(paymentData.cvc);
    cy.wait(2000);

    // Step 11: Check all required checkboxes (Terms & Conditions)
    cy.log('--- Step 11: Check all checkboxes ---');
    CheckoutPage.checkAllCheckboxes();
    cy.wait(2000);

    // Step 12: Click Pay button
    cy.log('--- Step 12: Click Pay button ---');
    CheckoutPage.clickPay();

    // Step 13: Verify order confirmation and save order number
    cy.log('--- Step 13: Verify order confirmation ---');
    cy.url({ timeout: 60000 }).should('include', 'confirmation');
    CheckoutPage.saveOrderNumber();

    // Step 14: Validate order in CMS Database
    cy.log('--- Step 14: Validate order in database ---');
    cy.wait(20000);
    cy.checkOrderExistsInDatabase();

    cy.log('========== Test Completed Successfully ==========');
  });
});
