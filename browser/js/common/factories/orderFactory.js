'use strict';

app.factory('OrderFactory', function($http){
	return {
		getOrders: function(sessionId) {
			// console.log('/api/orders/' + sessionId);
			return $http.get('/api/orders/' + sessionId).then(function(orders){
				// console.log(orders.data);
				console.log(orders);
				return orders.data;
			});
		}
	};
});