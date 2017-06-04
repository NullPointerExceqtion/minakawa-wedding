
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {type: String, required: "タイトルは必須です"},
  contents: {type: String, default: ""},
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Post", PostSchema);
