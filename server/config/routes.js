var PostsController = require('../controllers/posts.js');
var CommentsController = require('../controllers/comments.js');

module.exports = function(app) {

  //Posts//
  app.get('/posts', PostsController.showPosts);
  app.post('/posts', PostsController.createPosts);
  app.param('post', PostsController.setPostParam);
  app.get('/posts/:post', PostsController.showOnePost);
  app.put('/posts/:post/upvote', PostsController.upvotePost);

  //Comments
  app.post('/posts/:post/comments', CommentsController.createComments);
  app.param('comment', CommentsController.setCommentParam);
  app.put('/posts/:post/comments/:comment/upvote', CommentsController.upvoteComment);
}
