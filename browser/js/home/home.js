'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
        
    });

});

app.controller('HomeCtrl', function ($scope, ProductFactory) {
    ProductFactory.getCategories().then(
        function (categories) {
            console.log("categories got in appjs", categories);
            $scope.categories = categories;
        }
    );

    $scope.slides = [{
        title: "img1", source: "http://placehold.it/800x300"
    }, {
        title: "img2", source: "http://placehold.it/800x300"
    }, {
        title: "img3", source: "http://placehold.it/800x300"
    }];

    $scope.myInterval = 4000;


	$scope.selectProducts = function(category) {
        ProductFactory.getProducts(category).then(function(products){
            $scope.products = products;
        });
    };

    // To be included in home state once states are built
    $scope.selectProducts();
});