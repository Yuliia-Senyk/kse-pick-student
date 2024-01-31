const mongoose =  require("mongoose");
const Schema =  require("mongoose").Schema;


const SubmissionSchema = new Schema({
    homeworkTitle: String,
    date: Date,
    answered: Boolean,
    remarks: String,
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = {
    SubmissionSchema,
    Submission,
};