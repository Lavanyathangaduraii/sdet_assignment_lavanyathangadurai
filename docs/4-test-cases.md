# 4. Detailed Test Cases

### TC-01: Suggestion Prefix Filtering Verification (FR-02)
- **Preconditions:** User is on `https://test.com/autocomplete-form` with default prefix mode active.
- **Steps:**
  1. Click inside `#input-field`.
  2. Type `agile methodology p`.
  3. Inspect visible children of `ul.suggestions`.
- **Expected Result:** `agile methodology process` and `agile methodology process testing` remain visible. `agile methodology` is hidden.
- **Test Data:** Input string: `"agile methodology p"`.

### TC-02: Item Selection and Field Binding (FR-01)
- **Preconditions:** Suggestion list is rendered with suggestions visible.
- **Steps:**
  1. Click `<li>agile methodology</li>`.
  2. Check the value of `#input-field`.
- **Expected Result:** `#input-field` updates to `"agile methodology"`.
- **Test Data:** Selected item: `"agile methodology"`.

### TC-03: Keyboard Navigation & Submission Accessibility
- **Preconditions:** Page loaded; keyboard focus on address bar.
- **Steps:**
  1. Press `Tab` to navigate to `#input-field`.
  2. Type `agile methodology`.
  3. Press `Tab` twice to move focus to `#next-button`.
  4. Press `Enter`.
- **Expected Result:** Focus outlines follow DOM order logically; pressing `Enter` submits the form.
- **Test Data:** Keys: `Tab`, `Enter`.

### TC-04: Form Submission with Valid Input (FR-04)
- **Preconditions:** Valid suggestion selected in `#input-field`.
- **Steps:**
  1. Click `#next-button`.
  2. Wait for API persistence.
- **Expected Result:** HTTP 200 returned; `.success-container` displays "Success! Your response has been recorded."; `.error-message` is hidden.
- **Test Data:** Input: `"agile methodology"`.

### TC-05: Form Submission with Arbitrary/Invalid Value (FR-04 Negative)
- **Preconditions:** Form loaded.
- **Steps:**
  1. Type `unmatched random query` into `#input-field`.
  2. Click `#next-button`.
- **Expected Result:** `.error-message` is visible with "Error: Invalid input. Please select a valid suggestion."; `.success-container` is hidden.
- **Test Data:** Input: `"unmatched random query"`.

### TC-06: API Schema & Key Deserialization Verification (FR-05)
- **Preconditions:** Submission completed via API.
- **Steps:**
  1. Perform `GET /api/response/98765`.
  2. Validate object keys.
- **Expected Result:** Keys must be snake_case without spaces: `account_id`, `account_email`, `start_date`, `end_date`, `locale`, `text`, `suggestion_list`, `completed`.
- **Test Data:** ID: `"98765"`.

### TC-07: Local Timezone Offset Precision (API)
- **Preconditions:** Form submitted from user located in India (IST, UTC+05:30).
- **Steps:**
  1. Perform GET request to fetch response.
  2. Parse `start_date` and `end_date`.
- **Expected Result:** Timestamps must be in ISO-8601 ending in `+05:30` (not `Z`).
- **Test Data:** Timezone offset: `+05:30`.

### TC-08: Data Type & Boolean Integrity (API)
- **Preconditions:** Successful submission completed.
- **Steps:**
  1. Send GET request for response payload.
  2. Assert data type of `completed`.
- **Expected Result:** `completed` must be boolean `true`, not string `"true"`.
- **Test Data:** `typeof response.completed === 'boolean'`.
