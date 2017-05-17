var User = require('../models/user');
const jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var util = {};



util.passportAuth = function(username, password, next) {
    User.findOne({
        username: username
    }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (user == null) {
            return next(null, {
                msg: 'username not match anyone'
            });
        }

        if (!passwordHash.verify(password, user.password)) {
            return next(null, {
                msg: 'password not match with username'
            });
        }
        return next(null, user);
    });
}

module.exports = util;
