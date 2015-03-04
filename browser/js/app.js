'use strict';
// var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt']);

var app = angular.module("StoreApp", ['ui.bootstrap', 'ui.router', 'fsaPreBuilt']);

app.controller('MainCtrl', function($scope) {
  // Given to the <navbar> directive to show the menu.
  $scope.menuItems = [{
    label: 'Home',
    state: 'home'
  }, {
    label: 'About',
    state: 'about'
  }, {
    label: 'Contact',
    state: 'contact'
  }];

  $scope.categories = [{
    label: "Category 1",
    state: "category1"
  }, {
    label: "Category 2",
    state: "category2"
  }, {
    label: "Category 3",
    state: "category3"
  }];

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


app.config(function($urlRouterProvider, $locationProvider) {
  // This turns off hashbang urls (/#about) and changes it to something normal (/about)
  $locationProvider.html5Mode(true);
  // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
  $urlRouterProvider.otherwise('/');
});