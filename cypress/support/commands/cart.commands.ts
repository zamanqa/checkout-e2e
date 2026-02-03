// Cart lifecycle commands

Cypress.Commands.add('createCart', (apiKey: string, items: CartItem[] = []) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('API_BASE_URL')}/${apiKey}/cart`,
      body: { items },
    })
    .its('body');
});

Cypress.Commands.add('getCart', (apiKey: string, cartId: string) => {
  return cy
    .request({
      method: 'GET',
      url: `${Cypress.env('API_BASE_URL')}/${apiKey}/cart/${cartId}`,
    })
    .its('body');
});

Cypress.Commands.add(
  'addItemToCart',
  (apiKey: string, cartId: string, item: CartItem) => {
    return cy
      .request({
        method: 'POST',
        url: `${Cypress.env('API_BASE_URL')}/${apiKey}/cart/${cartId}/items`,
        body: item,
      })
      .its('body');
  },
);

Cypress.Commands.add(
  'updateItemQuantity',
  (apiKey: string, cartId: string, itemId: string, quantity: number) => {
    return cy
      .request({
        method: 'PATCH',
        url: `${Cypress.env('API_BASE_URL')}/${apiKey}/cart/${cartId}/items/${itemId}`,
        body: { quantity },
      })
      .its('body');
  },
);

Cypress.Commands.add('deleteCart', (apiKey: string, cartId: string) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('API_BASE_URL')}/${apiKey}/cart/${cartId}`,
  });
});

Cypress.Commands.add('seedCartViaApi', (apiKey: string, fixtureName: string) => {
  return cy.fixture(`carts/${fixtureName}`).then((cartData) => {
    return cy
      .request({
        method: 'POST',
        url: `${Cypress.env('API_BASE_URL')}/${apiKey}/cart`,
        body: cartData,
      })
      .its('body');
  });
});
