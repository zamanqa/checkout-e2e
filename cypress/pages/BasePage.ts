export abstract class BasePage {
  abstract readonly path: string;

  visit(apiKey: string, queryParams?: Record<string, string>) {
    const params = queryParams ? '?' + new URLSearchParams(queryParams).toString() : '';
    cy.visit(`/${apiKey}${this.path}${params}`);
  }

  waitForPageLoad() {
    cy.get('[data-testid="checkout-container"]').should('be.visible');
  }

  getByTestId(testId: string) {
    return cy.get(`[data-testid="${testId}"]`);
  }

  assertErrorMessage(expectedText: string) {
    this.getByTestId('error-message').should('be.visible').and('contain.text', expectedText);
  }

  waitForLoadingComplete() {
    cy.get('[data-testid="loading-spinner"]').should('not.exist');
  }

  assertUrl(expectedPath: string) {
    cy.url().should('include', expectedPath);
  }
}
