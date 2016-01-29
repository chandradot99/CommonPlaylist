angular.module('myApp')
	.controller('HomeCtrl', ['$scope','events','Event','$location', function($scope,events,Event,$location) {

    $scope.events = events.query();

		$scope.deleteEvent = function (eventId) {
		    if (confirm("Are you sure you want to delete this event?")) {
		      	Event.destroy({ id: eventId }, function() {
		        $scope.events = events.query();
		        $location.path('/');
		      });
		    }
		}
	}])

    .controller('ShowEventsCtrl', ['$scope','Event','booking','playlists','$location','$stateParams', function($scope,Event,booking,playlists,$location,$stateParams) {
      
   		$scope.Event = Event.show({id: $stateParams.id});	
      $scope.register = {eventId: $stateParams.id};
      
      $scope.book = function() {
        booking.book({book: $scope.register},
          function() {
            $location.path('/');
          },
          function(error) {
            console.log(error);
          });

      };	

    }])



	.controller('CreateEventsCtrl', ['$scope','events','$location', function($scope,events,$location) {

		$scope.save = function () {
			if ($scope.eventForm.$valid) {
            $scope.date = $scope.Event.date.toString().slice(0,15);
            $scope.Time = $scope.Event.Time.toString().slice(16,24);
      			events.create({date: $scope.date,time: $scope.Time,venue: $scope.Event.venue}, 
      				function() {
      					$location.path('/');
    				}, 
    				function(error) {
      					console.log(error);
    				});
  			}
 		}
    	
    }])

    .controller('UpdateEventsCtrl', ['$scope','Event','$location','$stateParams', function($scope,Event,$location,$stateParams) {
   
   	  //$scope.Event = Event.get({id: $stateParams.id});
   		$scope.update = function() {
			if ($scope.eventForm.$valid){
            $scope.date = $scope.Event.date.toString().slice(0,15);
            $scope.Time = $scope.Event.Time.toString().slice(16,24);
            Event.update({date: $scope.date,time: $scope.Time,venue: $scope.Event.venue,id: $stateParams.id},
       				function(){
         				$location.path('/');
       				}, 
       				function(error) {
         				console.log(error);
      				});
     		}
   		}
	}])


    .controller('SongController', ['$scope','FileUploader','$stateParams','$state', function($scope, FileUploader,$stateParams,$state) {

        $scope.uploader = new FileUploader({url: '/events/'+$stateParams.id+'/playlists'});
        
        $state.go('showEvent');

    }])

    .controller('PlayerController',['$scope','ngAudio','playlists','$stateParams',function($scope,ngAudio,playlists,$stateParams) {
      $scope.playlists = playlists.query({id: $stateParams.id});

      $scope.playlists.$promise.then(function(playlist)
      {
        if(playlist.length != 0)
        {
          $scope.offset = playlist[0].id;     
          $scope.votes = [];
          $scope.names = [];
          $scope.flag = 0;

          
          for(var i=0;i<playlist.length;i++)
          {
            $scope.votes.push(0);
            $scope.names.push(playlist[i].name);
          }

          $scope.start = function()
          {
              console.log("hello");
              $scope.Id = $scope.votes.indexOf(Math.max.apply(Math,$scope.votes));
              $scope.Name = $scope.names[$scope.Id];
              $scope.votes[$scope.Id] = 0;
              $scope.Id = $scope.Id + $scope.offset;

              $scope.audio = ngAudio.play("uploads/playlist/file/"+$scope.Id+"/"+$scope.Name);

              $scope.$watch('audio.progress', function(newVal, oldVal) {
                  
                  if(newVal == 1)
                  {
                    $scope.start();
                  }

              });

          }

          $scope.vote = function(i,name)
          {
            $scope.votes[i-$scope.offset]++;
          }
        }


      })
    }]);






