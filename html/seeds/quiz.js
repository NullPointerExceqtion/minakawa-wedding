const mongoose = require('mongoose')
const Questions = require('../models/Questions')
/**
 * @see https://stackoverflow.com/questions/38138445/node3341-deprecationwarning-mongoose-mpromise
 */
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/quiz')

function saveQuestionsDocs(questionData) {
  return new Promise(function(resolve, reject) {
    var questions = new Questions()
    questions.title = questionData.title
    questions.body = questionData.body
    questions.answer1 = questionData.answer1
    questions.answer2 = questionData.answer2
    questions.answer3 = questionData.answer3
    questions.answer4 = questionData.answer4
    questions.correct_answer = questionData.correct_answer
    questions.save(function() {
      resolve()
    })
  })
}

var questionsData = [
  {
    title: 'テスト問題5',
    body: 'テスト問題5本文',
    answer1: 'テスト問題5_選択肢1',
    answer2: 'テスト問題5_選択肢2',
    answer3: 'テスト問題5_選択肢3',
    answer4: 'テスト問題5_選択肢4',
    correct_answer: 1
  },
  {
    title: 'テスト問題6',
    body: 'テスト問題6本文',
    answer1: 'テスト問題6_選択肢1',
    answer2: 'テスト問題6_選択肢2',
    answer3: 'テスト問題6_選択肢3',
    answer4: 'テスト問題6_選択肢4',
    correct_answer: 2
  },
  {
    title: 'テスト問題7',
    body: 'テスト問題7本文',
    answer1: 'テスト問題7_選択肢1',
    answer2: 'テスト問題7_選択肢2',
    answer3: 'テスト問題7_選択肢3',
    answer4: 'テスト問題7_選択肢4',
    correct_answer: 3
  }
]

Questions.remove({}, function(err) {
  if (err) {
    console.warn(err)
    return
  }

  var promise = questionsData.map(function(val) {
    return saveQuestionsDocs(val)
  })

  Promise.all(promise).then(function() {
    process.exit()
  })
})
