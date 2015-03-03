'use strict';
app.directive('category', function () {
    return {
        restrict: 'E',
        scope: {
          items: '='
        },
        templateUrl: 'js/common/directives/category/category.html'
    };
});