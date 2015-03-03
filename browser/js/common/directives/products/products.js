'use strict';
app.directive('products', function () {
    return {
        restrict: 'E',
        scope: {
          items: '='
        },
        templateUrl: 'js/common/directives/products/products.html'
    };
});