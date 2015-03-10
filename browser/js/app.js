'use strict';

var app = angular.module("StoreApp", ['ui.bootstrap', 'ui.router', 'fsaPreBuilt', 'ngKookies']);

app.controller('MainCtrl', function($scope, ProductFactory, AuthService, Session, $kookies, OrderFactory, $window) {

  // Given to the <navbar> directive to show the menu.
  $scope.menuItems = [{
    label: 'Home',
    state: 'home'
      // glyphicon: 'glyphicon glyphicon-home'
  }, {
    label: 'About',
    state: 'about'
      // glyphicon: 'glyphicon glyphicon-info-sign'
  }, {
    label: 'Products',
    state: 'products.all'
      // glyphicon: 'glyphicon glyphicon-gift'
  }, {
    label: '',
    state: 'cart',
    glyphicon: 'glyphicon glyphicon-shopping-cart'
  }];

  ProductFactory.getProducts().then(function(products) {
    $scope.products = products;
  });

  console.log("here are all cookies", $kookies.get());

  $scope.addToCart = function(item) {
    OrderFactory.addToCart(item);
  };

  $scope.removeFromCart = function(item) {
    OrderFactory.removeFromCart(item);
  };

  // $scope.loginSendCookies = function() {
  //   console.log("main controller loginSendCookies called");
  //   var currentCart = OrderFactory.getCart();
  //   console.log("Throwing cookie cart items to database:", currentCart.items);
  //   OrderFactory.sendToOrder(currentCart.items);
  // };
});


app.config(function($urlRouterProvider, $locationProvider) {
  // This turns off hashbang urls (/#about) and changes it to something normal (/about)
  $locationProvider.html5Mode(true);
  // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
  $urlRouterProvider.otherwise('/');
});

app.config(['$kookiesProvider',
  function($kookiesProvider) {
    $kookiesProvider.config.json = true;
  }
]);