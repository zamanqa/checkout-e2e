const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://circuly-checkout-development.herokuapp.com/en/',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    // Timeouts
    defaultCommandTimeout: 20000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    pageLoadTimeout: 30000,

    // Viewport
    viewportWidth: 1280,
    viewportHeight: 720,

    // Cross-origin support for payment iframes
    chromeWebSecurity: false,

    // Retry strategy
    retries: {
      runMode: 2,
      openMode: 0,
    },

    // Media
    video: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    // Environment variables
    env: {
      CHECKOUT_URL: 'https://circuly-checkout-development.herokuapp.com/en/',
    },

    setupNodeEvents(on, config) {
      // Database query task
      on('task', {
        async queryDb(queryString) {
          const { Client } = require('pg');
          const pgConfig = {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME || 'postgres',
            port: process.env.DB_PORT || 5432,
            ssl: false,
          };
          const client = new Client(pgConfig);
          await client.connect();
          const result = await client.query(queryString);
          await client.end();
          return result.rows;
        },
      });

      return config;
    },
  },
});
