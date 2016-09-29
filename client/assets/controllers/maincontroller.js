app.controller('mainController', ['$scope', 'postsFactory', 'authFactory', function($scope, postsFactory, authFactory) {

  console.log('you are in the mainController');

  $scope.test = 'The recipe-sharing app for bread-enthusiasts';

  $scope.posts = postsFactory.posts;

  $scope.isLoggedIn = authFactory.isLoggedIn;

  $scope.addPost = function(){
    if($scope.title === '') {
      return;
    }
    postsFactory.create({
      title: $scope.title,
      link: $scope.link
    });
    $scope.title = '';
    $scope.link = '';
    console.log('the post has been added');
  };

  $scope.incrementUpvotes = function(post) {
    postsFactory.upvote(post);
    console.log('the post has been upvoted');
    // $scope.postUpvoted = true;
  };

}]);
