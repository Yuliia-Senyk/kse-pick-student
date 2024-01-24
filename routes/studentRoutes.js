const router = require('express').Router();

const studentController = require('../controllers/studentController');

router.get('/', studentController.getStudentListController);
router.get('/random', studentController.getRandomStudentController);
router.get('/new', studentController.getStudentFormController);
router.get('/:id', studentController.getStudentByIdController);
router.post('/', studentController.postStudentController);
router.put('/:id', studentController.putStudentController);
router.delete('/:id', studentController.deleteStudentController);

module.exports = router;