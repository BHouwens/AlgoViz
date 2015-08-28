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

	this.Posterior = function(weather, choice, yes, no){
		var numerator = (this.OfXGivenC(weather, choice)) * (this.OfC(choice, yes, no)),
			denom = this.OfX(weather, yes, no);

		return numerator / denom;
	}
});