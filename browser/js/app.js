'use strict';

var app = angular.module("StoreApp", ['ui.bootstrap', 'ui.router', 'fsaPreBuilt', 'ngKookies']);

app.controller('MainCtrl', function($scope, ProductFactory, AuthService, Session, $kookies, OrderFactory) {

  // Given to the <navbar> directive to show the menu.
  $scope.menuItems = [{
    label: 'Home',
    state: 'home'
  }, {
    label: 'About',
    state: 'about'
  }, {
    label: 'Products',
    state: 'products.all'
  }, {
    label: 'Cart',
    state: 'cart'
  }];

  $scope.sessionId = Session.id;
  console.log($scope.sessionId);

  ProductFactory.getProducts().then(function (products) {
    $scope.products = products;
  });

  $scope.addToCart = function (sessionId, item) {

    OrderFactory.addToCart(sessionId, item);
  }
});


app.config(function($urlRouterProvider, $locationProvider) {
  // This turns off hashbang urls (/#about) and changes it to something normal (/about)
  $locationProvider.html5Mode(true);
  // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
  $urlRouterProvider.otherwise('/');
});

app.config(['$kookiesProvider', 
  function ($kookiesProvider) {
      $kookiesProvider.config.json = true;
  }
]);