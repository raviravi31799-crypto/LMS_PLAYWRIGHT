import { ExcelUtils } from "./ExcelUtils";

async function generateTestData() {
    console.log("Generating True/False and MCQ Excel test data files...");

    // 1. True / False Questions
    const trueFalseData = [
        {
            Category: "Java",
            Question: "Java is a platform-independent programming language.",
            Option1: "True",
            Option2: "False",
            CorrectAnswer: "True"
        },
        {
            Category: "Java",
            Question: "Multiple inheritance is directly supported in Java using classes.",
            Option1: "True",
            Option2: "False",
            CorrectAnswer: "False"
        },
        {
            Category: "SQL",
            Question: "A primary key column in SQL can contain duplicate or NULL values.",
            Option1: "True",
            Option2: "False",
            CorrectAnswer: "False"
        },
        {
            Category: "Python",
            Question: "Python is a dynamically typed programming language.",
            Option1: "True",
            Option2: "False",
            CorrectAnswer: "True"
        }
    ];

    const tfPath = await ExcelUtils.writeExcelFromJSON(
        "TrueFalseQuestions.xlsx",
        "TrueFalse",
        ["Category", "Question", "Option1", "Option2", "CorrectAnswer"],
        trueFalseData
    );
    console.log(`Created: ${tfPath}`);

    // 2. MCQ Multiple Choice Questions
    const mcqData = [
        {
            Category: "Java",
            Question: "Which keyword is used to inherit a class in Java?",
            Option1: "extends",
            Option2: "implements",
            CorrectAnswer: "extends"
        },
        {
            Category: "Java",
            Question: "Which method is the main entry point of a Java application?",
            Option1: "start()",
            Option2: "main()",
            CorrectAnswer: "main()"
        },
        {
            Category: "SQL",
            Question: "Which command is used to retrieve data from a database?",
            Option1: "INSERT",
            Option2: "SELECT",
            CorrectAnswer: "SELECT"
        },
        {
            Category: "Python",
            Question: "Which keyword defines a function in Python?",
            Option1: "def",
            Option2: "define",
            CorrectAnswer: "def"
        }
    ];

    const mcqPath = await ExcelUtils.writeExcelFromJSON(
        "MCQQuestions.xlsx",
        "MCQ",
        ["Category", "Question", "Option1", "Option2", "CorrectAnswer"],
        mcqData
    );
    console.log(`Created: ${mcqPath}`);
}

generateTestData().catch(err => {
    console.error("Error generating test data:", err);
    process.exit(1);
});
