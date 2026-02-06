# Project Setup Guide

## Prerequisites

- Node.js v16+
- npm or yarn
- Chrome browser

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment template:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your database credentials

## Running Tests

### Interactive Mode
```bash
npm run cy:open
```

### Headless Mode
```bash
npm run cy:run
```

### By Platform
```bash
npm run test:shopify
npm run test:saleor
npm run test:woocommerce
npm run test:shopware5
```

## Project Structure

See `.claude-memory/PROJECT-STRUCTURE.md` for complete directory structure.

## Configuration

- `cypress.config.js` - Main Cypress configuration
- `.env` - Environment variables (database, URLs)
- `cypress/fixtures/api-keys.json` - API keys for different platforms

## Database Setup

The project uses PostgreSQL for order verification. Configure in `.env`:

```
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=your_host
DB_NAME=postgres
DB_PORT=5432
```
