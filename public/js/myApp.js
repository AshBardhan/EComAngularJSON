var app = angular.module('myApp', ['myAppCtrl', 'ui.router']);

app.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			name: 'home',
			templateUrl: 'partial/home',
			controller: 'itemController'
		})
		.state('view1', {
			url: '/view1',
			name: 'view1',
			templateUrl: 'partial/view1',
			controller: 'view1Controller'
		})
		.state('view2', {
			url: '/view2',
			name: 'view2',
			templateUrl: 'partial/view2',
			controller: 'view2Controller'
		});
}]);