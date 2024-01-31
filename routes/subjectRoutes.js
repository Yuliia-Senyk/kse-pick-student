const express = require('express');
const router = express.Router();

const homeworkController = require("../controllers/subjectController");

router.get('/', homeworkController.getHomeworkListController);
router.get('/new', homeworkController.getHomeworkFormController);
router.get('/:id', homeworkController.getHomeworkController);
router.post('/', homeworkController.postHomeworkController);
router.get('/:id', homeworkController.putHomeworkController);
router.delete('/', homeworkController.deleteHomeworkController);

module.exports = router;
