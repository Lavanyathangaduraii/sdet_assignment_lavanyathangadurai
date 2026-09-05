# 2. Top 10 Test Scenarios (Ranked by Risk)

1. **TS-01: Form Submission & Response Persistence with Valid Suggestion**
   - **Risk:** Critical
   - **Rationale:** Core primary workflow; persistence failure causes direct data loss of user submissions.

2. **TS-02: Client-Side and API Handling of Invalid/Unmatched Input**
   - **Risk:** Critical
   - **Rationale:** Unmatched entries must trigger error handling and prevent upstream database pollution.

3. **TS-03: Data Contract & Field Type Integrity (FR-05)**
   - **Risk:** High
   - **Rationale:** Schema mutations or broken types crash downstream analytics consumers.

4. **TS-04: Default Prefix Filtering Logic (FR-02)**
   - **Risk:** High
   - **Rationale:** Primary UI mechanism; if prefix evaluation fails, the user cannot select valid records.

5. **TS-05: Local Timezone Offset Accuracy (IST / UTC+05:30)**
   - **Risk:** High
   - **Rationale:** Telemetry relies on local user timestamps; unhandled UTC conversions corrupt session auditing.

6. **TS-06: Configurable Match-Anywhere Filtering (FR-03)**
   - **Risk:** Medium
   - **Rationale:** Ensures backward compatibility when administrators switch backend search modes.

7. **TS-07: Suggestion Item Selection State Synchronization**
   - **Risk:** Medium
   - **Rationale:** Verifies event listeners populate the input field accurately upon click or tap.

8. **TS-08: Full Keyboard Accessibility (Tab, Enter, Escape)**
   - **Risk:** Medium
   - **Rationale:** Ensures compliance for power users and keyboard-only navigational accessibility.

9. **TS-09: Authenticated User Identity Session Mapping**
   - **Risk:** Low
   - **Rationale:** Confirms contextual session data (`account_id`, `account_email`) properly maps into the payload.

10. **TS-10: Error & Success Notification Dynamic Visibility**
    - **Risk:** Low
    - **Rationale:** Ensures UI banner visibility toggles correctly between positive and negative execution states.
