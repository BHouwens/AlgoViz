var LinearSVM = angular.module('LinearSVM', []);

LinearSVM.controller('MainCtrl', ['$scope', 'Plot', function($scope, Plot){
	$scope.data = [];
	$scope.dataEntries = 6;
	$scope.supportVectors = 3;

	function getRand(min, max){
		return Math.round(Math.random() * (max - min) + min);
	}

	/** Fill $scope.data with data **/
	$scope.genData = function(num){
		for (var i = 0; i < num; i++){
			var entry = {}, axes = [], sum = 0;

			for (var j = 0; j < 2; j++){
				axes.push(getRand(2, 15));
			}

			if (axes[0] > 8){
				entry['label'] = 'pos';
			}else{
				entry['label'] = 'neg';
			}

			entry['axes'] = axes;
			$scope.data.push(entry);
		}

		$scope.chart = Plot.create($scope.data, '#plot');
	}


	/** Watches **/
	$scope.$watch('dataEntries', function(newVal, oldVal, scope){
		if (newVal > oldVal){
			var num = newVal - oldVal;
			scope.genData(num);
		}else{
			var num = oldVal - newVal;
			for (var i = 0; i < num; i++){
				scope.data.splice(scope.data.length - 1, 1);
			}
		}
	});
}]);
