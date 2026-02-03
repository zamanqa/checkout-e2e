import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://staging-checkout.circuly.io',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',

    // Timeouts for checkout flows with payment iframes
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    pageLoadTimeout: 30000,

    // Viewport
    viewportWidth: 1280,
    viewportHeight: 720,

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

    // Experimental
    experimentalRunAllSpecs: true,

    // Environment defaults
    env: {
      ENVIRONMENT: 'staging',
      API_BASE_URL: 'https://staging-api.circuly.io',

      // Shop system API keys (set via cypress.env.json or CI secrets)
      SHOPIFY_STRIPE_API_KEY: '',
      SHOPIFY_ADYEN_API_KEY: '',
      SHOPIFY_MOLLIE_API_KEY: '',
      WOOCOMMERCE_STRIPE_API_KEY: '',
      MAGENTO_STRIPE_API_KEY: '',
      SHOPWARE6_STRIPE_API_KEY: '',
      SALEOR_STRIPE_API_KEY: '',

      // Grep plugin config
      grepFilterSpecs: true,
      grepOmitFiltered: true,
    },

    setupNodeEvents(on, config) {
      // Mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      // Grep plugin for tag filtering
      require('@cypress/grep/src/plugin')(config);

      return config;
    },
  },

  // Reporter
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    reportPageTitle: 'Circuly Checkout E2E Test Report',
    reportFilename: '[status]_[datetime]-report',
  },
});
