---
name: "🐞 Bug Report"
about: Report a defect or unexpected behavior in the application
title: "[BUG] Search does not return valid course after pagination in Course Management"
labels: ["bug"]
assignees: []
---

# 🐞 Bug Report

## Summary

Search functionality fails to retrieve a valid course after navigating to another page in the Course Management module using pagination.

---

## Environment

| Field | Value |
|-------|-------|
| Environment | QA |
| Browser | Chrome |
| Browser Version | |
| OS | Windows 11 Home Single Language |
| Build / Version | |
| Module | Course Management - Search |

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
- A valid course exists in the system.

---

## Steps to Reproduce

1. Launch the application.
2. Log in successfully.
3. Navigate to the **Course Management** page.
4. Click the **Next** button to navigate to another page.
5. Enter a valid course name in the search bar.
6. Observe the search results.

---

## Expected Result

The searched course should be displayed regardless of the current pagination page.

---

## Actual Result

No course details are displayed when searching from a page other than the first page.

---

## Frequency

- [x] Always
- [ ] Intermittent
- [ ] Rare
- [ ] Unable to Reproduce

---

## Impact

Users are unable to locate valid courses after navigating through pagination, affecting the usability of the Course Management module.

---

## Error Messages / Logs

```text
No error message displayed.
Search returns no results even for valid course names after pagination.
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

The search works correctly when the user is on the first page. The issue occurs only after navigating using pagination, indicating that the search may be filtering only the current page instead of searching across all available course records.

---

## Reporter Details

| Field | Value |
|-------|-------|
| Reported By | Jagadeep K C |
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