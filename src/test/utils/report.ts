const report = require("multiple-cucumber-html-reporter");
report.generate({
  jsonDir: "reports",
  reportPath: "reports/html",
  reportName: "Playwright BDD Report",
  pageTitle: "LMS-Authentication and course Management",
  displayDuration: false,
  metadata: {
    browser: {
      name: "chrome",
      version: "118",
    },
device: "Machine",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
  customData: {
    title: "Test info",
    data: [
      { label: "Project", value: "LMS" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "Smoke-1" },      ],    },  });

