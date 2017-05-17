var method = {}
var Answer = require("../models/answer");
var Question = require("../models/question");

method.getAllAnswer = (req, res) => {
    Answer.find(function(err, answers) {
        if (err) {
            res.send(err)
        } else {
            res.send(answers);
        }
    });
}

method.getAllAnswerbyQuestion = (req, res) => {
    Question.findById(req.params.id, function(err, question) {
        if (err) {
            // res.send(err)
            res.send({msg:'question empty'})
        }
    }).populate('answer').exec((err, result) => {
        if (result) {
            res.send(result)
        } else {
            res.send(`ERR getall :\n ${err}`)
        }
    })
}


method.deleteAnswer = (req, res) => {
    Answer.findByIdAndRemove(req.params.id, function(err, answer) {
        var response = {
            message: "answer successfully deleted",
            id: answer._id
        };
        res.send(response);
    });
}


method.getOneAnswer = (req, res) => {
    Answer.findById(req.params.id, function(err, answer) {
        if (err) {
            res.send(err)
        }
        res.send(answer)
    })
}

method.insertAnswertoQuestion = (req, res) => {
  var answer = new Answer(req.body);
    answer.save(function(err, answer) {
        if (err) {
            res.send(err);
        }
        Question.findById( req.body.id,function(err, question) {
            if (err) {

                res.send(err)
            } else {
                if (question.answer == undefined || question.answer == null) {
                    question.answer = answer.id
                } else {
                    question.answer.push(answer.id)
                }
                question.save(function(err, question) {
                    if (err) {
                        res.send(err)
                    }
                    res.send(answer);
                });

            }
        })
    });
}

method.updateAnswer = (req, res) => {
    Answer.findById(req.params.id, function(err, answer) {

        if (err) {
            res.send(err);
        } else {
          answer.answer_text = req.body.answer_text || answer.answer_text
          answer.up_vote = req.body.up_vote || answer.up_vote
          answer.total_vote = req.body.total_vote || answer.total_vote

            answer.save(function(err, answer) {
                if (err) {
                    res.send(err)
                }
                res.send(answer);
            });
        }
    });
}

module.exports = method;
