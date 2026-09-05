import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../',
  timeout: 30000,
  retries: 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://test.com',
    locale: 'en-IN',
    timezoneId: 'Asia/Kolkata',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});