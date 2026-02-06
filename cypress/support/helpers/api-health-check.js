// api-health-check.js - API health check utilities

/**
 * Check if the checkout API is healthy
 * @param {string} baseUrl - The base URL to check
 * @returns {Cypress.Chainable} - Health check result
 */
export const checkApiHealth = (baseUrl) => {
  return cy.request({
    url: baseUrl,
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('✓ API is healthy');
      return true;
    } else {
      cy.log(`⚠ API returned status: ${response.status}`);
      return false;
    }
  });
};

/**
 * Wait for API to be available
 * @param {string} baseUrl - The base URL to check
 * @param {number} maxAttempts - Maximum retry attempts
 * @param {number} delayMs - Delay between attempts in milliseconds
 */
export const waitForApi = (baseUrl, maxAttempts = 5, delayMs = 3000) => {
  let attempts = 0;

  const checkHealth = () => {
    attempts++;
    return cy.request({
      url: baseUrl,
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        cy.log(`✓ API available after ${attempts} attempt(s)`);
        return true;
      } else if (attempts < maxAttempts) {
        cy.wait(delayMs);
        return checkHealth();
      } else {
        throw new Error(`API not available after ${maxAttempts} attempts`);
      }
    });
  };

  return checkHealth();
};

export default {
  checkApiHealth,
  waitForApi,
};
