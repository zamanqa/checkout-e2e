# Project Structure

> **Last Updated**: February 6, 2026
>
> This file documents the complete project structure. Update this file when adding new folders or significant files.

---

## Complete Directory Structure

```
checkout-e2e/
├── .claude-memory/                      # Claude AI instruction files
│   ├── claude-instructions.md           # Token optimization & session protocols
│   ├── claude-memory.md                 # Project knowledge base
│   ├── session-starter.md               # Session start/end guide
│   ├── session-history.md               # Recent work tracking (last 5 sessions)
│   ├── PROJECT-STRUCTURE.md             # This file - directory structure
│   └── README.md                        # Navigation index
│
├── cypress/
│   ├── e2e/                             # Test files organized by module
│   │   └── checkout/                    # Checkout tests by platform
│   │       ├── shopify/                 # Shopify integration tests
│   │       ├── saleor/                  # Saleor integration tests
│   │       ├── woocommerce/             # WooCommerce integration tests
│   │       └── shopware5/               # Shopware5 integration tests
│   │
│   ├── support/
│   │   ├── page-objects/                # Page Object Models
│   │   │   ├── CheckoutPage.js          # Checkout form page object
│   │   │   └── payment/                 # Payment provider components
│   │   │       ├── StripeComponent.js
│   │   │       ├── MollieComponent.js
│   │   │       ├── AdyenComponent.js
│   │   │       └── BraintreeComponent.js
│   │   │
│   │   ├── helpers/                     # Database & API helpers
│   │   │   ├── order-queries.js         # Order database queries
│   │   │   └── api-health-check.js      # API health check utilities
│   │   │
│   │   ├── commands/                    # Custom Cypress commands
│   │   │   ├── auth-commands.js         # Authentication commands
│   │   │   ├── database-commands.js     # Database verification commands
│   │   │   └── api-commands.js          # API helper commands
│   │   │
│   │   ├── database/
│   │   │   └── db-helper.js             # PostgreSQL connection helper
│   │   │
│   │   ├── e2e.js                       # Support file (auto-loaded)
│   │   └── commands.js                  # Command registration
│   │
│   └── fixtures/                        # Test data
│       ├── checkout-data.json           # Personal info, addresses, cards
│       └── api-keys.json                # API keys for different platforms
│
├── docs/                                # Technical documentation
│   ├── SETUP.md                         # Project setup guide
│   ├── test-writing-guide.md            # Test patterns and conventions
│   └── CUSTOM-COMMANDS-GUIDE.md         # Custom commands documentation
│
├── .env                                 # Environment variables (NOT in git)
├── .env.example                         # Environment template (in git)
├── .gitignore                           # Git ignore rules
├── .claudecodeignore                    # Claude Code ignore rules
├── cypress.config.js                    # Cypress configuration
├── package.json                         # NPM dependencies & scripts
├── package-lock.json                    # Locked dependency versions
└── README.md                            # Project README
```

---

## Directory Purposes

| Directory | Purpose |
|-----------|---------|
| `.claude-memory/` | Claude AI instructions and project memory |
| `cypress/e2e/` | Test specification files organized by feature |
| `cypress/support/page-objects/` | Page Object Model classes |
| `cypress/support/helpers/` | Database queries and utility functions |
| `cypress/support/commands/` | Custom Cypress commands |
| `cypress/support/database/` | Database connection helpers |
| `cypress/fixtures/` | Test data JSON files |
| `docs/` | Technical documentation |

---

## Naming Conventions

### Test Files
- Pattern: `feature-name.cy.js`
- Examples: `stripe-checkout.cy.js`, `mollie-checkout.cy.js`

### Page Objects
- Pattern: `PageName.js` (PascalCase)
- Examples: `CheckoutPage.js`, `StripeComponent.js`

### Helper Files
- Pattern: `feature-queries.js` or `feature-helper.js`
- Examples: `order-queries.js`, `api-health-check.js`

### Command Files
- Pattern: `feature-commands.js`
- Examples: `auth-commands.js`, `database-commands.js`

---

## How to Update This File

When adding new directories or files:

1. Add to the structure tree above
2. Update the "Directory Purposes" table if adding new directories
3. Update "Naming Conventions" if establishing new patterns
4. Commit with message: "docs: update project structure"

---

*Keep this file updated as the project grows.*
