var method = {}
var User = require("../models/user");
var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config();

method.getAllUser = (req, res) => {
    User.find(function(err, users) {
        if (err) {
            res.send(err)
        } else {
            res.send(users);
        }
    });
}

method.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        var response = {
            message: "user successfully deleted",
            id: user._id
        };
        res.send(response);
    });
}

method.signUp = (req, res) => {
  var user = new User();
  user.name = req.body.username;
  user.username = req.body.username;
  user.password = passwordHash.generate(req.body.password);
    user.save(function(err, createdUser) {
        if (err) {
            res.send(err);
        }
        res.send(createdUser);
    })
}

method.getOneUser = (req, res) => {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            res.send(err)
        }
        res.send(user)
    })
}

method.sendToken = function(req, res) {

    var user = req.user
    console.log(user);
    if (!user.msg) {
      console.log('bikin token');
        var token = jwt.sign({
            username: user.username,
            name: user.name,
        }, process.env.SECRET_KEY, {
            expiresIn: '3h'
        });
        res.send({
            'username' : user.username,
            'token': token,
            'id':user._id
        })

      res.send(user.msg)
    }
    res.send(user)
}

// method.userValidation = function(req, res){
//
//   jwt.verify(req.body.token), process.env.SECRET_KEY, (err, decoded) => {
//       if (decoded) {
//         res.send('valid');
//       } else {
//         res.send('not valid')
//       }
//   })
// }

module.exports = method;
