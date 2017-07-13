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
mongoose.Promise = global.Promise
if (project.env === 'development') {
  mongoose.connect('mongodb://localhost/quiz')
} else {
  mongoose.connect('mongodb://heroku_7m70fbv9:10cb4sngheuhclogorf9g4snbb@ds141082.mlab.com:41082/heroku_7m70fbv9')
}

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
            body: docs[i].body,
            type: docs[i].type,
            image_path1: docs[i].image_path1,
            image_path2: docs[i].image_path2,
            image_path3: docs[i].image_path3,
            answer1: docs[i].answer1,
            answer2: docs[i].answer2,
            answer3: docs[i].answer3,
            answer4: docs[i].answer4,
            description: docs[i].description,
          })
        }
      }
      fn(quizlist)
    })
  })

  socket.on('quizPublished', function (_id) {
    debugSocket('quizPublished: ' + _id)

    Questions.find({ '_id': _id }, function (err, docs) {
      let answerlist = {}
      if (docs) {
        answerlist = docs[0]
      }
      socket.broadcast.to('guest').emit('quizPublished', answerlist, _id)
    })
  })

  socket.on('answerSubmitted', function (submittedNumber, quizId, userId, fn) {
    debugSocket('submittedNumber: ' + submittedNumber)
    debugSocket('submittedquizId: ' + quizId)
    debugSocket('userId: ' + userId)

    //対象問題の検索
    Questions.find({'_id': quizId }, function (err, docs) {
      let quizinfo

      if (docs) {
        quizinfo = docs[0]
        //正解なら対象ユーザーの正解数をカウントアップ
        if (quizinfo.correct_answer == submittedNumber) {
          Users.find({'_id': userId}, function (err, docs) {
            let userinfo
            
            if (docs) {
              userinfo = docs[0]
              Users.update({ '_id': userId },
              { $set: { correct_answer_count: userinfo.correct_answer_count+1 } },
              function (err) {
                if (err) {
                  console.log('update_fald')
                }
              })
            }
          })
          fn(true)
        } else {
          fn(false)
        }
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

  socket.on('resultAnnouncement', function (fn) {
    debugSocket('resultAnnouncement')

    // 各ユーザーの正解数
    Users.find({}, {sort:{correct_answer_count: -1}}, function(err, docs) {
      let resultlist = []
      for (let i = 0, size = docs.length; i < size; ++i) {
        if (docs[i]) {
          resultlist.push({
            _id: docs[i]._id,
            name: docs[i].name,
            correct_answer_count: docs[i].correct_answer_count
          })
        }
      }
      console.log(resultlist)
      fn(resultlist)
    })
  })
})
