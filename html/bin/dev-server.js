const project = require('../config/project.config')
const app = require('../server/main')
const debug = require('debug')('app:bin:dev-server')
const debugSocket = require('debug')('app:socket')

const http = require('http').Server(app)
const io = require('socket.io')(http)

const mongoose = require('mongoose')
const Users = require('../models/Users')
const Questions = require('../models/Questions')

// socket.ioを使用するためlistenするのはhttp側に変更
// server.listen(project.server_port)
http.listen(project.server_port)
debug(`Server is now running at http://localhost:${project.server_port}.`)

// データベースを接続
mongoose.connect('mongodb://localhost/quiz')
mongoose.Promise = global.Promise

io.on('connection', function (socket) {
  debugSocket('connection')

  var users = new Users()
  var questions = new Questions()

  /**
   * joinRoom
   * guestUser, hostUserはroom分けする
   * joinRoomは各react componentのcomponentDidMountのタイミングでemitしている
   * @param {string} roomName ルーム名 現状guest, hostのどちらか
   */
  socket.on('joinRoom', function (roomName) {
    debugSocket('joinRoom to ' + roomName)
    if (socket.roomName && socket.roomName !== roomName) {
      debugSocket('room change ' + socket.roomName + ' -> ' + roomName)
      socket.leave(socket.roomName)
    }

    if (socket.roomName === roomName) {
      return;
    }

    socket.roomName = roomName
    socket.join(roomName)
  })


  socket.on('quizListGiven', function (fn) {
    debugSocket('quizListGiven')

    // 全問題の出力
    Questions.find({}, function(err, docs) {
      let quizlist = []
      for (let i = 0, size = docs.length; i < size; ++i) {
        if (docs[i]) {
          quizlist.push({
            _id: docs[i]._id,
            title: docs[i].title
          })
        }
      }
      fn(quizlist)
    })
  })

  socket.on('quizPublished', function (_id) {
    Questions.find({ '_id': _id }, function (err, docs) {
      let answerlist = {}
      if (docs) {
        answerlist = docs[0]
      }
      socket.broadcast.to('guest').emit('quizPublished', answerlist, _id)
    })
  })

  socket.on('answerSubmitted', function (submittedNumber, _id, userId, fn) {
    debugSocket('submittedNumber: ' + submittedNumber)
    debugSocket('submittedQuizID: ' + _id)
    debugSocket('userID: ' + userId)

    Questions.find({ '_id': _id }, function (err, docs) {
      let quizinfo

      if (docs) {
        quizinfo = docs[0]
      }
      if (quizinfo.correct_answer === submittedNumber) {
        fn(true)
      } else {
        fn(false)
      }
    })
  })

  socket.on('answerStop', function (_id) {
    debugSocket('answerStop _id is ' + _id)
    socket.broadcast.to('guest').emit('answerStop')
  })

  socket.on('userRegist', function (userName, fn) {
    debugSocket('userName is ', userName)

    const _id = new mongoose.Types.ObjectId()
    users._id = _id
    users.name = userName
    users.save(function (err) {
      fn(_id)
    })
  })
})
