import { test, expect } from '@playwright/test';
import { AutocompletePage } from '../pages/autocomplete_page';

test.describe('Autocomplete Form UI Suite', () => {
  let autocomplete: AutocompletePage;

  test.beforeEach(async ({ page }) => {
    autocomplete = new AutocompletePage(page);
    await autocomplete.goto();
  });

  test('Tab Navigation & Keyboard Interaction (Enter to submit)', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(autocomplete.inputField).toBeFocused();

    await autocomplete.enterText('agile methodology');
    await page.keyboard.press('Tab');
    await expect(autocomplete.nextButton).toBeFocused();
    await page.keyboard.press('Enter');
  });

  test('Escape Key closes or clears suggestions list', async ({ page }) => {
    await autocomplete.enterText('agile');
    await page.keyboard.press('Escape');
    await expect(autocomplete.suggestionsList).toBeHidden();
  });

  test('Suggestion Filtering - Prefix Match (FR-02)', async () => {
    await autocomplete.enterText('agile methodology p');
    await expect(autocomplete.suggestionItems).toHaveCount(2);
    await expect(autocomplete.suggestionItems.first()).toHaveText('agile methodology process');
  });

  test('Suggestion Selection Populates Field (FR-01)', async () => {
    await autocomplete.selectSuggestion('agile methodology');
    await expect(autocomplete.inputField).toHaveValue('agile methodology');
  });

  test('Form Submission Success Display (FR-04)', async () => {
    await autocomplete.selectSuggestion('agile methodology');
    await autocomplete.submit();
    await expect(autocomplete.successContainer).toBeVisible();
    await expect(autocomplete.errorMessage).toBeHidden();
  });

  test('Form Submission Error Display on Invalid Input (FR-04)', async () => {
    await autocomplete.enterText('unmatched random query');
    await autocomplete.submit();
    await expect(autocomplete.errorMessage).toBeVisible();
    await expect(autocomplete.successContainer).toBeHidden();
  });
});