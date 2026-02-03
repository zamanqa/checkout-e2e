// Expected tax calculation helpers for assertion verification

export function calculateTax(price: number, taxRate: number): number {
  return Math.round(price * (taxRate / 100) * 100) / 100;
}

export function priceIncludingVat(priceExclVat: number, taxRate: number): number {
  return Math.round((priceExclVat + calculateTax(priceExclVat, taxRate)) * 100) / 100;
}

export function priceExcludingVat(priceInclVat: number, taxRate: number): number {
  return Math.round((priceInclVat / (1 + taxRate / 100)) * 100) / 100;
}
