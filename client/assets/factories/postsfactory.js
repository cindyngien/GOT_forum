app.factory('postsFactory', ['$http', function($http) {

  console.log('you are in the postsFactory');

  var factory = {
    posts: []
  };
  factory.get = function(id) {
    return $http.get('/posts/' + id).then(function(res) {
      return res.data;
    })
  };
  factory.getAll = function() {
    return $http.get('/posts').success(function(data) {
      angular.copy(data, factory.posts);
    });
  };
  factory.create = function(post) {
    return $http.post('/posts', post).success(function(data) {
      factory.posts.push(data);
    });
  };
  factory.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote').success(function(data) {
      post.upvotes += 1;
    });
  };
  // ********************************************************************
  factory.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment);

  };
  factory.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote').success(function(data) {
      comment.upvotes += 1;
    });
  };
  return factory;
}]);
