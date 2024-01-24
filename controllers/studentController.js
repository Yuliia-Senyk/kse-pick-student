const Student = require('../models').Student;
const createStudent = require('../handlers/students').createStudent;


async function  getStudentListController(req, res) {
    try {
        const users = await Student.find();
        res.render('students', {qty: users.length, list: users});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getStudentByIdController(req, res) {
    const studentId = req.params.id;
    try {
        const student = await Student.findOne({_id: studentId});
        console.log(student); // Log users to the console
        res.render('student-profile', {student: student});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function getRandomStudentController(req, res) {
    res.send('get RandomStudentController');
}

function getStudentFormController(req, res) {
    res.render('create-student-form');
}

function postStudentController(req, res) {
    const studentName = req.body.name;
    createStudent(studentName)
        .then(() =>  res.send('student was added'))
        .catch(() =>  res.send('student NOT SAVED'));
}

function putStudentController(req, res) {
    res.send('putStudentController');
}

async function deleteStudentController(req, res) {
    const studentId = req.params.id;
    await Student.deleteOne({ _id: studentId });
    res.send('<span>user was deleted</span>');
}

module.exports = {
    getStudentListController,
    getStudentByIdController,
    getRandomStudentController,
    getStudentFormController,
    postStudentController,
    putStudentController,
    deleteStudentController
};