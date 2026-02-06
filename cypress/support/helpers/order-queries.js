// order-queries.js - Database queries for order verification

/**
 * Check if order exists in database
 * @param {string} orderNumber - The order number to check
 * @returns {Cypress.Chainable} - Query result
 */
export const checkOrderExists = (orderNumber) => {
  const query = `SELECT * FROM orders WHERE order_id = '${orderNumber}'`;
  return cy.task('queryDb', query);
};

/**
 * Get order details by order number
 * @param {string} orderNumber - The order number
 * @returns {Cypress.Chainable} - Order details
 */
export const getOrderDetails = (orderNumber) => {
  const query = `
    SELECT o.*, gcs.name as company_name
    FROM orders o
    LEFT JOIN general_company_settings gcs ON o.company_id = gcs.uid
    WHERE o.order_id = '${orderNumber}'
  `;
  return cy.task('queryDb', query);
};

/**
 * Get recent orders for a company
 * @param {string} companyName - The company name
 * @param {number} limit - Number of orders to return
 * @returns {Cypress.Chainable} - List of orders
 */
export const getRecentOrders = (companyName, limit = 10) => {
  const query = `
    SELECT o.*
    FROM orders o
    LEFT JOIN general_company_settings gcs ON o.company_id = gcs.uid
    WHERE gcs.name = '${companyName}'
    ORDER BY o.created_at DESC
    LIMIT ${limit}
  `;
  return cy.task('queryDb', query);
};

export default {
  checkOrderExists,
  getOrderDetails,
  getRecentOrders,
};
