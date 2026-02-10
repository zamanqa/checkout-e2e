// shopify-stripe-paypal.cy.js - Shopify + Stripe + PayPal Checkout Test

import CheckoutPage from '../../../support/page-objects/CheckoutPage';
import StripeComponent from '../../../support/page-objects/payment/StripeComponent';
import ApiHealthCheck from '../../../support/helpers/api-health-check';
import '../../../support/helpers/db-helper';
import apiKeys from '../../../fixtures/api-keys-cartid.json';
import checkoutData from '../../../fixtures/checkout-data.json';

describe('Shopify + Stripe + PayPal Checkout', () => {
  const apiHealthCheck = new ApiHealthCheck();
  const testData = checkoutData.germany;

  before(() => {
    // Run API health check before all tests
    apiHealthCheck.checkAllApis();
  });

  beforeEach(() => {
    // Build URL from fixtures
    const checkoutUrl = Cypress.env('CHECKOUT_URL');
    const apiKey = apiKeys.shopifyStripe.api_key;
    const cartId = apiKeys.shopifyStripe.cart_id;
    const url = `${checkoutUrl}${apiKey}/${cartId}`;

    cy.visit(url);
    cy.wait(2000);
  });

  it('Complete an Order for Shopify Stripe PayPal and Validate in CMS Database', function () {
    cy.log('========== Shopify Stripe PayPal Checkout Test ==========');

    // Step 1: Verify page loaded
    cy.log('--- Step 1: Verify checkout page loaded ---');
    cy.url().should('include', apiKeys.shopifyStripe.api_key);
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

    cy.wait(5000);

    // Step 7: Enter notes (if available)
    cy.log('--- Step 7: Enter notes ---');
    CheckoutPage.enterNotes(testData.notes);

    // Step 8: Click Continue to proceed to payment
    cy.log('--- Step 8: Click Continue ---');
    CheckoutPage.clickContinue();

    // Step 9: Select PayPal payment method
    cy.log('--- Step 9: Select PayPal payment method ---');
    StripeComponent.selectPayPal();

    cy.wait(3000);

    // Step 10: Check all required checkboxes (Terms & Conditions)
    cy.log('--- Step 10: Check all checkboxes ---');
    CheckoutPage.checkAllCheckboxes();
    cy.wait(2000);

    // Step 11: Click Pay button to complete order
    cy.log('--- Step 11: Click Pay button ---');
    cy.get("[data-test-id='btn-pay']").click();

    // Step 12: Wait for redirect to Stripe PayPal test payment page
    cy.log('--- Step 12: Waiting for Stripe redirect ---');
    cy.url({ timeout: 60000 }).should('include', 'stripe.com');

    // Step 13: Authorize test payment on Stripe's cross-origin page
    cy.log('--- Step 13: Authorize test payment ---');
    cy.origin('https://stripe.com', () => {
      // Wait for page to fully load
      cy.wait(5000);

      // Click on "Authorize Test Payment" button
      cy.get('[data-testid="authorize-test-payment-button"]', { timeout: 30000 })
        .should('be.visible')
        .click();

      cy.log('✓ Clicked Authorize Test Payment');
    });

    // Step 14: Wait for redirect back and verify order confirmation
    cy.log('--- Step 14: Verify order confirmation ---');
    cy.url({ timeout: 60000 }).should('include', 'confirmation');
    CheckoutPage.saveOrderNumber();

    // Step 15: Validate order in CMS Database
    cy.log('--- Step 15: Validate order in database ---');
    cy.checkOrderExistsInDatabase();

    cy.log('========== Test Completed Successfully ==========');
  });
});
