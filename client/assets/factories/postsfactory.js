app.factory('postsFactory', ['$http', 'authFactory', function($http, authFactory) {

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
    return $http.post('/posts', post, {
      headers: {Authorization: 'Bearer '+authFactory.getToken()}
    }).success(function(data) {
      factory.posts.push(data);
    });
  };
  factory.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+authFactory.getToken()}
    }).success(function(data) {
      post.upvotes += 1;
    });
  };
  // ********************************************************************
  factory.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment, {
      headers: {Authorization: 'Bearer '+authFactory.getToken()}
    });

  };
  factory.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+authFactory.getToken()}
    }).success(function(data) {
      comment.upvotes += 1;
    });
  };
  return factory;
}]);
