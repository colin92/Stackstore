'use strict';

app.factory('ProductFactory', function($http){
	return {
		getProducts: function(categoryName) {
			var categoryQuery;
			if (!categoryName) {
				categoryQuery = "";	
			} else {
				categoryQuery = "/category/" + categoryName;
			}

			return $http.get('/api/products' + categoryQuery)
						.then(function(products){
							console.log("products.data", products.data);
							return products.data;
						});
		},
		getCategories: function() {
			return $http.get('/api/categories')
					.then(function(response) {
						console.log("response.data", response.data);
						return response.data;
					});
		}
	};
});