app.factory('reviewFactory', function($http) {
  return {
    createReview: function(scope) {
      return $http.post('/api/review/create', { data: scope.newReview }).then(function(data) {
        console.log('res', data);
        scope.alert = {
          type: 'success', 
          msg: 'Review successfully added!'
        };
        scope.newReview = {};
      }, function(err) {
        if(err.status == 401) { 
          scope.alert = {
            type: 'danger', 
            msg: 'Please log in!'
          };
        } else {
          scope.alert = {
            type: 'danger', 
            msg: 'Could not submit review! Please try again.'
          };
        }
        console.log(err);
      });
    },
    getReviews: function(productId) {
      return $http.get('/api/reviews/' + productId);
    }
  };
});
