
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionsSchema = new Schema({
  no: {type: Number, default: null},
  title: {type: String, default: ""},
  body: {type: String, default: ""},
  type: {type: String, default: ""},
  image_path1: {type: String, default: ""},
  image_path2: {type: String, default: ""},
  image_path3: {type: String, default: ""},
  answer1: {type: String, default: ""},
  answer2: {type: String, default: ""},
  answer3: {type: String, default: ""},
  answer4: {type: String, default: ""},
  correct_answer: {type: Number, default: null},
  description: {type: String, default: ""},
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Questions", QuestionsSchema);
