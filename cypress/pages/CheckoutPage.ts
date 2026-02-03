import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly path = '/checkout';

  // --- Selectors ---

  private get firstNameInput() {
    return this.getByTestId('input-first-name');
  }

  private get lastNameInput() {
    return this.getByTestId('input-last-name');
  }

  private get streetInput() {
    return this.getByTestId('input-street');
  }

  private get cityInput() {
    return this.getByTestId('input-city');
  }

  private get postalCodeInput() {
    return this.getByTestId('input-postal-code');
  }

  private get countrySelect() {
    return this.getByTestId('select-country');
  }

  private get emailInput() {
    return this.getByTestId('input-email');
  }

  private get phoneInput() {
    return this.getByTestId('input-phone');
  }

  private get continueButton() {
    return this.getByTestId('checkout-continue-btn');
  }

  private get vatNumberInput() {
    return this.getByTestId('vat-number-input');
  }

  // --- Actions ---

  fillPersonalInfo(firstName: string, lastName: string, email: string, phone?: string): this {
    this.firstNameInput.clear();
    this.getByTestId('input-first-name').type(firstName);
    this.lastNameInput.clear();
    this.getByTestId('input-last-name').type(lastName);
    this.emailInput.clear();
    this.getByTestId('input-email').type(email);
    if (phone) {
      this.phoneInput.clear();
      this.getByTestId('input-phone').type(phone);
    }
    return this;
  }

  fillAddress(address: Address): this {
    this.streetInput.clear();
    this.getByTestId('input-street').type(address.street);
    this.cityInput.clear();
    this.getByTestId('input-city').type(address.city);
    this.postalCodeInput.clear();
    this.getByTestId('input-postal-code').type(address.postal_code);
    this.countrySelect.select(address.alpha2);
    return this;
  }

  enterVatNumber(vatNumber: string): this {
    this.vatNumberInput.clear();
    this.getByTestId('vat-number-input').type(vatNumber);
    return this;
  }

  continue(): void {
    this.continueButton.click();
    this.waitForLoadingComplete();
  }

  verifyStepActive(step: 'address' | 'shipping' | 'payment' | 'review'): this {
    this.getByTestId(`step-${step}`).should('have.class', 'active');
    return this;
  }
}
