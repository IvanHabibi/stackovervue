var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({

  answer_text:String,
  answer_creator : String,
  creator_id:String,
  isEdit: {
    type:Boolean,
    default:false
  },
  user_id: { type: Schema.Types.ObjectId, ref: 'users' },
  up_vote:{
    type: Number,
    default:0
  },
  total_vote:{
    type: Number,
    default:0
  },
  vote_id: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
  }]
});

var Answer = mongoose.model('answers', answerSchema);

module.exports = Answer;
