
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: {type: String, default: ""},
  hitoshi_count: {type: Number, default: 5},
  correct_answer_count:  {type: Number, default: 0},
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Users", UserSchema);
