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
		console.log(numerator);
		console.log(priorX);
		return numerator / priorX;
	}
});