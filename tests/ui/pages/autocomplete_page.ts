import { Page, Locator } from '@playwright/test';

export class AutocompletePage {
  readonly page: Page;
  readonly inputField: Locator;
  readonly suggestionsList: Locator;
  readonly suggestionItems: Locator;
  readonly nextButton: Locator;
  readonly successContainer: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputField = page.locator('#input-field');
    this.suggestionsList = page.locator('ul.suggestions');
    this.suggestionItems = page.locator('ul.suggestions li');
    this.nextButton = page.locator('#next-button');
    this.successContainer = page.locator('.success-container');
    this.errorMessage = page.locator('.error-message');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://test.com/autocomplete-form');
  }

  async enterText(value: string): Promise<void> {
    await this.inputField.fill(value);
  }

  async selectSuggestion(text: string): Promise<void> {
    await this.suggestionItems.filter({ hasText: text }).first().click();
  }

  async submit(): Promise<void> {
    await this.nextButton.click();
  }
}