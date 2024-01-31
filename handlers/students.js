const Student = require('../models/student').Student;
const { Submission } = require('../models/submission');

function createStudent(name) {
    const student = new Student({ name: name, homeworks: [] });
    return student.save();
}

async function addStudentSubmission(studentId, { homeworkTitle, remarks, date, answered }) {
    const student = await Student.findOne({ _id: studentId });
    const submission = new Submission({
        homeworkTitle,
        remarks,
        date,
        answered: answered === 'on'
    });
    student.homeworks.push(submission);
    return student.save();
}

module.exports = {
    createStudent,
    addStudentSubmission,
};
