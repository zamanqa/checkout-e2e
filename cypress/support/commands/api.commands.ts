// Generic API helper commands for setup/teardown

Cypress.Commands.add(
  'apiRequest',
  (method: string, endpoint: string, body?: object) => {
    return cy.request({
      method,
      url: `${Cypress.env('API_BASE_URL')}${endpoint}`,
      body,
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  },
);

Cypress.Commands.add('apiSetupTestData', (apiKey: string, scenario: string) => {
  cy.fixture(`carts/${scenario}`).then((data) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_BASE_URL')}/${apiKey}/cart`,
      body: data,
    });
  });
});

Cypress.Commands.add('apiCleanupTestData', (apiKey: string, cartId: string) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('API_BASE_URL')}/${apiKey}/cart/${cartId}`,
    failOnStatusCode: false,
  });
});
