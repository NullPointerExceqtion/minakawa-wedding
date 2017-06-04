var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var session = require("express-session");
var csurf = require("csurf");
var flash = require("connect-flash");
var mongoose = require("mongoose");
//var cookieParser = require('cookie-parser');
var Post = require("./models/Post");

var app = express();

// serverインスタンスを作成する
var server = app.listen(process.env.PORT || 3030, function(){
    var host = server.address().address;
    var port = server.address().port;
});

// データベースを接続
mongoose.connect("mongodb://localhost/blog");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// socket.ioのインスタンスを作成する
io = require("socket.io")(server);

function openChannel(io, channel){
    if (io.nsps["/" + channel]){
        // 名前空間はすでに作成済み
        return;
    }

    // クイズチャンネルを作成する
    var quizChannel = io.of("/" + channel);

    // ハンドラー登録
    quizChannel.on("connection", function(socket){
        socket.on("quizPublished", function(quiz){
            quizChannel.emit("quizPublished", quiz);
        });

        socket.on("answerSubmitted", function(answer){
            quizChannel.emit("answerSubmitted", answer);
        });

        socket.on("correctAnswerGiven", function(answer){
            quizChannel.emit("correctAnswerGiven", answer);
        });
    });
}

// 出題者向けページ
app.get("/", function(req, res, next){
    if (req.query.channel){
        openChannel(io, req.query.channel);
        res.render("host", {channel: req.query.channel});
        return;
    }
    res.render("host", {channel: null});
    return;
});

// 回答者向けページ
app.get("/:channel", function(req, res, next){
    res.render("guest", {
        channel: req.params.channel,
        name: "名前の入力 | SampleApp"
    });
    return;
});

app.post("/regist", function(req, res, next) {
  var post = new Post();
  post.name = req.body.title;
  post.save(function(err){
    // エラーがあれば、メッセージを残して追加画面に
    if( err ){
      req.flash("errors", err.errors);
      res.redirect("/");

    // エラーが無ければ一覧に
    }else{
      res.redirect("/");
    }
  });
});

module.exports = app;