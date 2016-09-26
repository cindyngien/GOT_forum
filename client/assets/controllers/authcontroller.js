app.controller('authController', ['$scope', '$state', 'authFactory', function($scope, $state, authFactory) {

  $scope.user = {};

  $scope.register = function() {
    authFactory.registerUser($scope.user).error(function(error) {
      $scope.error = error;
    }).then(function() {
      $state.go('home');
    });
  };

  $scope.login = function() {
    authFactory.loginUser($scope.user).error(function(error) {
      $scope.error = error;
    }).then(function() {
      $state.go('home');
    });
  };
}]);
