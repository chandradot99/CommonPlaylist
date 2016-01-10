angular.module('myApp', ['ngAnimate','ui.router','templates','ngResource','angularFileUpload','Devise','ngAudio'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    	$stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'HomeCtrl'

        })
        .state('newEvent', {
            url: '/create',
            templateUrl: 'create.html',
            controller: 'CreateEventsCtrl'

        })
        .state('updateEvent', {
            url: '/update/:id',
            templateUrl: 'update.html',
            controller: 'UpdateEventsCtrl'

        })
        .state('showEvent', {
            url: '/show/:id',
            templateUrl: 'show.html',
            controller: 'ShowEventsCtrl'

        })
        .state('login', {
            url: '/login',
            templateUrl: '_login.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'Auth', function($state, Auth) {
                Auth.currentUser().then(function (){
                    $state.go('home');
                })
            }]
        })
        .state('register', {
            url: '/register',
            templateUrl: '_register.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'Auth', function($state, Auth) {
                Auth.currentUser().then(function (){
                    $state.go('home');
                })
            }]  
        });

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);


	});
