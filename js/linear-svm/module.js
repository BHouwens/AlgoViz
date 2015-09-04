var LinearSVM = angular.module('LinearSVM', []);

LinearSVM.controller('MainCtrl', ['$scope', 'Plot', 'SupportVectors', function($scope, Plot, SupportVectors){
	$scope.dataEntries = 6;
	$scope.supportVectors = [];

	function getRand(min, max){
		return Math.round(Math.random() * (max - min) + min);
	}

	/** Fill $scope.data with data **/
	$scope.genData = function(num){
		var pos = 0;

		for (var i = 0; i < num; i++){
			var entry = {}, axes = [];

			if (pos < Math.round(num / 2)){
				axes = [getRand(9, 15), getRand(2, 15)];
				entry['label'] = 'pos';
				pos++;
			}else{
				axes = [getRand(2, 7), getRand(2, 15)];
				entry['label'] = 'neg';
			}

			entry['axes'] = axes;
			$scope.data.push(entry);
		}

		console.log('Data:');
		console.log($scope.data);

		$scope.supportVectors = SupportVectors.find($scope.data);
		console.log('Support Vectors:');
		console.log($scope.supportVectors);
	}


	/** Watches **/
	$scope.$watch('dataEntries', function(newVal, oldVal, scope){
		if (newVal > oldVal){
			var num = newVal - oldVal;
			scope.genData(num);
		}else
		if (newVal < oldVal){
			var num = oldVal - newVal;
			for (var i = 0; i < num; i++){
				scope.data.splice(scope.data.length - 1, 1);
			}
		}else{
			scope.data = [];
			scope.genData(scope.dataEntries);
		}
	});
}]);
