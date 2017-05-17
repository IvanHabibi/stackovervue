var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController")
const passport = require('passport');

// router.post('/validate', userController.userValidation);
router.post('/signup', userController.signUp);
// router.post('/signupplus', userController.signUp,passport.authenticate('local', { session: false }), userController.sendToken);
router.post('/signin', passport.authenticate('local', { session: false }), userController.sendToken);
router.get('/', userController.getAllUser);
router.get('/:id', userController.getOneUser)
router.delete('/:id',userController.deleteUser)

module.exports = router;
