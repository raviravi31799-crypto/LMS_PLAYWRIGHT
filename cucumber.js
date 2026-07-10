module.exports={
    default: {
        formatOptions: {
            "snippetInterface":"async-await"
        },

        
        requireModule: [
            "ts-node/register"
        ],
        require: [
            "src/test/hooks/*.ts",
            "src/test/steps/DynamicCourseCategory.ts",
        ],

        paths: [
             "src/test/features/DynamicFieldManagement/DynamicCouseCategory.feature"
         ],
    

    publishQuiet: true,
    dryRun: false,

    format: [
        "progress-bar",
        "html:reports/cucumber-html/cucumber-report.html",
        "json:reports/cucumber-json/cucumber-report.json",
       // " allure-cucumberjs/reporter",
        "rerun:rerun/rerun.txt"
    ]
    },
    rerun: {
        formatOptions: {
            "snippetInterface":"async-await"
        },

        
        requireModule: [
            "ts-node/register"
        ],
        require: [
            "src/hooks/*.ts",
            "src/test/steps/*.ts",
            "src/test/support/**/*.ts"
        ],
         paths: [
             "rerun/rerun.txt"
         ],
    

    publishQuiet: true,
    dryRun: false,

    format: [
        "progress-bar",
        "html:reports/cucumber-report.html",
        "json:reports/cucumber-report.json",
        "rerun:rerun/rerun.txt"
        
    ]
    }
    
};
