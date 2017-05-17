var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var index = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');
var answers = require('./routes/answers');
var cors = require('cors');
var app = express();
var util = require('./helpers/utils');



mongoose.connect('mongodb://localhost/stackoverflow');
// mongoose.connect('mongodb://fearzen3:Mavericks.23@stackoverflow-shard-00-00-hka0f.mongodb.net:27017,stackoverflow-shard-00-01-hka0f.mongodb.net:27017,stackoverflow-shard-00-02-hka0f.mongodb.net:27017/stackoverflow?ssl=true&replicaSet=stackoverflow-shard-0&authSource=admin');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongodb");
});
app.use(cors())

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*")
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
   next()
})
passport.use(new Strategy(util.passportAuth))

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/users', users);
app.use('/questions', questions);
app.use('/answers', answers);

module.exports = app;
