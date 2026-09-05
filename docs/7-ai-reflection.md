# 7. AI Reflection

## a. Tools Used
- ChatGPT (OpenAI GPT-4o) / Claude 3.5 Sonnet.

## b. Usage Areas
- Generating Playwright TypeScript Page Object scaffolding.
- Writing ISO-8601 and IETF BCP 47 regular expression assertions.
- Comparing FR-05 contract fields against sample payloads.

## c. Modifications Made
1. **Timestamp Offset Enforcement:** The AI initially used `Date.parse()` to validate timestamps, which silently allows UTC timestamps ending in `Z`. I modified this to an explicit regex assertion (`\+05:30$`) to ensure compliance with the user's local timezone (IST).
2. **Suggestion List Filtering Check:** The AI's first draft only asserted that `suggestion_list` was a non-empty string, which would have let the defective response (containing all 3 original suggestions instead of just the selected one) pass. I added an explicit assertion that every comma-separated item in `suggestion_list` must start with the submitted `text`, so the data-leakage defect is actually caught.

## d. AI Limitations
- The AI failed to flag `"completed": "true"` as invalid during initial script generation due to loose type comparisons (`==`), incorrectly treating a string literal as a valid boolean primitive without explicit constraints.