var express = require('express');
var router = express.Router();
var answerController = require("../controllers/answerController")


router.get('/answerbyq/:id', answerController.getAllAnswerbyQuestion)
router.post('/', answerController.insertAnswertoQuestion);
router.get('/', answerController.getAllAnswer);
router.get('/:id', answerController.getOneAnswer)
router.put('/:id',answerController.updateAnswer)
router.delete('/:id',answerController.deleteAnswer)

module.exports = router;
