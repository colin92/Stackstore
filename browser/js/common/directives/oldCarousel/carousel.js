'use strict';
app.directive('oldCarousel', function () {
    return {
        restrict: 'E',
        scope: {
          items: '='
        },
        templateUrl: 'js/common/directives/oldCarousel/carousel.html', 
        link: function (scope, element, attrs) {
		    scope.myInterval = 5000;
		    var slides = scope.slides = [];
		    scope.addSlide = function() {
		        var newWidth = 600 + slides.length + 1;
		        slides.push({
		            image: 'http://placehold.it/' + newWidth + '/300',
		            text: ['More','Extra','Lots of'][slides.length % 3] + ' ' +
		            ['Products', 'Items', 'Things'][slides.length % 3]
		        });
		    };

		    for (var i=0; i<3; i++) {
		        scope.addSlide();
		    }     	
        }
    };
});

