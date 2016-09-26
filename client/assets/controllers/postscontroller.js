app.controller('postsController', ['$scope', 'postsFactory', 'authFactory', 'post', function($scope, postsFactory, authFactory, post) {

  console.log('you are in the postsController');

  $scope.post = post;

  $scope.isLoggedIn = authFactory.isLoggedIn;

  $scope.addComment = function(){
    if($scope.body === '') {
      return;
    }
    postsFactory.addComment(post._id, {
      body: $scope.body,
      author: 'user',
    }).success(function(comment) {
      $scope.post.comments.push(comment);
    });
    $scope.body = '';
    console.log('the comment has been added');
  };

  $scope.incrementUpvotes = function(comment) {
    postsFactory.upvoteComment(post, comment);
    console.log('the comment has been upvoted');

  }

}]);
