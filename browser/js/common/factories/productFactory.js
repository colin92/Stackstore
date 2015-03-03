'use strict';

app.factory('ProductFactory', function($http){
	return {
		getProducts: function(categoryName) {
			var queryObject = {};
			if (categoryName) {
				queryObject = {category: categoryName};	
			}

			return $http.get('/api/products', {params: queryObject})
						.then(function(products){
							return products.data;
						});
		}
	};
});