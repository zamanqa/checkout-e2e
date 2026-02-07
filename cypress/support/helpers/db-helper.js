// db-helper.js - Database helper utilities

/**
 * Check if order exists in database by order number
 */
Cypress.Commands.add('checkOrderExistsInDatabase', () => {
  cy.readFile('cypress/fixtures/order-result.json').then((data) => {
    const orderNumber = data.orderNumber;
    const queryString = `SELECT * FROM orders WHERE order_id = '${orderNumber}'`;

    cy.task('queryDb', queryString).then((result) => {
      if (result.length > 0) {
        cy.log(`✓ Order ${orderNumber} exists in the database`);
        expect(result.length).to.be.greaterThan(0);
      } else {
        cy.log(`✗ Order ${orderNumber} NOT found in the database`);
        expect(result.length).to.be.greaterThan(0);
      }
    });
  });
});

/**
 * Check order exists by order number directly
 * @param {string} orderNumber - The order number to check
 */
Cypress.Commands.add('checkOrderById', (orderNumber) => {
  const queryString = `SELECT * FROM orders WHERE order_id = '${orderNumber}'`;

  cy.task('queryDb', queryString).then((result) => {
    if (result.length > 0) {
      cy.log(`✓ Order ${orderNumber} exists in the database`);
      expect(result.length).to.be.greaterThan(0);
    } else {
      cy.log(`✗ Order ${orderNumber} NOT found in the database`);
      expect(result.length).to.be.greaterThan(0);
    }
  });
});

/**
 * Get order details from database
 * @param {string} orderNumber - The order number to fetch
 */
Cypress.Commands.add('getOrderDetails', (orderNumber) => {
  const queryString = `SELECT * FROM orders WHERE order_id = '${orderNumber}'`;

  return cy.task('queryDb', queryString).then((result) => {
    if (result.length > 0) {
      cy.log(`✓ Found order details for ${orderNumber}`);
      return result[0];
    } else {
      cy.log(`✗ No order found for ${orderNumber}`);
      return null;
    }
  });
});

/**
 * Execute custom database query
 * @param {string} queryString - SQL query to execute
 */
Cypress.Commands.add('executeDbQuery', (queryString) => {
  return cy.task('queryDb', queryString).then((result) => {
    cy.log(`✓ Query executed, returned ${result.length} rows`);
    return result;
  });
});

export default {};
