// database-commands.js - Database verification commands

/**
 * Check if order exists in database
 * @param {string} orderNumber - The order number to verify
 */
Cypress.Commands.add('checkOrderExistsInDatabase', (orderNumber) => {
  const query = `SELECT * FROM orders WHERE order_id = '${orderNumber}'`;

  cy.task('queryDb', query).then((result) => {
    expect(result.length).to.be.greaterThan(0);
    cy.log(`✓ Order ${orderNumber} exists in database`);
  });
});

/**
 * Get order from database
 * @param {string} orderNumber - The order number
 */
Cypress.Commands.add('getOrderFromDatabase', (orderNumber) => {
  const query = `SELECT * FROM orders WHERE order_id = '${orderNumber}'`;

  return cy.task('queryDb', query).then((result) => {
    if (result.length > 0) {
      cy.log(`✓ Found order: ${orderNumber}`);
      return result[0];
    } else {
      cy.log(`⚠ Order not found: ${orderNumber}`);
      return null;
    }
  });
});
