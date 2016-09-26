var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'mainController',
      resolve: {
        postPromise: ['postsFactory', function(postsFactory) {
          return postsFactory.getAll();
        }]
      }
    })

    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'postsController',
      resolve: {
        post: ['$stateParams', 'postsFactory', function($stateParams, postsFactory) {
          return postsFactory.get($stateParams.id);
        }]
      }
    })

    $urlRouterProvider.otherwise('home');

}]);
