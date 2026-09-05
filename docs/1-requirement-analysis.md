# 1. Requirement Analysis

## Target System & Scope
- **Application URL:** `https://test.com/autocomplete-form`
- **Target User Session:** `test123@gmail.com`
- **Client Profile:** Windows 10, Chrome, Locale: English (`en-IN`), Timezone: IST (UTC+05:30)

## Functional Deliverables
- **FR-01 (Text Input):** Users can type text or select an item from the suggestion list.
- **FR-02 (Prefix Matching - Default):** Characters entered must filter suggestions strictly by prefix match.
- **FR-03 (Match Anywhere - Configurable):** When enabled on backend, substring matching anywhere in the suggestion is applied.
- **FR-04 (Form Submission):** Next button triggers a REST POST call. Returns HTTP 200 on success and shows `.success-container`. Invalid inputs trigger `.error-message`.
- **FR-05 (Backend Contract):** Persisted response must retain `account_id`, `account_email`, `start_date` (local ISO time), `end_date` (local ISO time), `locale` (IETF BCP 47), `text`, `suggestion_list` (comma-separated), and `completed` (boolean).