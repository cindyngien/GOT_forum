var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

module.exports = {

  showPosts: function(req, res, next) {

    Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
    console.log('the posts have been retrieved from the db');
   });
  },

  createPosts: function(req, res, next) {

    var post = new Post(req.body);
    post.author = req.payload.username;

    post.save(function(err, post){
      if(err){ return next(err); }

      res.json(post);
      console.log('the post has been saved in the db');
    });
  },

  setPostParam: function(req, res, next, id) {

    var query = Post.findById(id);

    query.exec(function (err, post){
      if (err) { return next(err); }
      if (!post) { return next(new Error('can\'t find post')); }

      req.post = post;
      return next();
    });
  },

  showOnePost: function(req, res, next) {
    req.post.populate('comments', function(err, post) {
      if (err) { return next(err); }

      res.json(post);
    });
  },

  upvotePost: function(req, res, next) {

    req.post.upvote(function(err, post){
      if (err) { return next(err); }

      res.json(post);
      console.log('the post has been upvoted');
    });

  }
}
