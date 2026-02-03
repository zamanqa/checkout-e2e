// Reusable API client for test setup/teardown

const API_BASE = () => Cypress.env('API_BASE_URL');

export const ApiClient = {
  createCart(apiKey: string, body: object = {}) {
    return cy.request('POST', `${API_BASE()}/${apiKey}/cart`, body);
  },

  deleteCart(apiKey: string, cartId: string) {
    return cy.request({ method: 'DELETE', url: `${API_BASE()}/${apiKey}/cart/${cartId}`, failOnStatusCode: false });
  },

  getCart(apiKey: string, cartId: string) {
    return cy.request('GET', `${API_BASE()}/${apiKey}/cart/${cartId}`);
  },
};
