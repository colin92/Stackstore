'use strict';
app.config(function($stateProvider){

	$stateProvider.state('cart', {
		url: '/checkout',
		templateUrl: 'js/cart/cart.html',
		controller: 'CartCtrl'
	});

});

app.controller('CartCtrl', function($scope, OrderFactory){
	var sessionId = 'Something';
	OrderFactory.getOrders(sessionId).then(function(orders){
		$scope.orders = orders.items;
		console.log($scope.orders);
	});
});