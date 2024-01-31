const Student = require('../models').Student;
const { createStudent, addStudentSubmission, deleteSubmission } = require('../handlers/students');
const { Homework } = require("../models");

async function getStudentListController(req, res) {
    try {
        const students = await Student.find();
        res.render('students', { qty: students.length, students });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getStudentByIdController(req, res) {
    const studentId = req.params.id;
    try {
        const student = await Student.findOne({ _id: studentId });
        res.render('student-profile', { student: student});
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

async function getStudentSubmissionForm(req, res) {
    const homeworks = await Homework.find();
    const studentId = req.params.id;
    res.render('add-student-submission-form', { studentId, homeworks });
}

function postStudentController(req, res) {
    const studentName = req.body.name;
    const lastname = req.body.lastname;
    createStudent(studentName, lastname)
        .then(() => res.render('student-created'))
        .catch(() => res.send('student NOT SAVED'));
}

async function postStudentSubmission(req, res) {
    try {
        const studentId = req.params.id;
        await addStudentSubmission(studentId, req.body);
        res.redirect(`/students/${studentId}`);
    } catch (error) {
        console.error('Error adding homework:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteStudentSubmission(req, res) {
    try {
        const studentId = req.params.id;
        const submissionId = req.params.submissionId;
        await deleteSubmission(studentId, submissionId);
        res.redirect(`/students/${studentId}`);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
    getStudentSubmissionForm,
    postStudentController,
    postStudentSubmission,
    putStudentController,
    deleteStudentController,
    deleteStudentSubmission
};