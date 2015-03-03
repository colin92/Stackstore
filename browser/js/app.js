'use strict';
// var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt']);

var app = angular.module("StoreApp", ['ui.bootstrap', 'ui.router', 'fsaPreBuilt']);

app.controller('MainCtrl', function ($scope, ProductFactory) {
    // Given to the <navbar> directive to show the menu.
    $scope.menuItems = [
        { label: 'Home', state: 'home' },
        { label: 'About', state: 'about' },
        { label: 'Contact', state: 'contact' }
    ];

    $scope.categories = [{
        label: "Category 1", state: "category1" 
    }, {
        label: "Category 2", state: "category2"
    }, {
        label: "Category 3", state: "category3"
    } ];

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


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});