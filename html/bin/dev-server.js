const project = require('../config/project.config')
const app = require('../server/main')
const debug = require('debug')('app:bin:dev-server')
const debugSocket = require('debug')('app:socket')

const http = require('http').Server(app)
const io = require('socket.io')(http)

const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const csurf = require('csurf')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const Users = require('../models/Users')
const Questions = require('../models/Questions')

// socket.ioを使用するためlistenするのはhttp側に変更
// server.listen(project.server_port)
http.listen(project.server_port)
debug(`Server is now running at http://localhost:${project.server_port}.`)

// データベースを接続
mongoose.connect('mongodb://localhost/quiz')

io.on('connection', function (socket) {
  debugSocket('connection')

  var users = new Users();
  var questions = new Questions();
  /**
   * joinRoom
   * guestUser, hostUserはroom分けする
   * joinRoomは各react componentのcomponentDidMountのタイミングでemitしている
   * @param {string} roomName ルーム名 現状guest, hostのどちらか
   */
  socket.on('joinRoom', function (roomName) {
    debugSocket('joinRoom to ' + roomName)
    if (socket.roomName) {
      debugSocket('room change ' + socket.roomName + ' -> ' + roomName)
      socket.leave(socket.roomName)
    }

    socket.roomName = roomName
    socket.join(roomName)
  })

  socket.on('quizListGiven', function (fn) {
    debugSocket('quizListGiven')
    fn([
      // 全問題の出力
      Questions.find({}, function(err, quiz){return  quiz})
    ])
  })

  socket.on('quizPublished', function (quiz) {
    socket.broadcast.to('guest').emit('quizPublished', {
      qiiz
      /*
      title: 'クイズタイトル1',
      answer1: 'a',
      answer2: 'b',
      answer3: 'c',
      answer4: 'd'
      */
    })
  })
})

// function openChannel(io, channel){
//     if (io.nsps["/" + channel]){
//         // 名前空間はすでに作成済み
//         return;
//     }

//     // クイズチャンネルを作成する
//     var quizChannel = io.of("/" + channel);

//     // ハンドラー登録
//     quizChannel.on("connection", function(socket){
//         socket.on("quizPublished", function(quiz){
//             quizChannel.emit("quizPublished", quiz);
//         });

//         socket.on("answerSubmitted", function(answer){
//             quizChannel.emit("answerSubmitted", answer);
//         });

//         socket.on("correctAnswerGiven", function(answer){
//             quizChannel.emit("correctAnswerGiven", answer);
//         });
//     });
// }

// // 出題者向けページ
// app.get("/", function(req, res, next){
//     if (req.query.channel){
//         openChannel(io, req.query.channel);
//         res.render("host", {channel: req.query.channel});
//         return;
//     }
//     res.render("host", {channel: null});
//     return;
// });

// // 回答者向けページ
// app.get("/:channel", function(req, res, next){
//     res.render("guest", {
//         channel: req.params.channel,
//         name: "名前の入力 | SampleApp"
//     });
//     return;
// });

// app.post("/regist", function(req, res, next) {
//   var post = new Post();
//   post.name = req.body.title;
//   post.save(function(err){
//     // エラーがあれば、メッセージを残して追加画面に
//     if( err ){
//       req.flash("errors", err.errors);
//       res.redirect("/");

//     // エラーが無ければ一覧に
//     }else{
//       res.redirect("/");
//     }
//   });
// });
