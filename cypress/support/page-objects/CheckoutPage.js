// CheckoutPage.js - Checkout Form Page Object
// Follow selector-action pairing pattern
// All actions check field availability before interacting

class CheckoutPage {
  // ==================== HELPER: GENERATE RANDOM EMAIL ====================

  /**
   * Generate a random email address
   * @returns {string} Random email address
   */
  generateRandomEmail() {
    // Generate short 10-char random string
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomStr = '';
    for (let i = 0; i < 10; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `test_${randomStr}@gmail.com`;
  }

  // ==================== HELPER: CHECK FIELD AVAILABILITY ====================

  /**
   * Check if a field is available and enabled
   * @param {string} selector - CSS selector for the field
   * @param {string} fieldName - Name of the field for logging
   * @returns {Cypress.Chainable<boolean>}
   */
  isFieldAvailable(selector, fieldName) {
    return cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        return cy.get(selector).then(($el) => {
          if ($el.is(':visible') && !$el.is(':disabled')) {
            return true;
          } else {
            cy.log(`⚠ Field "${fieldName}" is not enabled`);
            return false;
          }
        });
      } else {
        cy.log(`⚠ Field "${fieldName}" is not available`);
        return false;
      }
    });
  }

  // ==================== DELIVERY DATE ====================

  // Selector
  get deliveryDateInput() {
    return cy.get("[data-test-id='delivery-date']");
  }

  // Selector - Calendar date buttons (enabled dates only - have data-v-date attribute)
  get calendarEnabledDates() {
    return cy.get('.v-date-picker-month__days .v-date-picker-month__day[data-v-date] button:not([disabled])');
  }

  // Selector - Delivery time slots (enabled only)
  get deliveryTimeSlots() {
    return cy.get('button.timeslot:not([disabled])');
  }

  // Action - Select first available delivery date and time slot
  selectDeliveryDate() {
    const selector = "[data-test-id='delivery-date']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible') && !$el.is(':disabled')) {
            // Click on delivery date input to open calendar
            cy.get(selector).click();
            cy.log(`✓ Clicked delivery date picker`);

            // Wait for calendar to open
            cy.wait(3000);

            // Select first enabled date from calendar (dates with data-v-date attribute are enabled)
            cy.get('body').then(($calendarBody) => {
              const enabledDates = $calendarBody.find('.v-date-picker-month__days .v-date-picker-month__day[data-v-date] button:not([disabled])');
              if (enabledDates.length > 0) {
                // Get the first enabled date and click it
                cy.get('.v-date-picker-month__days .v-date-picker-month__day[data-v-date] button:not([disabled])')
                  .first()
                  .then(($dateBtn) => {
                    const selectedDate = $dateBtn.text().trim();
                    cy.wrap($dateBtn).click();
                    cy.log(`✓ Selected date: ${selectedDate}`);

                    // Wait for time slots to appear
                    cy.wait(2000);

                    // Select first enabled time slot from "Delivery date & time" section
                    cy.get('body').then(($timeBody) => {
                      const enabledTimeSlots = $timeBody.find('button.timeslot:not([disabled])');
                      if (enabledTimeSlots.length > 0) {
                        cy.get('button.timeslot:not([disabled])')
                          .first()
                          .then(($timeBtn) => {
                            const selectedTime = $timeBtn.text().trim();
                            cy.wrap($timeBtn).click();
                            cy.log(`✓ Selected time slot: ${selectedTime}`);
                            cy.log(`✓ Delivery Date & Time: ${selectedDate} - ${selectedTime}`);

                            // Wait and click Select button to confirm
                            cy.wait(2000);
                            cy.contains('button', 'Select').click();
                            cy.log(`✓ Clicked Select button to confirm delivery date`);
                          });
                      } else {
                        cy.log(`⚠ No enabled time slots available`);
                      }
                    });
                  });
              } else {
                cy.log(`⚠ No enabled dates available in calendar`);
              }
            });
          } else {
            cy.log(`⚠ Field "Delivery Date" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Delivery Date" is not available`);
      }
    });
  }

  // ==================== COMPANY & VAT ====================

  // Selector
  get companyInput() {
    return cy.get("[data-test-id='billing_company']");
  }

  // Action
  enterCompany(company) {
    const selector = "[data-test-id='billing_company']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            // Find the input inside the container and type
            cy.get(selector).find('input').clear().type(company);
            cy.log(`✓ Entered company: ${company}`);
          } else {
            cy.log(`⚠ Field "Company" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Company" is not available`);
      }
    });
  }

  // Selector
  get vatNumberInput() {
    return cy.get("[data-test-id='vat_number']");
  }

  // Action
  enterVatNumber(vatNumber) {
    const selector = "[data-test-id='vat_number']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).find('input').clear().type(vatNumber);
            cy.log(`✓ Entered VAT number: ${vatNumber}`);
          } else {
            cy.log(`⚠ Field "VAT Number" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "VAT Number" is not available`);
      }
    });
  }

  // ==================== PERSONAL DETAILS ====================

  // Selector
  get firstNameInput() {
    return cy.get("[data-test-id='billing_first_name']");
  }

  // Action
  enterFirstName(firstName) {
    const selector = "[data-test-id='billing_first_name']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).find('input').clear().type(firstName);
            cy.log(`✓ Entered first name: ${firstName}`);
          } else {
            cy.log(`⚠ Field "First Name" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "First Name" is not available`);
      }
    });
  }

  // Selector
  get lastNameInput() {
    return cy.get("[data-test-id='billing_last_name']");
  }

  // Action
  enterLastName(lastName) {
    const selector = "[data-test-id='billing_last_name']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).find('input').clear().type(lastName);
            cy.log(`✓ Entered last name: ${lastName}`);
          } else {
            cy.log(`⚠ Field "Last Name" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Last Name" is not available`);
      }
    });
  }

  // Selector
  get emailInput() {
    return cy.get("[data-test-id='email']");
  }

  // Action - Enter email (always generates random email)
  enterEmail() {
    const selector = "[data-test-id='email']";
    const randomEmail = this.generateRandomEmail();
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).find('input').clear().type(randomEmail);
            cy.log(`✓ Entered random email: ${randomEmail}`);
          } else {
            cy.log(`⚠ Field "Email" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Email" is not available`);
      }
    });
  }

  // Selector
  get phoneInput() {
    return cy.get("[data-test-id='phone']");
  }

  // Action
  enterPhone(phone) {
    const selector = "[data-test-id='phone']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).find('input').clear().type(phone);
            cy.log(`✓ Entered phone: ${phone}`);
          } else {
            cy.log(`⚠ Field "Phone" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Phone" is not available`);
      }
    });
  }

  // ==================== DATE OF BIRTH ====================

  // Selector
  get dateOfBirthInput() {
    return cy.get("[data-test-id='date_of_birth']");
  }

  // Selector - Year list
  get dobYearList() {
    return cy.get('.v-date-picker-years li');
  }

  // Selector - Month buttons
  get dobMonthButtons() {
    return cy.get('.v-date-picker-table--month button');
  }

  // Selector - Date buttons
  get dobDateButtons() {
    return cy.get('.v-date-picker-table--date button');
  }

  // Action - Select date of birth: click field → select first enabled date → click Select
  selectDateOfBirth() {
    const selector = "[data-test-id='date_of_birth']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            // Click to open date picker
            cy.get(selector).click();
            cy.log(`✓ Clicked date of birth picker`);
            cy.wait(2000);

            // Select first enabled date (dates with data-v-date and button not disabled)
            cy.get('.v-date-picker-month__days .v-date-picker-month__day[data-v-date] button:not([disabled])')
              .first()
              .then(($dateBtn) => {
                const selectedDate = $dateBtn.text().trim();
                cy.wrap($dateBtn).click();
                cy.log(`✓ Selected date: ${selectedDate}`);
                cy.wait(1000);

                // Click Select button
                cy.contains('button', 'Select').click();
                cy.log(`✓ Clicked Select button`);
              });
          } else {
            cy.log(`⚠ Field "Date of Birth" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Date of Birth" is not available`);
      }
    });
  }

  // ==================== ADDRESS SEARCH ====================

  // Selector
  get addressSearchInput() {
    return cy.get("[data-test-id='input-google-places-1'] input");
  }

  // Action
  searchAddress(address) {
    const selector = "[data-test-id='input-google-places-1'] input";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible') && !$el.is(':disabled')) {
            cy.get(selector).clear().type(address);
            cy.log(`✓ Searching address: ${address}`);
          } else {
            cy.log(`⚠ Field "Address Search" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Address Search" is not available`);
      }
    });
  }

  // ==================== ADDRESS FIELDS ====================

  // Selector
  get streetInput() {
    return cy.get("[data-test-id='billing_street']");
  }

  // Action
  enterStreet(street) {
    const selector = "[data-test-id='billing_street']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).find('input').clear().type(street);
            cy.log(`✓ Entered street: ${street}`);
          } else {
            cy.log(`⚠ Field "Street" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Street" is not available`);
      }
    });
  }

  // Selector
  get streetNumberInput() {
    return cy.get("[data-test-id='billing_street_number']");
  }

  // Action
  enterStreetNumber(number) {
    const selector = "[data-test-id='billing_street_number']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).find('input').clear().type(String(number));
            cy.log(`✓ Entered street number: ${number}`);
          } else {
            cy.log(`⚠ Field "Street Number" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Street Number" is not available`);
      }
    });
  }

  // Selector
  get addressRemarkInput() {
    return cy.get("[data-test-id='billing_address_addition']");
  }

  // Action
  enterAddressRemark(remark) {
    const selector = "[data-test-id='billing_address_addition']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).find('input').clear().type(remark);
            cy.log(`✓ Entered address remark: ${remark}`);
          } else {
            cy.log(`⚠ Field "Address Remark" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Address Remark" is not available`);
      }
    });
  }

  // Selector
  get postalCodeInput() {
    return cy.get("[data-test-id='billing_postal_code']");
  }

  // Action
  enterPostalCode(postalCode) {
    const selector = "[data-test-id='billing_postal_code']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).find('input').clear().type(postalCode);
            cy.log(`✓ Entered postal code: ${postalCode}`);
          } else {
            cy.log(`⚠ Field "Postal Code" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Postal Code" is not available`);
      }
    });
  }

  // Selector
  get cityInput() {
    return cy.get("[data-test-id='billing_city']");
  }

  // Action
  enterCity(city) {
    const selector = "[data-test-id='billing_city']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).find('input').clear().type(city);
            cy.log(`✓ Entered city: ${city}`);
          } else {
            cy.log(`⚠ Field "City" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "City" is not available`);
      }
    });
  }

  // ==================== COUNTRY DROPDOWN ====================

  // Selector
  get countryDropdown() {
    return cy.get("[data-test-id='billing_country']");
  }

  // Selector
  get countrySelectInput() {
    return cy.get("[data-test-id='country-select']");
  }

  // Selector
  get countryOptions() {
    return cy.get('.v-list-item');
  }

  // Action
  selectCountry(country) {
    const selector = "[data-test-id='billing_country']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).click();
            cy.wait(1000);
            // Use contains to find the country option in the dropdown list
            cy.contains('.v-list-item', country).click();
            cy.log(`✓ Selected country: ${country}`);
          } else {
            cy.log(`⚠ Field "Country" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Country" is not available`);
      }
    });
  }

  // ==================== NOTES ====================

  // Selector
  get notesInput() {
    return cy.get("[data-test-id='billing_notes']");
  }

  // Action
  enterNotes(notes) {
    const selector = "[data-test-id='billing_notes']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            // Notes might be textarea
            cy.get(selector).find('input, textarea').first().clear().type(notes);
            cy.log(`✓ Entered notes: ${notes}`);
          } else {
            cy.log(`⚠ Field "Notes" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Notes" is not available`);
      }
    });
  }

  // ==================== SHIPPING ADDRESS TOGGLE ====================

  // Selector
  get differentShippingSwitch() {
    return cy.get("[data-test-id='switch_different_shipping']");
  }

  // Action
  toggleDifferentShipping() {
    const selector = "[data-test-id='switch_different_shipping']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if ($el.is(':visible')) {
            cy.get(selector).click();
            cy.log(`✓ Toggled different shipping address`);
          } else {
            cy.log(`⚠ Field "Different Shipping Address" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Field "Different Shipping Address" is not available`);
      }
    });
  }

  // ==================== SHIPPING METHOD ====================

  // Selector - Shipping method radio group
  get shippingMethodRadioGroup() {
    return cy.get('[role="radiogroup"]');
  }

  // Selector - All shipping method options
  get shippingMethodOptions() {
    return cy.get('[data-test-id^="shipping-method-"]');
  }

  // Action - Select first shipping method
  selectFirstShippingMethod() {
    const selector = '[data-test-id^="shipping-method-"]';
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        // Click on the first shipping method card/label to select it
        cy.get(selector)
          .first()
          .find('.v-card__text')
          .click();

        cy.get(selector)
          .first()
          .then(($method) => {
            const methodName = $method.find('p.my-0').first().text().trim();
            const methodPrice = $method.find('p.my-0').last().text().trim();
            cy.log(`✓ Selected shipping method: ${methodName} - ${methodPrice}`);
          });

        // Wait 2 seconds after selection
        cy.wait(2000);
      } else {
        cy.log(`⚠ Shipping methods not available`);
      }
    });
  }

  // Action - Select shipping method by index (0-based)
  selectShippingMethodByIndex(index) {
    const selector = '[data-test-id^="shipping-method-"]';
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector)
          .eq(index)
          .find('.v-card__text')
          .click();

        cy.get(selector)
          .eq(index)
          .then(($method) => {
            const methodName = $method.find('p.my-0').first().text().trim();
            const methodPrice = $method.find('p.my-0').last().text().trim();
            cy.log(`✓ Selected shipping method: ${methodName} - ${methodPrice}`);
          });

        // Wait 2 seconds after selection
        cy.wait(2000);
      } else {
        cy.log(`⚠ Shipping methods not available`);
      }
    });
  }

  // ==================== BUTTONS ====================

  // Selector
  get continueButton() {
    return cy.get("[data-test-id='next-step']");
  }

  // Action
  clickContinue() {
    const selector = "[data-test-id='next-step']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).click();
        cy.wait(15000);
        cy.log('✓ Clicked Continue');
      } else {
        cy.log(`⚠ Button "Continue" is not available`);
      }
    });
  }

  // Selector
  get payButton() {
    return cy.get("[data-test-id='btn-pay']");
  }

  // Action
  clickPay() {
    const selector = "[data-test-id='btn-pay']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          if (!$el.is(':disabled')) {
            cy.get(selector).click();
            cy.wait(10000);
            cy.log('✓ Clicked Pay');
          } else {
            cy.log(`⚠ Button "Pay" is not enabled`);
          }
        });
      } else {
        cy.log(`⚠ Button "Pay" is not available`);
      }
    });
  }

  // Selector
  get editBillingButton() {
    return cy.get("[data-test-id='btn-edit']").first();
  }

  // Action
  clickEditBilling() {
    const selector = "[data-test-id='btn-edit']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).first().click();
        cy.log('✓ Clicked Edit Billing');
      } else {
        cy.log(`⚠ Button "Edit Billing" is not available`);
      }
    });
  }

  // ==================== REVIEW & CONFIRM STEP ====================

  // Selector
  get checkbox() {
    return cy.get("[data-test-id='checkbox']");
  }

  // Action
  checkAllCheckboxes() {
    const selector = "[data-test-id='checkbox']";
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        // Click on the actual input checkbox inside each checkbox container
        cy.get(selector).each(($el) => {
          cy.wrap($el).find('input[type="checkbox"]').click({ force: true });
        });
        cy.log('✓ Checked all checkboxes');
      } else {
        cy.log(`⚠ Checkboxes are not available`);
      }
    });
  }

  // Selector
  get legalSection() {
    return cy.get("[data-test-id='legal']");
  }

  // Selector
  get poweredByHtml() {
    return cy.get("[data-test-id='powered_by_html']");
  }

  // ==================== ORDER CONFIRMATION ====================

  // Selector - Order number element (font-mono font-semibold)
  get orderNumberText() {
    return cy.get('.font-mono.font-semibold');
  }

  // Action
  getOrderNumber() {
    this.orderNumberText.invoke('text').then((text) => {
      const orderNumber = text.trim();
      cy.log(`✓ Order Number: ${orderNumber}`);
    });
  }

  // Action - Save order number to fixture file
  saveOrderNumber() {
    this.orderNumberText.invoke('text').then((text) => {
      const orderNumber = text.trim();
      cy.writeFile('cypress/fixtures/order-result.json', { orderNumber });
      cy.log(`✓ Saved Order Number: ${orderNumber}`);
    });
  }

  // ==================== COMPOSITE ACTIONS ====================

  /**
   * Fill all personal details
   */
  fillPersonalDetails(firstName, lastName, email, phone) {
    this.enterFirstName(firstName);
    this.enterLastName(lastName);
    this.enterEmail(email);
    this.enterPhone(phone);
  }

  /**
   * Fill company details (optional fields)
   */
  fillCompanyDetails(company, vatNumber) {
    this.enterCompany(company);
    this.enterVatNumber(vatNumber);
  }

  /**
   * Fill all address fields
   */
  fillAddress(street, streetNo, postalCode, city, country) {
    this.enterStreet(street);
    this.enterStreetNumber(streetNo);
    this.enterPostalCode(postalCode);
    this.enterCity(city);
    this.selectCountry(country);
  }

  /**
   * Fill complete billing form with field availability checks
   */
  fillBillingForm(data) {
    // Delivery date (if provided)
    if (data.deliveryDate) this.selectDeliveryDate();

    // Company details (if provided)
    if (data.company) this.enterCompany(data.company);
    if (data.vatNumber) this.enterVatNumber(data.vatNumber);

    // Personal details
    this.enterFirstName(data.firstName);
    this.enterLastName(data.lastName);
    this.enterEmail(data.email);
    this.enterPhone(data.phone);

    // Date of birth (if provided)
    if (data.dobYear && data.dobMonth && data.dobDay) {
      this.selectDateOfBirth(data.dobYear, data.dobMonth, data.dobDay);
    }

    // Address
    this.enterStreet(data.street);
    this.enterStreetNumber(data.streetNumber);
    if (data.addressRemark) this.enterAddressRemark(data.addressRemark);
    this.enterPostalCode(data.postalCode);
    this.enterCity(data.city);
    this.selectCountry(data.country);

    // Notes (if provided)
    if (data.notes) this.enterNotes(data.notes);
  }
}

export default new CheckoutPage();
