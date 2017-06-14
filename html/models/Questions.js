
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionsSchema = new Schema({
  title: {type: String, default: ""},
  body: {type: String, default: ""},
  answer1: {type: String, default: ""},
  answer2: {type: String, default: ""},
  answer3: {type: String, default: ""},
  answer4: {type: String, default: ""},
  correct_answer: {type: String},
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Questions", QuestionsSchema);
