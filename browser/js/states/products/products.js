'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductsCtrl',
        templateUrl: 'js/states/products/products.html'
        
    });

	$stateProvider.state('products.all', {
		url: '/',
    	controller: 'AllProductsCtrl',
    	template: '<products></products>',
        resolve: {

        }
    });    

    $stateProvider.state('products.category', {
    	url: '/category/:categoryName',
    	controller: 'CategoryCtrl',
    	template: '<products items="products"></products>'
    });

});

