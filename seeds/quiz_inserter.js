const project = require('../config/project.config')
const mongoose = require('mongoose')
const Questions = require('../models/Questions')
/**
 * @see https://stackoverflow.com/questions/38138445/node3341-deprecationwarning-mongoose-mpromise
 */
mongoose.Promise = global.Promise

if (project.env === 'development') {
  mongoose.connect('mongodb://localhost/quiz')
} else {
  mongoose.connect('mongodb://heroku_7m70fbv9:10cb4sngheuhclogorf9g4snbb@ds141082.mlab.com:41082/heroku_7m70fbv9')
}

var jsonfile = require('jsonfile');

function saveQuestionsDocs(questionData) {
  return new Promise(function(resolve, reject) {
    var questions = new Questions()
    questions.no = questionData.no
    questions.title          = questionData.title
    questions.body           = questionData.body
    questions.type           = questionData.type
    questions.image_path1    = questionData.image_path1
    questions.image_path2    = questionData.image_path2
    questions.image_path3    = questionData.image_path3
    questions.answer1        = questionData.answer1
    questions.answer2        = questionData.answer2
    questions.answer3        = questionData.answer3
    questions.answer4        = questionData.answer4
    questions.correct_answer = questionData.correct_answer
    questions.description    = questionData.description

    questions.save(function() {
      resolve()
    })
  })
}

  function insertExce(path) {
    var json = jsonfile.readFileSync(path, {
      encoding: 'utf-8', 
      reviver: null, 
      throws: true
    })
    return json.map(function(val) {
      return saveQuestionsDocs(val)
    })
  }


Questions.remove({}, function(err) {
  if (err) {
    console.warn(err)
    return
  }

  var promise = insertExce('./quiz.json')

  Promise.all(promise).then(function() {
    process.exit()
  })
})
