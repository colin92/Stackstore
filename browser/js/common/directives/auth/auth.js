'use strict';

app.controller('AuthCtrl', function($scope, $modal, $log) {



  $scope.open = function(auth) {

    var modalInstance = $modal.open({
      templateUrl: '/js/common/directives/auth/auth.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        auth: function() {
          return auth;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function($scope, $modalInstance, auth, AuthService) {

  var isLogin = function() {
    return auth === "login";
  };

  $scope.isLogin = isLogin;

  $scope.auth = auth;

  $scope.user = {};

  $scope.fbSubmit = function() {
    AuthService.fblogin($scope.user).then(function(user) {
      $modalInstance.close("Success!");
    }).catch(function(error) {
      $scope.error = {
        type: 'danger',
        msg: error.data.error
      };
    })
  }

  $scope.submit = function() {
    if (isLogin()) {
      AuthService.login($scope.user).then(function(user) {
        $modalInstance.close("Success!");
      }).catch(function(error) {
        $scope.error = {
          type: 'danger',
          msg: error.data.error
        };
      });
    } else {
      AuthService.signup($scope.user).then(function() {
        $modalInstance.close("Success!");
      }).catch(function(error) {
        $scope.error = {
          type: 'danger',
          msg: error.data.error
        };
      })
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});