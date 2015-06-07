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
/* Creating Angular App Controller for Items and handling some behavioral events */
angular.module('myAppCtrl', [])
	.controller('appController', ['$scope', function ($scope) {
		$scope.intro = 'Welcome to our Cart Page';
	}])
	.controller('itemController', ['$scope', '$state', '$http', function ($scope, $state, $http) {
		$scope.showConfirm = false;
		$scope.showInvalid = false;
		$scope.openItem = true;
		$scope.cartItems = [];
		$scope.noCart = true;
		$scope.purchased = false;
		$scope.total = 0;
		$scope.name = '';
		$scope.email = '';
		$scope.password = '';
		$scope.toggle = function () {
			$scope.openItem = !$scope.openItem;
		};
		$scope.findIndex = function (id, itemList) {
			for (var i in $scope[itemList]) {
				if ($scope[itemList][i].id == id)
					return i;
			}
			return -1;
		};
		$scope.calculateTotal = function () {
			$scope.total = 0;
			$.each($scope.cartItems, function (i, item) {
				$scope.total += (item.price * item.qty);
			});
		};
		$scope.close = function () {
			$scope.showConfirm = !$scope.showConfirm;
			if ($scope.purchased) {
				$scope.cartItems.length = 0;
				$scope.openItem = true;
				$scope.noCart = true;
				$scope.purchased = false;
				$.each($scope.items, function (i, item) {
					item.inCart = false;
					item.qty = 1;
				});
			}
		};
		$scope.incItemQty = function (itemId) {
			var index = $scope.findIndex(itemId, 'cartItems');
			$scope.cartItems[index].qty += 1;
			$scope.calculateTotal();
		};
		$scope.decItemQty = function (itemId) {
			var index = $scope.findIndex(itemId, 'cartItems');
			if ($scope.cartItems[index].qty > 1) {
				$scope.cartItems[index].qty -= 1;
			}
			$scope.calculateTotal();
		};
		$scope.addToCart = function (itemId) {
			var index = $scope.findIndex(itemId, 'cartItems');
			if (index == -1) {
				index = $scope.findIndex(itemId, 'items');
				$scope.items[index].inCart = true;
				$scope.cartItems.push($scope.items[index]);
				$scope.noCart = false;
			} else {
				$scope.cartItems[index].qty += 1;
			}
			$scope.calculateTotal();
		};
		$scope.removeFromCart = function (itemId) {
			var index = $scope.findIndex(itemId, 'items');
			$scope.items[index].inCart = false;
			$scope.items[index].qty = 1;
			index = $scope.findIndex(itemId, 'cartItems');
			$scope.cartItems.splice(index, 1);
			if ($scope.cartItems.length == 0) {
				$scope.noCart = true;
				$scope.openItem = true;
			}
			$scope.calculateTotal();
		};
		$scope.checkout = function () {
			$scope.showConfirm = true;
		};
		$scope.showMatchResult = function () {
			$scope.showInvalid = false;
			$scope.purchased = true;
		};
		$scope.showNoMatchResult = function () {
			$scope.showInvalid = true;
		};
		$scope.submit = function () {
			$http.get('../data/users.json').
				success(function (data, status, headers, config) {
					var found = -1;
					$.each(data.users, function (i, user) {
						if (user.email === $scope.email && user.password === $scope.password) {
							found = i;
							$scope.name = user.name;
						}
					});
					if (found != -1) {
						$scope.showMatchResult();
					} else {
						$scope.showNoMatchResult();
					}
				}).
				error(function (data, status, headers, config) {
					// log error
				});
		};
		$http.get('../data/items.json').
			success(function (data, status, headers, config) {
				$scope.items = data.items;
			}).
			error(function (data, status, headers, config) {
				// log error
			});
		console.log($state.current);
	}])
	.controller('view1Controller', ['$scope', function ($scope) {
		$scope.title = 'View 1 Section';
	}])
	.controller('view2Controller', ['$scope', function ($scope) {
		$scope.title = 'Brand New View 2 Section';
	}]);