'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('cart', {
		url: '/cart',
		templateUrl: 'js/states/cart/cart.html',
		controller: 'CartCtrl'
	});

});

app.controller('CartCtrl', function($scope, OrderFactory, AuthService, $kookies) {
	$scope.cart = OrderFactory.getCart();
	$scope.cartItems = $scope.cart.items;
});