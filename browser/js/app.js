'use strict';
// var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt']);

var app = angular.module("StoreApp", ['ui.bootstrap', 'ui.router', 'fsaPreBuilt']);

// app.controller('CarouselCtrl', function ($scope) {
//     $scope.myInterval = 5000;
//     var slides = $scope.slides = [];
//     $scope.addSlide = function() {
//         var newWidth = 600 + slides.length + 1;
//         slides.push({
//             image: 'http://placekitten.com/' + newWidth + '/300',
//             text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
//             ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
//         });
//     };

//     for (var i=0; i<3; i++) {
//         $scope.addSlide();
//     }
// });

app.controller('MainCtrl', function ($scope) {
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

    $scope.carousel = [{
        title: "img1", source: "http://placehold.it/800x300"
    }, {
        title: "img2", source: "http://placehold.it/800x300"
    }, {
        title: "img3", source: "http://placehold.it/800x300"
    }];

    $scope.products = [{
        title: "Product number 1", 
        description: "This is the first product", 
        category: "Category 1", 
        price: 24.99,
        source: "http://placehold.it/320x150"
    }, {
        title: "Product number 2", 
        description: "This is the second product", 
        category: "Category 2", 
        price: 14.99,
        source: "http://placehold.it/320x150"
    }, {
        title: "Product number 3", 
        description: "This is the second product", 
        category: "Category 3", 
        price: 34.99,
        source: "http://placehold.it/320x150"
    }];
});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});