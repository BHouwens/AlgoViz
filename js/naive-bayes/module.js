var NaiveBayes = angular.module('NaiveBayes', []);

NaiveBayes.controller('MainCtrl', ['$scope', 'P', 'AllWeather', function($scope, P, AllWeather){
	$scope.sunny = [3, 2];
	$scope.overcast = [4, 0];
	$scope.rainy = [2, 3];

	$scope.init = function(){
		var yes = [$scope.sunny[0], $scope.overcast[0], $scope.rainy[0]],
			no = [$scope.sunny[1], $scope.overcast[1], $scope.rainy[1]];

		// Sums
		$scope.yes = yes.reduce(function(x, y){return x + y});
		$scope.no = no.reduce(function(x, y){return x + y});

		// Algorithm variables
		$scope.sunnyPOfX = P.OfX($scope.sunny, $scope.yes, $scope.no);
		$scope.sunnyPOfXGivenC = P.OfXGivenC($scope.sunny, $scope.yes);
		$scope.sunnyPOfC = P.OfC($scope.yes, $scope.yes, $scope.no);
		$scope.sunnyPosterior = P.Posterior($scope.sunnyPOfXGivenC, $scope.sunnyPOfC, $scope.sunnyPOfX);

		$scope.overcastPOfX = P.OfX($scope.overcast, $scope.yes, $scope.no);
		$scope.overcastPOfXGivenC = P.OfXGivenC($scope.overcast, $scope.yes);
		$scope.overcastPosterior = P.Posterior($scope.overcastPOfXGivenC, $scope.sunnyPOfC, $scope.overcastPOfX);


		$scope.rainyPOfX = P.OfX($scope.rainy, $scope.yes, $scope.no);
		$scope.rainyPOfXGivenC = P.OfXGivenC($scope.rainy, $scope.yes);
		$scope.rainyPosterior = P.Posterior($scope.rainyPOfXGivenC, $scope.sunnyPOfC, $scope.rainyPOfX);

		// Chart variables
		$scope.data = ['Probability', $scope.sunnyPosterior, $scope.overcastPosterior, $scope.rainyPosterior];
		$scope.chart = AllWeather.chart($scope.data, 'all-weather');
	}

	$scope.$watch('[sunny[0], overcast[0], rainy[0], sunny[1], overcast[1], rainy[1]]', function(newVal, oldVal, scope){
		if (newVal){
			scope.init();
		}
	});
}]);