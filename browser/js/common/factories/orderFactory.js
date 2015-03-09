'use strict';

app.factory('OrderFactory', function($http, $kookies, AuthService) {
	var currentCart = $kookies.get('cart');
	return {
		getCart: function() {
			return currentCart;
		},
		addToOrder: function(sessionId, item) {
			return $http.post('api/orders/' + sessionId + '/add', {
					data: item
				})
				.success(function(data, status) {
					console.log("returned data from add to cart", data);
					alert("Item added to cart");
				});
		},
		addToCart: function(sessionId, item) {
			console.log("did we get item", item);
			if (!currentCart) {
				$kookies.set('cart', {
					items: []
				}, {
					expires: 60,
					path: '/'
				});

				currentCart.items.push(item);
				console.log(currentCart);
				alert("Item added to cart!");
			} else {
				currentCart.items.push(item);
				console.log(currentCart);
				$kookies.set('cart', currentCart);
				alert("Item added to cart!");
			}

			if (AuthService.isAuthenticated()) {
				OrderFactory.addToOrder(sessionId, item);
			}
		},
		removeFromCart: function(sessionId, item) {
				console.log("did we get item", item);
				var i;
				currentCart.items.some(function(entry, index) {
					if (entry._id === item._id) {
						i = index;
						return i;
					}
				});
				console.log("index of selected item object", i);

				var deleted = currentCart.items.splice(i, 1);
				console.log("deleted item is: ", deleted);
				console.log("was currentCart updated?", currentCart.items);

				$kookies.set('cart', currentCart);
				alert("Item '" + deleted[0].title + "' was deleted from your cart!");
			}
			// 	getOrders: function(sessionId) {
			// 	// console.log('/api/orders/' + sessionId);
			// 	return $http.get('/api/orders/' + sessionId).then(function(orders){
			// 		// console.log(orders.data);
			// 		console.log(orders);
			// 		return orders.data;
			// 	});
			// }
	};
});