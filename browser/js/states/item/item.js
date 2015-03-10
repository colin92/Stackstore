'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('item', {
        url: '/:item',
        controller: 'ItemCtrl',
        templateUrl: 'js/states/item/item.html'      
    });

});

app.controller('ItemCtrl', function ($scope, $state, $stateParams, reviewFactory) {
    console.log("state params", $stateParams);
    $scope.newReview = {};
    $scope.alert = {};
    $scope.today = Date.now();
    $scope.createStars = function() {
      return _.range($scope.newReview.stars);
    };

    $scope.createReview = function() {
      reviewFactory.createReview($scope.newReview).then(function(data) {
        $scope.alert = {
          type: 'success', 
          msg: 'Review successfully added!'
        };
        $scope.newReview = {};
        $scope.reviews.push(data);
      }, function(err) {
        $scope.alert = {
          type: 'danger', 
          msg: 'Could not submit review! Please try again.'
        };
        console.log(err);
      });
    };
    $scope.item = _.find($scope.products, function (item) {
        return item.title === $stateParams.item;
    });
});

// Move to reviewFactory.js
app.factory('reviewFactory', function($http) {
  return {
    createReview: function(data) {
      return $http.post('/review/create', data); 
    }
  };
});
