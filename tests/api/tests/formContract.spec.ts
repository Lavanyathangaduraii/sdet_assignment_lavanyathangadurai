import { test, expect } from '@playwright/test';

test.describe('FR-05 API Contract & Validation Suite', () => {
  const RESPONSE_URL = 'https://test.com/api/response/98765';

  test('Validate Schema, Locale, and Local Timestamps', async ({ request }) => {
    const response = await request.get(RESPONSE_URL);
    expect(response.status()).toBe(200);

    const data = await response.json();

    // Key existence assertions
    expect(data).toHaveProperty('account_id');
    expect(data).toHaveProperty('account_email');
    expect(data).toHaveProperty('start_date');
    expect(data).toHaveProperty('end_date');
    expect(data).toHaveProperty('locale');
    expect(data).toHaveProperty('text');
    expect(data).toHaveProperty('suggestion_list');
    expect(data).toHaveProperty('completed');

    // Data type verification
    expect(typeof data.completed).toBe('boolean');
    expect(data.completed).toBe(true);

    // IETF BCP 47 locale format (en-IN)
    expect(data.locale).toMatch(/^[a-z]{2,3}(-[A-Z]{2})?$/);
    expect(data.locale).toBe('en-IN');

    // ISO-8601 with local IST offset (+05:30)
    const istRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+05:30$/;
    expect(data.start_date).toMatch(istRegex);
    expect(data.end_date).toMatch(istRegex);

    // suggestion_list integrity
    const items = data.suggestion_list.split(',').map((s: string) => s.trim());
    for (const item of items) {
      expect(item.startsWith(data.text)).toBeTruthy();
    }
  });

  test('Negative Case 1: Rejection on Missing Required Field', async ({ request }) => {
    const response = await request.post('https://test.com/api/response', {
      data: {
        account_id: '98765',
        completed: true
      }
    });
    expect(response.status()).toBe(400);
  });

  test('Negative Case 2: Rejection on Invalid Suggestion String', async ({ request }) => {
    const response = await request.post('https://test.com/api/response', {
      data: {
        account_id: '98765',
        text: 'Invalid Suggestion Entry',
        completed: false
      }
    });
    expect(response.status()).toBe(422);
  });
});