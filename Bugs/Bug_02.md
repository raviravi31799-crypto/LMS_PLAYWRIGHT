---
name: "🐞 Bug Report"
about: Report a defect or unexpected behavior in the application
title: "[BUG] Duration field accepts negative values in Pedagogy time limit"
labels: ["bug"]
assignees: []
---

# 🐞 Bug Report

## Summary

The duration/time limit field in the **Pedagogy** section of **Add Course Structure** accepts negative values, allowing users to set an invalid time limit.

---

## Environment

| Field | Value |
|-------|-------|
| Environment | QA |
| Browser | Chrome |
| Browser Version | |
| OS | Windows 11 Home Single Language |
| Build / Version | |
| Module | Course Management - Course Structure |

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

- User is logged into the application successfully.
- User has access to the Course Management module.
- User is on the **Add Course Structure** page.

---

## Steps to Reproduce

1. Launch the application.
2. Log in successfully.
3. Navigate to the **Course Management** page.
4. Click **Course Structure**.
5. Click **Add Module** and enter the required details.
6. Navigate to the **Pedagogy** section.
7. Enter a negative value in the **Duration/Time Limit** field.
8. Observe the field behavior.

---

## Expected Result

The duration/time limit field should accept **only positive numeric values**. Negative values should be restricted or display a validation message.

---

## Actual Result

The duration/time limit field accepts both **negative and positive numeric values**.

---

## Frequency

- [x] Always
- [ ] Intermittent
- [ ] Rare
- [ ] Unable to Reproduce

---

## Impact

Users can configure invalid negative time limits for pedagogy, leading to inconsistent course configuration and potential application errors.

---

## Error Messages / Logs

```text
No validation message is displayed.
The duration field accepts negative values.
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

The duration field should validate the input by restricting values to positive integers only. Negative values should either be prevented from being entered or display an appropriate validation error.

---

## Reporter Details

| Field | Value |
|-------|-------|
| Reported By | Sriram K |
| Assigned To | |
| Date Reported | 09-07-2026 |
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
- [x] Labels assigned appropriately