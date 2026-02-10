// shopify-adyen-card.cy.js - Shopify + Adyen + Card Checkout Test

import CheckoutPage from '../../../support/page-objects/CheckoutPage';
import AdyenComponent from '../../../support/page-objects/payment/AdyenComponent';
import ApiHealthCheck from '../../../support/helpers/api-health-check';
import '../../../support/helpers/db-helper';
import apiKeys from '../../../fixtures/api-keys-cartid.json';
import checkoutData from '../../../fixtures/checkout-data.json';

describe('Shopify + Adyen + Card Checkout', () => {
  const apiHealthCheck = new ApiHealthCheck();
  const testData = checkoutData.germany;
  const paymentData = checkoutData.payment.adyen;

  before(() => {
    // Run API health check before all tests
    apiHealthCheck.checkAllApis();
  });

  beforeEach(() => {
    // Build URL from fixtures
    const checkoutUrl = Cypress.env('CHECKOUT_URL');
    const apiKey = apiKeys.shopifyAdyen.api_key;
    const cartId = apiKeys.shopifyAdyen.cart_id;
    const url = `${checkoutUrl}${apiKey}/${cartId}`;

    cy.visit(url);
    cy.wait(2000);
  });

  it('Complete an Order for Shopify Adyen Card and Validate in CMS Database', function () {
    cy.log('========== Shopify Adyen Card Checkout Test ==========');

    // Step 1: Verify page loaded
    cy.log('--- Step 1: Verify checkout page loaded ---');
    cy.url().should('include', apiKeys.shopifyAdyen.api_key);
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

    // Step 9: Select Pay with card (Credit Card)
    cy.log('--- Step 9: Select Pay with card ---');
    AdyenComponent.selectCreditCard();
    cy.wait(2000);

    // Step 10: Fill Adyen card details
    cy.log('--- Step 10: Fill Adyen card details ---');
    AdyenComponent.fillCardNumber(paymentData.cardNumber);
    AdyenComponent.fillExpiryDate(paymentData.expireDate);
    AdyenComponent.fillCvc(paymentData.cvc);
    AdyenComponent.fillHolderName(paymentData.cardName);
    cy.wait(2000);

    // Step 11: Click Select button
    cy.log('--- Step 11: Click Select ---');
    cy.contains('Select').click();
    cy.wait(3000);

    // Step 12: Check all required checkboxes (Terms & Conditions)
    cy.log('--- Step 12: Check all checkboxes ---');
    CheckoutPage.checkAllCheckboxes();
    cy.wait(2000);

    // Step 13: Click Pay button
    cy.log('--- Step 13: Click Pay button ---');
    CheckoutPage.clickPay();
    cy.wait(15000);

    // Step 14: Handle 3DS authentication - Enter password and click Continue
    cy.log('--- Step 14: Handle 3DS authentication ---');
    AdyenComponent.handle3dsAuth('password');

    // Step 15: Verify order confirmation and save order number
    cy.log('--- Step 15: Verify order confirmation ---');
    cy.url({ timeout: 60000 }).should('include', 'confirmation');
    CheckoutPage.saveOrderNumber();

    // Step 16: Validate order in CMS Database
    cy.log('--- Step 16: Validate order in database ---');
    cy.wait(20000);
    cy.checkOrderExistsInDatabase();

    cy.log('========== Test Completed Successfully ==========');
  });
});
