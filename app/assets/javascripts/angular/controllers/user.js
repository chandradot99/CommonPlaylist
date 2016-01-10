angular.module('myApp')
	.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth){

		$scope.signedIn = Auth.isAuthenticated;
  	$scope.logout = Auth.logout;

    Auth.currentUser().then(function (user){
      $scope.user = user;
    });

    $scope.$on('devise:new-registration', function (e, user){
      $scope.user = user;
    });

    $scope.$on('devise:login', function (e, user){
      $scope.user = user;
    });

    $scope.$on('devise:logout', function (e, user){
      $scope.user = {};
    });

  }])

	.controller('AuthCtrl', ['$scope','$state','Auth',function($scope, $state, Auth){
		$scope.login = function() {
    		Auth.login($scope.user).then(function(){
      			$state.go('home');
    		});
  		};

  		$scope.register = function() {
    		Auth.register($scope.user).then(function(){
      			$state.go('home');
    		});
  		};

	}]);
