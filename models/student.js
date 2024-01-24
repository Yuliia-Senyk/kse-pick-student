const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const SubmissionSchema = require("./submission").SubmissionSchema;

const StudentSchema =  new Schema({
    name: String,
    homeworks: [SubmissionSchema],
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = {
    StudentSchema,
    Student,
};