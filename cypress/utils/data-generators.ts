// Test data factory functions
// Uses @faker-js/faker for randomized non-financial data

import { faker } from '@faker-js/faker';

export function generateAddress(country = 'DE'): Address {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    postal_code: faker.location.zipCode(),
    country: faker.location.country(),
    alpha2: country,
    region_iso: null,
  };
}

export function generateEmail(): string {
  return faker.internet.email();
}
