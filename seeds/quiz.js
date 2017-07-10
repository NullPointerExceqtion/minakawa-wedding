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

function saveQuestionsDocs(questionData) {
  return new Promise(function(resolve, reject) {
    var questions = new Questions()
    questions.no = questionData.no
    questions.title = questionData.title
    questions.body = questionData.body
    questions.type = questionData.type
    if(questionData.type === 'image'){
      questions.image_path1 = questionData.image_path1
      questions.image_path2 = questionData.image_path2
      questions.image_path3 = questionData.image_path3
    }
    questions.answer1 = questionData.answer1
    questions.answer2 = questionData.answer2
    questions.answer3 = questionData.answer3
    questions.answer4 = questionData.answer4
    questions.correct_answer = questionData.correct_answer
    questions.description = questionData.description
    questions.save(function() {
      resolve()
    })
  })
}

var questionsData = [
  {
    no: 1,
    title: 'テスト問題1',
    body: 'テスト問題1本文',
    type: 'sentence',
    answer1: 'テスト問題1_選択肢1',
    answer2: 'テスト問題1_選択肢2',
    answer3: 'テスト問題1_選択肢3',
    answer4: 'テスト問題1_選択肢4',
    description: 'テスト問題1_解説テスト問題',
    correct_answer: 1
  },
  {
    no: 2,
    title: 'テスト問題2',
    body: 'テスト問題2本文',
    type: 'image',
    image_path1: '/quiz/2/img1.jpg',
    image_path2: '/quiz/2/img2.jpg',
    image_path3: '/quiz/2/img3.jpg',    
    answer1: 'テスト問題2_選択肢1',
    answer2: 'テスト問題2_選択肢2',
    answer3: 'テスト問題2_選択肢3',
    answer4: 'テスト問題2_選択肢4',
    description: 'テスト問題2_解説テスト問題',
    correct_answer: 2
  },
  {
    no: 3,
    title: 'テスト問題3',
    body: 'テスト問題3本文',
    type: 'image',
    image_path1: '/quiz/3/img1.jpg',
    image_path2: '/quiz/3/img2.jpg',
    image_path3: '/quiz/3/img3.jpg',   
    answer1: 'テスト問題3_選択肢1',
    answer2: 'テスト問題3_選択肢2',
    answer3: 'テスト問題3_選択肢3',
    answer4: 'テスト問題3_選択肢4',
    description: 'テスト問題3_解説テスト問題',
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
