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
    $scope.item = _.find($scope.products, function (item) {
        return item.title === $stateParams.item;
    });
    $scope.newReview = {};
    $scope.alert = {};
    $scope.today = Date.now();
    $scope.createStars = function(review) {
      return _.range(review.stars);
    };

    $scope.createReview = function() {
      $scope.newReview.productId = $scope.item._id;
      reviewFactory.createReview($scope);
      reviewFactory.getReviews($scope.item._id).then(function(data) {
        console.log(data);
        $scope.reviews = data.body;
    });
    };

    reviewFactory.getReviews($scope.item._id).then(function(data) {
      console.log(data);
      $scope.reviews = data.data;
    });

});

