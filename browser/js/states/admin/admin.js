'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/states/admin/admin.html'

    });

    $stateProvider.state('admin.site', {
    	url: '/site',
    	templateUrl: 'js/states/admin/site.html',
    	controller: function($scope, $state) {
    		$scope.currentState = $state.current.url.replace('/','');
    	}
    });

    $stateProvider.state('admin.products', {
    	url: '/products',
    	templateUrl: 'js/states/admin/products.html',
		controller: function($scope, $state) {
    		$scope.currentState = $state.current.url.replace('/','');
    	}    	
    });

    $stateProvider.state('admin.orders', {
    	url: '/orders',
    	templateUrl: 'js/states/admin/orders.html',
    	controller: function($scope, $state) {
    		$scope.currentState = $state.current.url.replace('/','');
    	}
    });

    $stateProvider.state('admin.users', {
    	url: '/users',
    	templateUrl: 'js/states/admin/users.html',
    	controller: function($scope, $state) {
    		$scope.currentState = $state.current.url.replace('/','');
    	}
    });

});
