// Main support file — loaded before every spec
import './commands';
import 'cypress-mochawesome-reporter/register';
import '@cypress/grep';

// Global hooks
beforeEach(() => {
  cy.log(`**Running**: ${Cypress.currentTest.titlePath.join(' > ')}`);
});

// Suppress uncaught exceptions from third-party payment scripts
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Stripe') ||
    err.message.includes('adyen') ||
    err.message.includes('paypal') ||
    err.message.includes('braintree')
  ) {
    return false;
  }
});
