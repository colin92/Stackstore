'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('cart', {
		url: '/cart',
		templateUrl: 'js/states/cart/cart.html',
		controller: 'CartCtrl'
	});

});

app.controller('CartCtrl', function($scope, OrderFactory, AuthService, $kookies) {
	// OrderFactory.getOrders(sessionId).then(function(orders){
	// 	$scope.orders = orders.items;
	// 	console.log($scope.orders);
	// });

	if (!AuthService.isAuthenticated()) {
		$scope.cart = OrderFactory.getCart();
		$scope.cartItems = OrderFactory.getCart().items;
	}
});