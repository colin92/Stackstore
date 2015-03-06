'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('item', {
        url: '/:item',
        controller: 'ItemCtrl',
        templateUrl: 'js/states/item/item.html'      
    });

});

app.controller('ItemCtrl', function ($scope, $state, $stateParams) {
    console.log("state params", $stateParams);
    $scope.item = _.find($scope.products, function (item) {
        return item.title === $stateParams.item;
    });
});