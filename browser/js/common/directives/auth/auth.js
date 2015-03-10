'use strict';

app.controller('AuthCtrl', function($scope, $modal, $log, $rootScope, $state, AUTH_EVENTS, AuthService) {
  if (AuthService.isAuthenticated()) $scope.loggedIn = true;
  else $scope.loggedIn = false;

  $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
    console.log("login success");
    console.log('Scope',$scope)
    logUserIn();
    $scope.loggedIn = true;
    $scope.$digest;
  });

  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
    console.log("logout");
    $scope.loggedIn = false;
    $scope.user = null;
  });

  $scope.updateSearch = function(search) {
    $rootScope.search = search
    console.log('broadcast:',$scope.search, search);
    $rootScope.$emit('refreshProducts', search);
  }

  $scope.logout = function() {
    AuthService.logout();
  };

  function logUserIn() {
    AuthService.getLoggedInUser().then(function(user){
      $scope.user = user.user;
    });
  }


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

  console.log("$scope.loggedIn", $scope.loggedIn);
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
      });
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});