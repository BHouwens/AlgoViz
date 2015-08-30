NaiveBayes.service('P', function(){
	this.OfX = function(weather, yes, no){
		return (weather[0] + weather[1]) / (yes + no);
	}

	this.OfXGivenC = function(weather, choice){
		return weather[0] / choice;
	}

	this.OfC = function(choice, yes, no){
		return choice / (yes + no);
	}

	this.Posterior = function(likelihood, priorC, priorX){
		var numerator = likelihood * priorC;
		return numerator / priorX;
	}
});

NaiveBayes.service('AllWeather', function(){
	this.chart = function(data, id){
		var chart = c3.generate({
	            bindto: '#'+id,
	            data: {
	                columns: [data],
	                types: {'Probability':'area-spline'}
	            },
	            axis: {
	            	y: {
	            		max: 1,
	            		min: 0,
	            		padding: {top: 0, bottom: 0}
	            	}
	            }
	        });
	        
	        return chart;
	}
});
