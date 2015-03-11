'use strict';

app.factory('OrderFactory', function($http, $kookies, AuthService) {
	var currentCart = $kookies.get('cart');
	return {
		getCart: function() {
			return currentCart;
		},
		// sends existing cart in cookie to order associated with user in db
		sendToOrder: function(cart) {
			console.log("this is the function that sends cookie cart to order found in db");
			return $http.post('api/orders/send', {
				data: cart
			}).success(function(data, status) {
				console.log("this is the data that got sent back after you sent cookies", data);
				alert("Existing cart items added to an order.")
			});
		},
		// two things: if not logged in, adds item to cookies; if logged in, adds item to cart in order associated with user in db
		addToCart: function(item) {
			console.log('hello friend');
			if (!AuthService.isAuthenticated()) {
				console.log("adding item as unauthenticated user")
				if (!currentCart) {
					$kookies.set('cart', {
						items: []
					}, {
						expires: 60,
						path: '/'
					});

					currentCart = $kookies.get('cart');

					currentCart.items.push(item);
					console.log(currentCart);
					alert("Item added to cart!");
				} else {
					currentCart.items.push(item);
					console.log(currentCart);
					$kookies.set('cart', currentCart, {
						expires: 60,
						path: '/'
					});
					alert("Item added to cart!");
				}
			} else if (AuthService.isAuthenticated()) {
				console.log("adding item as an authenticated user: ", item);
				return $http.post('api/orders/add', {
						data: item
					})
					.success(function(data, status) {
						console.log("returned data from add to order", data);
						alert("Item added to cart!");
					});
			}
		},
		removeFromCart: function(item) {
			if (!AuthService.isAuthenticated()) {
				var i; // find index of item in currentCart
				currentCart.items.some(function(entry, index) {
					if (entry._id === item._id) {
						i = index;
						return i;
					}
				});

				var deleted = currentCart.items.splice(i, 1);
				console.log("deleted item is: ", deleted);
				console.log("was currentCart updated?", currentCart.items);

				$kookies.set('cart', currentCart, {
					expires: 60,
					path: '/'
				});
				alert("Item '" + deleted[0].title + "' was deleted from your cart!");
			} else if (AuthService.isAuthenticated()) {
				console.log("we will remove the item selected from the database")
			}
		},
		addShippingInfo: function(info) {
			currentCart.shipping = info;
			$kookies.set('cart', currentCart, {
				expires: 60,
				path: '/'
			});
			console.log("was currentCart updated?", currentCart);
		}
	};
});