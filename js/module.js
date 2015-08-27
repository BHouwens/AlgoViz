var NaiveBayes = angular.module('NaiveBayes', []);

NaiveBayes.controller('MainCtrl', ['$scope', function($scope){
	$scope.sunny = [3, 2];
	$scope.overcast = [4, 0];
	$scope.rainy = [2, 3];

	var yes = [$scope.sunny[0], $scope.overcast[0], $scope.rainy[0]],
		no = [$scope.sunny[1], $scope.overcast[1], $scope.rainy[1]];

	$scope.yes = yes.reduce(function(x, y){return x + y});
	$scope.no = no.reduce(function(x, y){return x + y});
}]);