var NaiveBayes = angular.module('NaiveBayes', []);

NaiveBayes.controller('MainCtrl', ['$scope', 'P', function($scope, P){
	$scope.sunny = [3, 2];
	$scope.overcast = [4, 0];
	$scope.rainy = [2, 3];

	var yes = [$scope.sunny[0], $scope.overcast[0], $scope.rainy[0]],
		no = [$scope.sunny[1], $scope.overcast[1], $scope.rainy[1]];

	$scope.yes = yes.reduce(function(x, y){return x + y});
	$scope.no = no.reduce(function(x, y){return x + y});

	// Algorithm variables
	$scope.pOfX = P.OfX($scope.sunny, $scope.yes, $scope.no);
	$scope.pOfXGivenC = P.OfXGivenC($scope.sunny, $scope.yes);
	$scope.pOfC = P.OfC($scope.yes, $scope.yes, $scope.no);
	$scope.posterior = P.Posterior($scope.sunny, $scope.yes, $scope.yes, $scope.no);

	$scope.$watch('[sunny[0], yes]', function(newVal, oldVal, scope){
		if (newVal && scope.sunny[0] <= scope.yes){
			scope.pOfX = P.OfX(scope.sunny, scope.yes, scope.no);
			scope.pOfXGivenC = P.OfXGivenC(scope.sunny, scope.yes);
			scope.pOfC = P.OfC(scope.yes, scope.yes, scope.no);
			scope.posterior = P.Posterior(scope.sunny, scope.yes, scope.yes, scope.no);
		}
	});
}]);