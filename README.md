# SDET Practical Assignment — Lavanya Thangadurai

Automated UI and API test suite for the Autocomplete Form feature (`https://test.com/autocomplete-form`), built with [Playwright](https://playwright.dev/) and TypeScript.

## Project Structure
```
├── README.md
├── docs/
│   ├── 1-requirement-analysis.md
│   ├── 2-test-scenarios.md
│   ├── 3-defect-identification.md
│   ├── 4-test-cases.md
│   ├── 7-ai-reflection.md
│   └── 8-architecture-discussion.md
├── prompts/
│   ├── prompts.text          (AI prompts used during this assignment)
│   └── transcript.json       (Full JSON transcript of AI conversation)
├── tests/
│   ├── ui/
│   │   ├── pages/            (Page Object classes)
│   │   ├── tests/            (Playwright UI test scripts)
│   │   └── config/           (Browser/locale/timezone config)
│   └── api/
│       └── tests/            (API contract & negative test scripts)
└── package.json
```

## Prerequisites
- Node.js 18+ and npm
- Playwright browsers (Chromium) — already installed in this environment via `npx playwright install --with-deps`

## Setup
```bash
npm install
```

## Running the Tests
```bash
# Run everything (UI + API)
npm test

# Run only the UI suite
npm run test:ui

# Run only the API suite
npm run test:api

# View the last HTML report
npm run report
```

## Notes
- `https://test.com/autocomplete-form` is a fictitious/mock URL provided in the assignment spec. To make the UI suite genuinely executable, [prompts/test.html](prompts/test.html) bundles the exact HTML structure given in the assignment plus a minimal vanilla-JS implementation of FR-01–FR-04 (prefix filtering, click-to-select, Escape-to-hide, and submit success/error toggling). [tests/ui/pages/autocomplete_page.ts](tests/ui/pages/autocomplete_page.ts) navigates to this local fixture via a `file://` URL, so `npm run test:ui` runs and passes with **no external server required**.
- UI config ([tests/ui/config/playwright.config.ts](tests/ui/config/playwright.config.ts)) fixes `locale: en-IN` and `timezoneId: Asia/Kolkata` to match the specified test environment (India, IST/UTC+05:30).
- API tests ([tests/api/tests/formContract.spec.ts](tests/api/tests/formContract.spec.ts)) validate the FR-05 backend data contract (field names, IETF BCP 47 locale, local ISO-8601 timestamps `+05:30`, boolean `completed`, filtered `suggestion_list`, plus 2 negative cases) against the assumed live backend endpoint `https://test.com/api/response/98765`; since no real backend exists, these are provided as spec-accurate, ready-to-run scripts intended to execute against the actual/mocked service.

## Documentation
See the [docs](docs) folder for requirement analysis, ranked test scenarios, the FR-05 defect report, detailed test cases, AI-usage reflection, and architecture discussion. See the [prompts](prompts) folder for the AI prompt log, full conversation transcript, and the local HTML test fixture.