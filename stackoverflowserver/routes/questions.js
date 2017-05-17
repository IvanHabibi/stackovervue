var express = require('express');
var router = express.Router();
var questionController = require("../controllers/questionController")


router.post('/', questionController.insertQuestiontoUser);
router.get('/', questionController.getAllQuestion);
router.get('/:id', questionController.getOneQuestion)
router.put('/:id',questionController.updateQuestion)
router.delete('/:id',questionController.deleteQuestion)

module.exports = router;
