const { createHomework } = require("../handlers/homeworks");
const { Homework } = require("../models");

async function getSubjectListController(req, res) {
    try {
        const homeworks = await Homework.find();
        res.render('homeworks', {homeworks});
    } catch (error) {
        console.error('Error fetching homeworks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function getSubjectController(req, res) {
    res.render('Homework by Id');
}

function getSubjectFormController(req, res) {
    res.render('create-homework-form');
}

function postSubjectController(req, res) {
    const number = req.body.number;
    const title = req.body.title;
    const description = req.body.description;
    createHomework(number, title, description)
        .then(() =>  res.send('homework was added'))
        .catch(() =>  res.send('error, homework NOT SAVED'));
}

function putSubjectController(req, res) {
    res.send('putHomeworkController');
}

function deleteSubjectController(req, res) {
    res.send('deleteHomeworkController');
}

module.exports = {
    getSubjectListController,
    getSubjectController,
    getSubjectFormController,
    putSubjectController,
    deleteSubjectController,
    postSubjectController,
};