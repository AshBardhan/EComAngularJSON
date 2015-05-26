/* Creating Angular App Controller for Items and handling some behavioral events */
var app = angular.module('myApp', []);
app.controller('itemController', ['$scope', '$http', function ($scope, $http) {
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
	}
	$scope.findIndex = function (id, itemList) {
		for (var i in $scope[itemList]) {
			if ($scope[itemList][i].id == id)
				return i;
		}
		return -1;
	}
	$scope.calculateTotal = function () {
		$scope.total = 0;
		$.each($scope.cartItems, function (i, item) {
			$scope.total += (item.price * item.qty);
		});
	}
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
	}
	$scope.incItemQty = function (itemId) {
		var index = $scope.findIndex(itemId, 'cartItems');
		$scope.cartItems[index].qty += 1;
		$scope.calculateTotal();
	}
	$scope.decItemQty = function (itemId) {
		var index = $scope.findIndex(itemId, 'cartItems');
		if ($scope.cartItems[index].qty > 1) {
			$scope.cartItems[index].qty -= 1;
		}
		$scope.calculateTotal();
	}
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
	}
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
	}
	$scope.checkout = function () {
		$scope.showConfirm = true;
	}
	$scope.showMatchResult = function () {
		$scope.showInvalid = false;
		$scope.purchased = true;
	}
	$scope.showNoMatchResult = function () {
		$scope.showInvalid = true;
	}
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
	}
	$http.get('../data/items.json').
		success(function (data, status, headers, config) {
			$scope.items = data.items;
		}).
		error(function (data, status, headers, config) {
			// log error
		});
}]);