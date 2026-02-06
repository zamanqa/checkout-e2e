// db-helper.js - PostgreSQL database connection helper
// Note: Database connection is configured in cypress.config.js setupNodeEvents

/**
 * Database configuration template
 * Add to cypress.config.js setupNodeEvents:
 *
 * on('task', {
 *   async queryDb(queryString) {
 *     const { Client } = require('pg');
 *     const config = {
 *       user: process.env.DB_USER,
 *       password: process.env.DB_PASSWORD,
 *       host: process.env.DB_HOST,
 *       database: process.env.DB_NAME,
 *       port: process.env.DB_PORT || 5432,
 *       ssl: false,
 *     };
 *     const client = new Client(config);
 *     await client.connect();
 *     const result = await client.query(queryString);
 *     await client.end();
 *     return result.rows;
 *   },
 * });
 */

// Helper functions for common queries
export const queries = {
  // Check if order exists
  orderExists: (orderId) => `SELECT * FROM orders WHERE order_id = '${orderId}'`,

  // Get order with company info
  orderWithCompany: (orderId) => `
    SELECT o.*, gcs.name as company_name
    FROM orders o
    LEFT JOIN general_company_settings gcs ON o.company_id = gcs.uid
    WHERE o.order_id = '${orderId}'
  `,

  // Get orders by company
  ordersByCompany: (companyName, limit = 10) => `
    SELECT o.*
    FROM orders o
    LEFT JOIN general_company_settings gcs ON o.company_id = gcs.uid
    WHERE gcs.name = '${companyName}'
    ORDER BY o.created_at DESC
    LIMIT ${limit}
  `,
};

export default queries;
