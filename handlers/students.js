const Student = require('../models/student').Student;
const { Submission } = require('../models/submission');

function createStudent(name, lastname) {
    const student = new Student({ name: name, lastname: lastname, homeworks: [] });
    return student.save();
}

async function addStudentSubmission(studentId, { homework, remarks, date, answered }) {
    let hw = JSON.parse(homework)
    const student = await Student.findOne({ _id: studentId });
    const submission = new Submission({
        id: hw._id,
        homeworkTitle: hw.title,
        remarks,
        date,
        answered: answered === 'on'
    });
    student.homeworks.push(submission);
    return student.save();
}


async function deleteSubmission(studentId, submissionId) {
    const student = await Student.findOne({ _id: studentId });
    student.homeworks = student.homeworks.filter(i => i.id !== submissionId);
    return student.save();
}

module.exports = {
    createStudent,
    addStudentSubmission,
    deleteSubmission
};
