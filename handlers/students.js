const Student = require('../models/student').Student;

function createStudent(name) {
    const student = new Student({ name: name, homeworks: [] });
    return student.save();
}

module.exports = {
    createStudent,

}