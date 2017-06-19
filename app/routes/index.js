var express = require('express');
var router = express.Router();
var Post = require("../models/Post");


// 記事一覧 (./views/index.ejsを表示)
router.get("/", function(req, res, next) {
  Post.find({}, function(err, posts){
    res.render("index", {
      title: "SampleApp",
      csrf: req.csrfToken(),
      posts: posts
    });
  });
});


// 記事の追加 (./views/new.ejsを表示)
router.get("/new", function(req, res, next) {
  res.render("new", {
    title: "記事の追加 | SampleApp",
    csrf: req.csrfToken(),
    errors: req.flash("errors").shift() //必ず配列が帰ってくるので、一番目の値を取得
  });
});

router.post("/create", function(req, res, next) {
  var post = new Post();
  post.title = req.body.title;
  post.contents = req.body.contents;
  post.save(function(err){
    // エラーがあれば、メッセージを残して追加画面に
    if( err ){
      req.flash("errors", err.errors);
      res.redirect("/new");

    // エラーが無ければ一覧に
    }else{
      res.redirect("/");
    }
  });
});


// 記事の編集 (./views/edit.ejsを表示)
router.get("/edit/:id", function(req, res, next){
  // 適当なIDを指定して、該当する記事が見つからない場合は処理をスキップします
  Post.findById(req.params.id, function(err, post){
    if( err ) return next();
    res.render("edit", {
      title: "記事の編集 | SampleApp",
      csrf: req.csrfToken(),
      post: post,
      errors: req.flash("errors").shift()
    });
  });
});

router.put("/update", function(req, res, next){
  Post.findById(req.body._id, function(err, post){
    if( err ) return next();
    post.title = req.body.title;
    post.contents = req.body.contents;
    post.save(function(err){
      if( err ){
        req.flash("errors", err.errors);
        res.redirect("/edit/" + req.body._id);
      }else{
        res.redirect("/");
      }
    });
  });
});


// 記事の削除
router.delete("/destroy", function(req, res, next){
  Post.findById(req.body._id, function(err, post){
    if( err ) return next();
    post.remove();
    res.redirect("/");
  });
});

module.exports = router;