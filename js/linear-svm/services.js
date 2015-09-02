LinearSVM.service('Plot', function(){
	this.LineChart = function(){
		this.chart;
		this.width;
		this.height;
	}

	this.LineChart.prototype.init = function(data, element){
		// Basic attrs
		this.chart = d3.select(element);
		this.width = document.querySelector(element).style.width || 1000;
		this.height = document.querySelector(element).style.height || 500;
		this.margins = {
				top: 20,
				right: 20,
				bottom: 20,
				left: 50
			};
			
		// Axis attrs
		this.xScale = d3.scale.linear()
						.domain([d3.min(data, function(d){return d[secondTag];}), d3.max(data, function(d){return d[secondTag];})])
						.range([this.margins.left, this.width - this.margins.right]);

		this.yScale = d3.scale.linear()
						.domain([d3.min(data, function(d){return d[firstTag];}), d3.max(data, function(d){return d[firstTag];})])
						.range([this.height - this.margins.top, this.margins.bottom]);

		this.xAxis = d3.svg.axis().scale(this.xScale);
		this.yAxis = d3.svg.axis().scale(this.yScale).orient('left');

	}

	this.LineChart.prototype.build = function(data, element){
		this.init(data, element);

		var firstKey = this.keys[1],
			secondKey = this.keys[0];

		this.lineGen = d3.svg.line()
					  .x(function(d){
					  	return this.xScale(d[firstKey]);
					  })
					  .y(function(d){
					  	return this.yScale(d[secondKey]);
					  });

		// create x-axis
		this.chart.append('g')
			.attr('transform', 'translate(0, '+ (this.height - this.margins.bottom) + ')')
			.call(this.xAxis);

		// create y-axis
		this.chart.append('g')
			.attr('transform', 'translate('+this.margins.left+', 0)')
			.call(this.yAxis);

		this.chart.append('path')
			.attr('d', this.lineGen(data))
			.attr('stroke', 'blue')
			.attr('stroke-width', '2')
			.attr('fill', 'none');
	}

	this.create = function(data, element){
		var chart = new this.LineChart();
		chart.build(data, element);
	}
});
