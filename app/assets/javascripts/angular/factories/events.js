angular.module('myApp')
	.factory('events', ['$resource',function($resource) {
	 	return $resource('/events', {},{
	 		query: { method: 'GET', isArray: true },
	 		create: { method: 'POST' }
	 	})
	}])

	.factory('Event', ['$resource',function($resource) {
  		return $resource("/events/:id", { id: "@id" }, {
      		show:    { method: 'GET', isArray: false },
      		update:  { method: 'PUT' },
      		destroy: { method: 'DELETE' }
    	})
	}])

	.factory('booking',['$resource', function($resource) {
		return $resource('/bookings', {},{
			book: { method: 'POST'}
		})

	}])

	.factory('playlists',['$resource', function($resource) {
		return $resource("/events/:id/playlists", {id: "@id"},{
			query: {method: 'GET', isArray: true}
		})
	}]);