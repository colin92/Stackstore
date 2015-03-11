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
	
	$scope.calculateTotal = function () {
		var total = 0;
		for (var i = 0; i < $scope.cartItems.length; i++) {
			total += $scope.cartItems[i].price;
		}
		$scope.totalPrice = total;
	};
	$scope.calculateTotal();
});