app.controller('ProductsCtrl', function($scope, $stateParams, $state, ProductFactory) {
  // var selected = $stateParams.categoryId

  ProductFactory.getCategories().then(
    function(categories) {
      $scope.categories = categories;
    }
  );

});

app.controller('AllProductsCtrl', function($scope, ProductFactory) {

  ProductFactory.getProducts().then(function(products) {
    $scope.products = products;
  });

});

app.controller('CategoryCtrl', function($scope, $stateParams, $state, ProductFactory) {
  var selected = $stateParams.categoryName;
  // loop through $scope.categories, search by "selected category name", find the categoryId that matches it
  // assign it to var selectedId;

  ProductFactory.getProducts(selected).then(function(products) {
    $scope.products = products;
  });
  // $scope.showIndividualCategory = ;

});