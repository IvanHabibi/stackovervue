var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({

  question_title:String,
  question_text:String,
  creator_id:String,
  question_creator : String,
  up_vote:{
    type: Number,
    default:0
  },
  total_vote:{
    type: Number,
    default:0
  },
  answer: [{
      type: Schema.Types.ObjectId,
      ref: 'answers'
  }],
  vote_id: [{type: String}]
});

var Question = mongoose.model('questions', questionSchema);

module.exports = Question;
