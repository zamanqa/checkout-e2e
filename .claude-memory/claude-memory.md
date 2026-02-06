# Claude Memory - Project Knowledge Base

> **Last Updated**: February 6, 2026
>
> This file contains all important project information, patterns, and conventions that Claude should remember across sessions.

---

## Project Overview

**Project Name**: Checkout E2E Automation
**Framework**: Cypress v13.17.0 (JavaScript)
**Database**: PostgreSQL
**Purpose**: E2E tests for Circuly Checkout with multiple shop platforms and payment gateways
**Target URL**: https://circuly-checkout-development.herokuapp.com/en/

---

## File Structure

See `.claude-memory/PROJECT-STRUCTURE.md` for complete directory tree.

**Key Directories:**
- `.claude-memory/` - Claude AI instructions and project memory
- `cypress/e2e/checkout/` - Test files by platform (shopify, saleor, woocommerce, shopware5)
- `cypress/support/page-objects/` - Page Object classes
- `cypress/support/page-objects/payment/` - Payment provider components
- `cypress/support/helpers/` - Database queries and utilities
- `cypress/support/commands/` - Custom Cypress commands
- `cypress/fixtures/` - Test data JSON files
- `docs/` - Technical documentation

---

## Page Objects

| File | Purpose |
|------|---------|
| `CheckoutPage.js` | Main checkout form interactions |
| `payment/StripeComponent.js` | Stripe card, SEPA, BACS payments |
| `payment/MollieComponent.js` | Mollie credit card payments |
| `payment/AdyenComponent.js` | Adyen with 3DS authentication |
| `payment/BraintreeComponent.js` | Braintree Drop-in UI |

---

## Code Pattern (CRITICAL)

**Selector-Action Pairing:**
```javascript
// Selector
get buttonName() {
  return cy.get('selector');
}

// Action
clickButton() {
  this.buttonName.click();
  cy.log('✓ Clicked button');
}
```

---

## Custom Commands

| Command | Purpose |
|---------|---------|
| `cy.checkOrderExistsInDatabase(orderNumber)` | Verify order in database |
| `cy.getOrderFromDatabase(orderNumber)` | Get order details |
| `cy.apiRequest(method, url, body)` | Make API request |
| `cy.checkApiHealth(url)` | Check API status |

---

## NPM Scripts

```bash
npm run cy:open          # Interactive mode
npm run cy:run           # Headless mode
npm run test:shopify     # Shopify tests
npm run test:saleor      # Saleor tests
npm run test:woocommerce # WooCommerce tests
npm run test:shopware5   # Shopware5 tests
npm run test:all         # All tests
```

---

## Fixtures

| File | Purpose |
|------|---------|
| `checkout-data.json` | Personal info, addresses, card numbers |
| `api-keys.json` | API keys for different platforms |

---

## Environment

**Base URL**: https://circuly-checkout-development.herokuapp.com/en/
**Working Directory**: C:\Users\shahi\Circuly Project\checkout-e2e
**Branches**: main, development

---

## User Preferences

1. ✅ **Selector-Action pairing** - Each selector immediately followed by its action
2. ✅ **Single test per file** - Combine steps into one `it()` block
3. ✅ **Comment everything** - Use `// Selector` and `// Action` labels
4. ✅ **Use this memory file** - Reference instead of searching chat history
5. ✅ **Save documentation in .claude-memory/** - Create docs for future reference
6. ✅ **No time estimates** - Never say "this will take X minutes"
7. ✅ **Don't run tests automatically** - Always ask before running

---

## Important Files to Read

At session start, read:
1. `.claude-memory/claude-memory.md` (this file)
2. `.claude-memory/session-history.md`
3. `.claude-memory/PROJECT-STRUCTURE.md`

---

*This is a living document. Update as project evolves.*
