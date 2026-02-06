// CheckoutPage.js - Checkout Form Page Object
// Follow selector-action pairing pattern

class CheckoutPage {
  // ==================== PERSONAL DETAILS ====================

  // Selector
  get firstNameInput() {
    return cy.get("[data-test-id='billing_first_name']");
  }

  // Action
  enterFirstName(firstName) {
    this.firstNameInput.clear().type(firstName);
    cy.log(`✓ Entered first name: ${firstName}`);
  }

  // Selector
  get lastNameInput() {
    return cy.get("[data-test-id='billing_last_name']");
  }

  // Action
  enterLastName(lastName) {
    this.lastNameInput.clear().type(lastName);
    cy.log(`✓ Entered last name: ${lastName}`);
  }

  // Selector
  get emailInput() {
    return cy.get("[data-test-id='email']");
  }

  // Action
  enterEmail(email) {
    this.emailInput.clear().type(email);
    cy.log(`✓ Entered email: ${email}`);
  }

  // Selector
  get phoneInput() {
    return cy.get("[data-test-id='phone']");
  }

  // Action
  enterPhone(phone) {
    this.phoneInput.clear().type(phone);
    cy.log(`✓ Entered phone: ${phone}`);
  }

  // ==================== ADDRESS ====================

  // Selector
  get streetInput() {
    return cy.get("[data-test-id='billing_street']");
  }

  // Action
  enterStreet(street) {
    this.streetInput.clear().type(street);
    cy.log(`✓ Entered street: ${street}`);
  }

  // Selector
  get streetNumberInput() {
    return cy.get("[data-test-id='billing_street_number']");
  }

  // Action
  enterStreetNumber(number) {
    this.streetNumberInput.clear().type(String(number));
    cy.log(`✓ Entered street number: ${number}`);
  }

  // Selector
  get postalCodeInput() {
    return cy.get("[data-test-id='billing_postal_code']").first();
  }

  // Action
  enterPostalCode(postalCode) {
    this.postalCodeInput.clear().type(postalCode);
    cy.log(`✓ Entered postal code: ${postalCode}`);
  }

  // Selector
  get cityInput() {
    return cy.get("[data-test-id='billing_city']");
  }

  // Action
  enterCity(city) {
    this.cityInput.clear().type(city);
    cy.log(`✓ Entered city: ${city}`);
  }

  // ==================== COUNTRY DROPDOWN ====================

  // Selector
  get countryDropdown() {
    return cy.get("div[class='v-select__selections'] input");
  }

  // Selector
  get countryOptions() {
    return cy.get("div[class='v-list-item__title']");
  }

  // Action
  selectCountry(country) {
    this.countryDropdown.then(($btn) => {
      if ($btn.is(':enabled')) {
        cy.get($btn).click({ multiple: true });
        cy.wait(1000);
        this.countryOptions.each(($el) => {
          if ($el.text().includes(country)) {
            cy.wrap($el).click();
            cy.log(`✓ Selected country: ${country}`);
            return false;
          }
        });
      }
    });
  }

  // ==================== OPTIONAL FIELDS ====================

  // Selector
  get companyNameInput() {
    return cy.get("[data-test-id='billing_company']");
  }

  // Action
  enterCompanyName(companyName) {
    cy.get('.v-stepper__items').then(($form) => {
      if ($form.find("[data-test-id='billing_company']").is(':visible')) {
        this.companyNameInput.clear().type(companyName);
        cy.log(`✓ Entered company: ${companyName}`);
      }
    });
  }

  // Selector
  get vatNumberInput() {
    return cy.get("[data-test-id='vat_number']");
  }

  // Action
  enterVatNumber(vatNumber) {
    cy.get('.v-stepper__items').then(($form) => {
      if ($form.find("[data-test-id='vat_number']").is(':visible')) {
        this.vatNumberInput.clear().type(vatNumber);
        cy.log(`✓ Entered VAT: ${vatNumber}`);
      }
    });
  }

  // Selector
  get noteInput() {
    return cy.get("[data-test-id='billing_notes']");
  }

  // Action
  enterNote(note) {
    cy.get('.v-stepper__items').then(($form) => {
      if ($form.find("[data-test-id='billing_notes']").is(':visible')) {
        this.noteInput.clear().type(note);
        cy.log(`✓ Entered note: ${note}`);
      }
    });
  }

  // ==================== BUTTONS ====================

  // Selector
  get continueButton() {
    return cy.contains('Continue');
  }

  // Action
  clickContinue() {
    this.continueButton.click();
    cy.wait(3000);
    cy.log('✓ Clicked Continue');
  }

  // Selector
  get payButton() {
    return cy.get("button[data-test-id='btn-pay']");
  }

  // Action
  clickPay() {
    this.payButton.click();
    cy.wait(5000);
    cy.log('✓ Clicked Pay');
  }

  // ==================== ORDER CONFIRMATION ====================

  // Selector
  get orderNumberText() {
    return cy.get('.text--secondary.subtitle-1');
  }

  // Action
  getOrderNumber() {
    return this.orderNumberText.invoke('text').then((text) => {
      const match = text.match(/\d+/);
      const orderNumber = match ? match[0] : '';
      cy.log(`✓ Order Number: ${orderNumber}`);
      return orderNumber;
    });
  }

  // ==================== COMPOSITE ACTIONS ====================

  fillPersonalDetails(firstName, lastName, email, phone) {
    this.enterFirstName(firstName);
    this.enterLastName(lastName);
    this.enterEmail(email);
    this.enterPhone(phone);
  }

  fillAddress(street, streetNo, postalCode, city, country) {
    this.enterStreet(street);
    this.enterStreetNumber(streetNo);
    this.enterPostalCode(postalCode);
    this.enterCity(city);
    this.selectCountry(country);
  }
}

export default new CheckoutPage();
