# 8. Architecture Discussion

## Architectural Decisions
- **Page Object Model (POM):** Centralizes all locators and interaction helpers in `AutocompletePage.ts`. If DOM locators change, test specs remain untouched.
- **Isolated API Testing:** Uses Playwright's `request` context, executing headless HTTP assertions without launching browser instances.
- **Configuration Segregation:** Kept environment-specific settings (IST timezone `Asia/Kolkata` and locale `en-IN`) inside `tests/config/playwright.config.ts`.
