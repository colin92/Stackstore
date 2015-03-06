'use strict';

app.factory('OrderFactory', function($http, $kookies, AuthService){
	return {
		addToOrder: function (sessionId, item) {
			return $http.post('api/orders/' + sessionId + '/add', {data: item})
						.success(function (data, status) {
							console.log("returned data from add to cart", data);
							alert("Item added to cart");
						});
		},
		addToCart: function (sessionId, item) {
		    console.log("did we get item", item);
		    if (!$kookies.get('cart')) {
		      $kookies.set('cart', {
		        items: []
		      }, {
		        expires: 60,
		        path: '/'
		      }); 

		      var newKookie = $kookies.get('cart');
		      newKookie.items.push(item);
		      console.log(newKookie);
		      alert("Item added to cart!");
		    } else {
		      var newKookie = $kookies.get('cart');
		      newKookie.items.push(item);
		      console.log(newKookie);
		      $kookies.set('cart', newKookie);
		      alert("Item added to cart!");
		    }

		    if (AuthService.isAuthenticated()) {
		    	OrderFactory.addToOrder(sessionId, item);
		    }
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