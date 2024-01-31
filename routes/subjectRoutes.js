const express = require('express');
const router = express.Router();

const homeworkController = require("../controllers/subjectController");

router.get('/', homeworkController.getSubjectListController);
router.get('/new', homeworkController.getSubjectController);
router.get('/:id', homeworkController.getSubjectFormController);
router.post('/', homeworkController.postSubjectController);
router.get('/:id', homeworkController.putSubjectController);
router.delete('/', homeworkController.deleteSubjectController);

module.exports = router;
