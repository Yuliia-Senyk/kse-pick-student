const Student = require("./student").Student;
const StudentSchema = require("./student").StudentSchema;
const SubmissionSchema = require("./submission").SubmissionSchema;
const Submission = require("./submission").Submission;
const Homework = require("./homework").Homework;
const HomeworkSchema = require("./homework").HomeworkSchema;

module.exports = {
    Submission,
    SubmissionSchema,
    Student,
    StudentSchema,
    Homework,
    HomeworkSchema
};