app.controller('ProductsCtrl', function($scope, $stateParams, $state, ProductFactory) {
  // var selected = $stateParams.categoryId

  ProductFactory.getCategories().then(
    function(categories) {
      $scope.categories = categories;
    }
  );

});

app.controller('AllProductsCtrl', function($scope, $state, $rootScope, ProductFactory) {
  // $scope.searchFilter = function(sTerm) {
  // 	return $scope.search === sTerm.title;
  // };

  // $scope.$watch($scope.search, function() {
  // 	$scope.$digest();
  // });
  $rootScope.$on('refreshProducts', function(search) {
    $scope.search = $rootScope.search;
    $state.go($state.current, {}, {
      reload: true
    });
    console.log($scope.search, search);
  });


  ProductFactory.getProducts().then(function(products) {
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
	
});
