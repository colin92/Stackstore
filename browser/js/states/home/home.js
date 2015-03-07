'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/states/home/home.html'

    });

});

app.controller('HomeCtrl', function($scope, ProductFactory) {
    ProductFactory.getCategories().then(
        function(categories) {
            console.log("categories got in appjs", categories);
            $scope.categories = categories;
        }
    );

    $scope.slides = [{
        title: "img1",
        source: "http://www.carolkipling.com/wp-content/uploads/2014/03/47-march-4-cy-twombly-painting.jpg"
    }, {
        title: "img2",
        source: "https://blackpaint.files.wordpress.com/2011/08/dscn59621.jpg"
    }, {
        title: "img3",
        source: "http://2.bp.blogspot.com/-eSIf06zWnBs/UI6u0ar40hI/AAAAAAAASPg/SHPHvmLbY7g/s1600/Joseph+Mallord+William+Turner+-+The+Slave+Ship.jpg"
    }];

    $scope.myInterval = 4000;


    // $scope.selectProducts = function(category) {
    //     ProductFactory.getProducts(category).then(function(products) {
    //         $scope.products = products;
    //     });
    // };

    // // To be included in home state once states are built
    // $scope.selectProducts();
});