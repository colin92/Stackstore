'use strict';
app.config(function($stateProvider) {

  $stateProvider
    .state('checkout', {
      url: '/checkout',
      controller: 'CheckoutCtrl',
      templateUrl: 'js/states/checkout/checkout.html'
    })
    .state('checkout.shipping', {
      url: '/shipping',
      controller: 'ShippingCtrl',
      templateUrl: 'js/states/checkout/shipping.html'
    })
    .state('checkout.billing', {
      url: '/billing',
      controller: 'BillingCtrl',
      templateUrl: 'js/states/checkout/billing.html'
    })
    .state('checkout.review', {
      url: '/review',
      controller: 'ReviewCtrl',
      templateUrl: 'js/states/checkout/review.html'
    })
    .state('checkout.confirm', {
      url: '/confirm',
      controller: 'ConfirmCtrl',
      templateUrl: 'js/states/checkout/confirm.html'
    })
});

app.controller('CheckoutCtrl', function($scope, $state, $stateParams) {
  console.log("checkout ctrl activated");
});

app.controller('ShippingCtrl', function($scope, $state, $stateParams) {
  console.log("shipping ctrl activated");
});

app.controller('BillingCtrl', function($scope, $state, $stateParams) {
  console.log("billing ctrl activated");
});

app.controller('ReviewCtrl', function($scope, $state, $stateParams) {
  console.log("review ctrl activated");
});

app.controller('ConfirmCtrl', function($scope, $state, $stateParams) {
  console.log("confirm ctrl activated");
});