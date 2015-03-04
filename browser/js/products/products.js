'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductsCtrl',
        templateUrl: 'js/products/products.html'
        
    });

	$stateProvider.state('products.all', {
		url: '/',
    	controller: 'AllProductsCtrl',
    	template: '<products items="products"></products>'
    });    

    $stateProvider.state('products.category', {
    	url: '/category/:categoryName',
    	controller: 'CategoryCtrl',
    	template: '<products items="products"></products>'
    });


});

app.controller('ProductsCtrl', function ($scope, $stateParams, $state, ProductFactory) {
	// var selected = $stateParams.categoryId

	 ProductFactory.getCategories().then(
        function (categories) {
            console.log("categories got in appjs", categories);
            $scope.categories = categories;
        }
    );

});

app.controller('AllProductsCtrl', function ($scope, ProductFactory) {

	ProductFactory.getProducts().then(function (products) {
		console.log("we get back products", products);
		$scope.products = products;
	});

});

app.controller('CategoryCtrl', function ($scope, $stateParams, $state, ProductFactory) {
	var selected = $stateParams.categoryName;
	// loop through $scope.categories, search by "selected category name", find the categoryId that matches it
	// assign it to var selectedId;

	ProductFactory.getProducts(selected).then(function (products) {
		console.log("we get back products", products);
		$scope.products = products;
	});
	// $scope.showIndividualCategory = ;
	
});