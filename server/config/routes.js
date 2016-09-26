var PostsController = require('../controllers/posts.js');
var CommentsController = require('../controllers/comments.js');
var UsersController = require('../controllers/users.js');
var jwt = require('express-jwt');
var auth = jwt({secret: 'secret', userProperty: 'payload'});

module.exports = function(app) {

  //Posts//
  app.get('/posts', PostsController.showPosts);
  app.post('/posts', auth, PostsController.createPosts);
  app.param('post', PostsController.setPostParam);
  app.get('/posts/:post', PostsController.showOnePost);
  app.put('/posts/:post/upvote', auth, PostsController.upvotePost);

  //Comments
  app.post('/posts/:post/comments', auth, CommentsController.createComments);
  app.param('comment', CommentsController.setCommentParam);
  app.put('/posts/:post/comments/:comment/upvote', auth, CommentsController.upvoteComment);

  //Users
  app.post('/register', UsersController.registerUser);
  app.post('/login', UsersController.loginUser);
}
