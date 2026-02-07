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

    // Cross-origin support for payment iframes and redirects
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
      // Base URLs
      CHECKOUT_URL: 'https://circuly-checkout-development.herokuapp.com/en/',

      // API Health Check URLs
      CHECKOUT_API_URL: 'https://checkout-api-development-680576524870.europe-west3.run.app/v1/version',
      HUB_API_URL: 'https://hub-api-development-680576524870.europe-west3.run.app/v1/version',

      // Shopify Stripe Configuration
      SHOPIFY_STRIPE_API_KEY: 'dev_shopify_stripe',
      SHOPIFY_STRIPE_CART_ID: 'dev_shopify_stripe_do_not_use_e2e',
    },

    setupNodeEvents(on, config) {
      // Database query task
      on('task', {
        async queryDb(queryString) {
          const { Client } = require('pg');
          const pgConfig = {
            user: 'ZdFFUsWiIuILvub',
            password: 'rxoz32pYOeqYEAMVG263',
            host: 'circuly-development-v12.csmudpdd3zlm.eu-central-1.rds.amazonaws.com',
            database: 'postgres',
            ssl: false,
            port: 5432,
          };
          const client = new Client(pgConfig);
          await client.connect();
          const res = await client.query(queryString);
          await client.end();
          return res.rows;
        },
      });

      return config;
    },
  },
});
