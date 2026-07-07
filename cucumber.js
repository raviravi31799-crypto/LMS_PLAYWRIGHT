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
            "src/test/steps/*.ts",
        ],

        paths: [
             "src/test/features/**/*.feature"
         ],
    

    publishQuiet: true,
    dryRun: false,

    format: [
        "progress-bar",
        "html:reports/cucumber-html/cucumber-report.html",
        "json:reports/cucumber-json/cucumber-report.json",
        "rerun:rerun/rerun.txt"
    ]
    }
}