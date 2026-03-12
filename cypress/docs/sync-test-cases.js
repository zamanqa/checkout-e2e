'use strict';

/**
 * sync-test-cases.js
 *
 * Scans all *.cy.js spec files under cypress/e2e/checkout/,
 * groups them by payment gateway folder (stripe, adyen, mollie, braintree),
 * extracts test titles, and updates the TABS array inside TEST_CASES.html.
 *
 * The TABS block in the HTML is delimited by:
 *   /* TABS_GENERATED_START * /
 *   ...
 *   /* TABS_GENERATED_END * /
 *
 * Usage:
 *   node cypress/docs/sync-test-cases.js
 *   npm run sync
 */

const fs   = require('fs');
const path = require('path');

const ROOT        = path.join(__dirname, '..', '..');
const E2E_DIR     = path.join(ROOT, 'cypress', 'e2e', 'checkout');
const HTML_FILE   = path.join(__dirname, 'TEST_CASES.html');

// ── Recursively find all *.cy.js files ─────────────────────────────────────
function findSpecs(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findSpecs(full));
    else if (entry.name.endsWith('.cy.js') || entry.name.endsWith('.cy.ts')) results.push(full);
  }
  return results.sort();
}

// ── Extract it('...') titles from a spec file ──────────────────────────────
function extractTests(filePath) {
  const src   = fs.readFileSync(filePath, 'utf8');
  const tests = [];
  const re    = /it\s*\(\s*['"`]([^'"`]+)['"`]/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const title = m[1];
    // Check if the test body references database operations
    const db = /queryDb|database|Database|checkOrder|executeDbQuery/i.test(src);
    tests.push({ title, db });
  }
  return tests;
}

// ── Group specs by gateway folder ──────────────────────────────────────────
function buildTabs(specs) {
  const rootFwd  = ROOT.replace(/\\/g, '/');
  const groups   = {};  // gateway → [ { name, spec, tests } ]

  for (const abs of specs) {
    const rel   = abs.replace(/\\/g, '/').replace(rootFwd + '/', '');
    // rel = "cypress/e2e/checkout/stripe/shopify-stripe-card.cy.js"
    const inner = rel.replace('cypress/e2e/checkout/', ''); // "stripe/shopify-stripe-card.cy.js"
    const parts = inner.split('/');
    const gateway = parts[0]; // "stripe", "adyen", "mollie", "braintree"
    const fileName = parts.slice(0).join('/'); // keep full path under checkout/

    if (!groups[gateway]) groups[gateway] = [];

    const tests = extractTests(abs);
    groups[gateway].push({
      name: fileName,
      spec: rel,
      tests
    });
  }

  // Convert to TABS array, sorted alphabetically by gateway name
  const gateways = Object.keys(groups).sort();
  return gateways.map((gw, idx) => ({
    id:    gw,
    label: gw.charAt(0).toUpperCase() + gw.slice(1),
    num:   String(idx + 1).padStart(2, '0'),
    files: groups[gw]
  }));
}

// ── Generate TABS JavaScript source ────────────────────────────────────────
function generateTabsSource(tabs) {
  const indent = (n) => '  '.repeat(n);

  let js = '/* TABS_GENERATED_START */\n';
  js += 'const TABS = [\n';

  tabs.forEach((tab, ti) => {
    js += `${indent(1)}{\n`;
    js += `${indent(2)}id: '${tab.id}', label: '${tab.label}', num: '${tab.num}',\n`;
    js += `${indent(2)}files: [\n`;

    tab.files.forEach((file, fi) => {
      js += `${indent(3)}{\n`;
      js += `${indent(4)}name: '${file.name}',\n`;
      js += `${indent(4)}spec: '${file.spec}',\n`;
      js += `${indent(4)}tests: [\n`;

      file.tests.forEach((test, ti2) => {
        const escapedTitle = test.title.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        js += `${indent(5)}{ title: '${escapedTitle}'`;
        if (test.db) js += ', db: true';
        js += ` }`;
        js += ti2 < file.tests.length - 1 ? ',\n' : '\n';
      });

      js += `${indent(4)}]\n`;
      js += `${indent(3)}}`;
      js += fi < tab.files.length - 1 ? ',\n' : '\n';
    });

    js += `${indent(2)}]\n`;
    js += `${indent(1)}}`;
    js += ti < tabs.length - 1 ? ',\n' : '\n';
  });

  js += '];\n';
  js += '/* TABS_GENERATED_END */';
  return js;
}

// ── Main ───────────────────────────────────────────────────────────────────
function main() {
  console.log('🔍  Scanning specs in:', E2E_DIR);

  if (!fs.existsSync(E2E_DIR)) {
    console.error('❌  Directory not found:', E2E_DIR);
    process.exit(1);
  }

  const specs = findSpecs(E2E_DIR);
  console.log(`📂  Found ${specs.length} spec file(s)`);

  if (specs.length === 0) {
    console.warn('⚠️  No spec files found — nothing to sync');
    return;
  }

  const tabs = buildTabs(specs);
  let totalTests = 0;
  tabs.forEach(tab => {
    const tabTests = tab.files.reduce((s, f) => s + f.tests.length, 0);
    totalTests += tabTests;
    console.log(`   📦  ${tab.label}: ${tab.files.length} file(s), ${tabTests} test(s)`);
  });
  console.log(`   ────────────────────────`);
  console.log(`   📊  Total: ${tabs.length} gateway(s), ${specs.length} file(s), ${totalTests} test(s)`);

  // Read the HTML file
  if (!fs.existsSync(HTML_FILE)) {
    console.error('❌  HTML file not found:', HTML_FILE);
    process.exit(1);
  }

  const html = fs.readFileSync(HTML_FILE, 'utf8');

  // Replace the TABS block between markers
  const startMarker = '/* TABS_GENERATED_START */';
  const endMarker   = '/* TABS_GENERATED_END */';

  const startIdx = html.indexOf(startMarker);
  const endIdx   = html.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.error('❌  TABS_GENERATED markers not found in TEST_CASES.html');
    console.error('    Expected: /* TABS_GENERATED_START */ ... /* TABS_GENERATED_END */');
    process.exit(1);
  }

  const newTabsSource = generateTabsSource(tabs);
  const updated = html.slice(0, startIdx) + newTabsSource + html.slice(endIdx + endMarker.length);

  fs.writeFileSync(HTML_FILE, updated, 'utf8');
  console.log(`\n✅  Synced ${specs.length} spec(s) → ${totalTests} test(s) into TEST_CASES.html`);
}

main();
