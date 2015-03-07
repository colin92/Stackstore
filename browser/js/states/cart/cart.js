'use strict';
app.config(function($stateProvider){

	$stateProvider.state('cart', {
		url: '/checkout',
		templateUrl: 'js/states/cart/cart.html',
		controller: 'CartCtrl'
	});

});

app.controller('CartCtrl', function($scope, OrderFactory, AuthService, $kookies){
	// OrderFactory.getOrders(sessionId).then(function(orders){
	// 	$scope.orders = orders.items;
	// 	console.log($scope.orders);
	// });

	if (!AuthService.isAuthenticated()) {
	    $scope.cart = $kookies.get('cart');
	    $scope.orders = $scope.cart.items;
	}
});