module.exports = {
    default: {
        formatOptions: {
            snippetInterface: "async-await",
            resultsDir: "allure-results"
        },

        requireModule: [
            "ts-node/register"
        ],

        require: [
            "src/test/hooks/*.ts",
            "src/test/steps/*.ts"
        ],

        paths: [
            "src/test/features/**/*.feature"
        ],

        publishQuiet: true,
        dryRun: false,

        format: [
            "html:reports/cucumber-html/cucumber-report.html",
            "json:reports/cucumber-json/cucumber-report.json",
            "rerun:rerun/rerun.txt",
            "allure-cucumberjs/reporter",
            "progress"
        ]
    },

    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },

        requireModule: [
            "ts-node/register"
        ],

        require: [
            "src/test/hooks/*.ts",
            "src/test/steps/*.ts"
        ],

        paths: [
            "rerun/rerun.txt"
        ],

        publishQuiet: true,
        dryRun: false,

        format: [
            "html:reports/cucumber-report.html",
            "json:reports/cucumber-report.json",
            "rerun:rerun/rerun.txt",
            "progress"
        ]
    }
};