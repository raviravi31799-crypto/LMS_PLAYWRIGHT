---
name: "🐞 Bug Report"
about: Report a defect or unexpected behavior in the application
title: "[BUG] Pedagogy dropdown overlay remains active and blocks other dropdowns"
labels: ["bug"]
assignees: []
---

# 🐞 Bug Report

## Summary

On the **Add Course** page, the **Pedagogy** dropdown overlay remains active after selecting an option, preventing users from interacting with the remaining dropdown fields.

---

## Environment

| Field | Value |
|-------|-------|
| Environment | QA |
| Browser | Chrome |
| Browser Version | |
| OS | Windows 11 Home Single Language |
| Build / Version | |
| Module | Course Management - Add Course - Pedagogy |

---

## Severity

- [ ] Critical (System/Application crash)
- [x] High (Major functionality broken)
- [ ] Medium (Feature partially affected)
- [ ] Low (Minor UI/Cosmetic issue)

---

## Priority

- [ ] P0 - Immediate
- [x] P1 - High
- [ ] P2 - Medium
- [ ] P3 - Low

---

## Preconditions

- User is logged into the application.
- User is on the **Add Course** form.
- The **Pedagogy** section is visible.

---

## Steps to Reproduce

1. Navigate to the **Add Course** page.
2. Go to the **Pedagogy** section.
3. Open the **"I Do"** dropdown.
4. Select **"Live Classes"**.
5. Attempt to click and open any of the remaining dropdown fields.

---

## Test Data

| Field | Value |
|-------|-------|
| Pedagogy Dropdown | I Do |
| Selected Option | Live Classes |

---

## Expected Result

After selecting an option, the dropdown should close automatically, allowing users to interact with the remaining dropdown fields.

---

## Actual Result

The selected dropdown overlay remains active, preventing users from opening or selecting values from the other dropdown fields.

---

## Frequency

- [x] Always
- [ ] Intermittent
- [ ] Rare
- [ ] Unable to Reproduce

---

## Impact

Users are unable to complete the Add Course form because the active dropdown overlay blocks interaction with other required fields, preventing course creation.

---

## Error Messages / Logs

```text
No error message is displayed.
The dropdown overlay remains active after selection and blocks user interaction.
```

---

## Screenshots / Screen Recording

Attach screenshots or a screen recording demonstrating the issue.

---

## Attachments

- [ ] Playwright HTML Report
- [ ] Cucumber HTML Report
- [ ] Allure Report
- [ ] Execution Logs
- [ ] Screenshot(s)
- [ ] Screen Recording

---

## Additional Information

The issue appears to be caused by the dropdown overlay not closing after an option is selected. The overlay should be dismissed automatically so users can continue interacting with the remaining form fields.

---

## Reporter Details

| Field | Value |
|-------|-------|
| Reported By | |
| Assigned To | |
| Date Reported | 12-07-2026 |
| Sprint | |
| Related Story / Task | |
| Related Pull Request | |
| Status | Open |

---

## Checklist

- [x] Bug reproduced successfully
- [x] Expected and actual results verified
- [ ] Supporting evidence attached
- [x] Environment details provided
- [x] Steps to reproduce are complete
- [x] Labels assigned appropriatelys