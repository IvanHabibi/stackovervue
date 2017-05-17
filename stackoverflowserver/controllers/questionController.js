var method = {}
var Question = require("../models/question");
var User = require("../models/user");
method.getAllQuestion = (req, res) => {
    Question.find(function(err, questions) {
        if (err) {
            res.send(err)
        } else {
            res.send(questions);
        }
    });
}

method.deleteQuestion = (req, res) => {
    Question.findByIdAndRemove(req.params.id, function(err, question) {
        var response = {
            message: "quetion successfully deleted",
            id: question._id
        };
        res.send(response);
    });
}


method.getOneQuestion = (req, res) => {
    Question.findById(req.params.id, function(err, question) {
        if (err) {
            res.send(err)
        }
        res.send(question)
    })
}

method.insertQuestiontoUser = (req, res) => {
  console.log(req.body);
    var question = new Question(req.body);
    question.save(function(err, question) {
        if (err) {
            res.send(err);
        }
        User.findById( req.body.creator_id,function(err, user) {
          console.log(user);
            if (err) {

                res.send(err)
            } else {
              console.log('asd');
                if (user.question == undefined || user.question == null) {
                    user.question = question.id
                } else {
                    user.question.push(question.id)
                }
                user.save(function(err, user) {
                    if (err) {
                        res.send(err)
                    }
                    res.send(question);
                });

            }
        })
    });
}

method.updateQuestion = (req, res) => {
    Question.findById(req.params.id, function(err, question) {

        if (err) {
            res.send(err);
        } else {
          question.question_title = req.body.question_title || question.question_title
          question.question_text = req.body.question_text || question.question_text
          question.up_vote = req.body.up_vote || question.up_vote
          question.total_vote = req.body.total_vote || question.total_vote

            question.save(function(err, question) {
                if (err) {
                    res.send(err)
                }
                res.send(question);
            });
        }
    });
}

module.exports = method;
