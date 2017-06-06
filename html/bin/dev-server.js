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
const Post = require('../models/Post')

// socket.ioを使用するためlistenするのはhttp側に変更
// server.listen(project.server_port)
http.listen(project.server_port)
debug(`Server is now running at http://localhost:${project.server_port}.`)

// データベースを接続
mongoose.connect('mongodb://localhost/blog')

io.on('connection', function(socket) {
  debugSocket('connection')

  socket.on('quizListGiven', function(fn) {
    debugSocket('quizListGiven')

    // 全問題の出力
    fn([
      {
        title: 'クイズタイトル1'
      },
      {
        title: 'クイズタイトル2'
      }
    ])
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
