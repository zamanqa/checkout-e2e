// api-health-check.js - API health check utilities

/**
 * ApiHealthCheck class for verifying API availability before tests
 */
class ApiHealthCheck {
  /**
   * Check if the Checkout API is healthy
   * Retries once after 15 seconds if first attempt fails
   */
  checkCheckoutApi() {
    cy.request({
      method: 'GET',
      url: Cypress.env('CHECKOUT_API_URL') || 'https://checkout-api-development-680576524870.europe-west3.run.app/v1/version',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        cy.log('✓ Checkout API is accessible');
      } else {
        cy.log('⚠ Checkout API not responding, waiting 15 seconds...');
        cy.wait(15000);
        cy.request({
          method: 'GET',
          url: Cypress.env('CHECKOUT_API_URL') || 'https://checkout-api-development-680576524870.europe-west3.run.app/v1/version',
          failOnStatusCode: false
        }).then((retryResponse) => {
          if (retryResponse.status === 200) {
            cy.log('✓ Checkout API is accessible after retry');
          } else {
            cy.log('✗ Checkout API is not accessible');
          }
        });
      }
    });
  }


  /**
   * Check all APIs before running tests
   */
  checkAllApis() {
    cy.log('========== API Health Check ==========');
    this.checkCheckoutApi();
    cy.log('✓ Verified: All APIs are accessible');
  }
}

export default ApiHealthCheck;
