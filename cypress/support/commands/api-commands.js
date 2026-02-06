// api-commands.js - API helper commands

/**
 * Make API request with standard headers
 * @param {string} method - HTTP method
 * @param {string} url - Request URL
 * @param {object} body - Request body (optional)
 */
Cypress.Commands.add('apiRequest', (method, url, body = null) => {
  const options = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    failOnStatusCode: false,
  };

  if (body) {
    options.body = body;
  }

  return cy.request(options);
});

/**
 * Check API health
 * @param {string} url - URL to check
 */
Cypress.Commands.add('checkApiHealth', (url) => {
  cy.request({
    url,
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('✓ API is healthy');
    } else {
      cy.log(`⚠ API status: ${response.status}`);
    }
  });
});
