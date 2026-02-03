# Circuly Checkout — E2E Test Suite

Cypress 13+ E2E UI tests for the Circuly Checkout API.

## Quick Start

```bash
# Install dependencies
npm install

# Open Cypress interactive mode
npm run cy:open

# Run all tests headless
npm run cy:run

# Run with Chrome
npm run cy:run:chrome
```

## Environment Setup

1. Copy `cypress.env.json.example` to `cypress.env.json`
2. Fill in your API keys and base URL
3. Never commit `cypress.env.json` (it's gitignored)

## Project Structure

```
cypress/
├── e2e/                 # Test specs by domain
│   ├── cart/            # Cart CRUD, items, calculations, caching
│   ├── payment/         # Stripe, Adyen, Mollie, Braintree, PayPal
│   ├── tax/             # EU, international, edge cases
│   ├── order/           # Order creation per shop system
│   ├── shipping/        # Shipping methods
│   ├── voucher/         # Voucher application
│   ├── integration/     # End-to-end flows
│   └── regression/      # Backward compatibility
├── fixtures/            # Test data (JSON)
├── pages/               # Page Object Model
├── support/             # Custom commands & types
└── utils/               # Helpers (API client, data generators, tax calc)
```

## Running by Suite

```bash
npm run test:cart
npm run test:payment
npm run test:tax
npm run test:order
npm run test:shipping
npm run test:voucher
npm run test:integration
npm run test:regression
```

## Running by Tags

Uses `@cypress/grep` for tag-based filtering:

```bash
# By priority
npm run test:p1
npm run test:p2
npm run test:smoke

# By gateway
npm run test:stripe
npm run test:adyen
npm run test:mollie

# By shop system
npm run test:shopify
npm run test:woocommerce

# Custom tag combinations
npx cypress run --env grepTags='@p1+@stripe'
npx cypress run --env grepTags='@cart @tax'
npx cypress run --env grepTags='-@slow'
```

## Tag Reference

| Category | Tags |
|----------|------|
| Priority | `@p1`, `@p2`, `@p3` |
| Domain | `@cart`, `@payment`, `@tax`, `@order`, `@shipping`, `@voucher` |
| Gateway | `@stripe`, `@adyen`, `@mollie`, `@braintree`, `@paypal` |
| Shop | `@shopify`, `@woocommerce`, `@magento2`, `@shopware6`, `@saleor` |
| Run Type | `@smoke`, `@regression`, `@nightly` |

## Reports

Tests generate Mochawesome HTML reports:

```bash
# Generate merged report
npm run report:generate

# Clean reports
npm run report:clean
```

## CI/CD

- **Push/PR**: Runs all suites in parallel via GitHub Actions matrix
- **Nightly**: Full regression at 2 AM UTC
- **Manual**: Dispatch from GitHub Actions UI with suite/browser/tag selection

## Code Quality

```bash
npm run lint          # ESLint check
npm run lint:fix      # Auto-fix
npm run typecheck     # TypeScript check
```
