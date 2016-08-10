var Chart = function() {
    this.margin = {top: 30, right: 50, bottom: 50, left: 50},
    this.width = 500 - this.margin.left - this.margin.right,
    this.height = 370 - this.margin.top - this.margin.bottom,
    this.updateChart = function(starting_data, ending_data, environ) {
      d3.select(".chart")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);
        
      d3.select(".legend")
        .attr("transform", "translate(" + ((this.width - this.margin.left) / 2) + "," + (this.height + this.margin.bottom + 10) + ")");

      var svg = d3.select(".chart").selectAll(".gchart").data([starting_data]);
        
      svg.enter().append("g")
        .attr("class", "gchart")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      var height = this.height;
      var width = this.width;

      var x = d3.scaleBand()
        .rangeRound([0, width]);

      var y = d3.scaleLinear()
        .range([height, 0]);

      var y1 = d3.scaleLinear()
        .range([height, 0]);

      var xAxis = d3.axisBottom(x);
      var yAxis = d3.axisLeft(y).ticks(10, "%");

      x.domain(starting_data.map(function(d) { return d.percent; }));
      // y.domain([0, (d3.max(ending_data, function(d) { return d.frequency; }) + .03)]);
      y.domain([0,1]);

      var barWidth = (width - 100) / starting_data.length;

      var axisL = d3.select(".gchart").selectAll(".axisLeft").data([ending_data]);
      
      axisL.enter().append("g")
          .attr("class", "y axis axisLeft")
          .attr("transform", "translate(0,0)")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");

      svg.select('g.y.axis')
        .call(yAxis);

      var envL = d3.select(".gchart").selectAll(".envLine").data([starting_data]);
        
      envL.enter().append("rect")
          .attr("class", "envLine")
          .attr("filter", "url(#f1)")
          .attr("x", x(environ))
          .attr("y", "0")
          .attr("height", height)
          .attr("width", "20");

      var bar1 = svg.selectAll(".bar1").data(starting_data);

      bar1.enter().append("rect")
          .attr("class", "bar bar1")
          .attr("width", barWidth/2)
          .attr("x", function(d) { return x(d.percent); })
        .merge(bar1)
          .attr("y", function(d) { return y(d.frequency); })
          .attr("height", function(d) { return height - y(d.frequency); });

      var bar2 = svg.selectAll(".bar2").data(ending_data);

      bar2.enter().append("rect")
          .attr("class", "bar bar2")
          .attr("width", barWidth/2)
        .merge(bar2)
          .attr("x", function(d) { return x(d.percent) + (barWidth/2) + 1; })
          .attr("y", function(d) { return y(d.frequency); })
          .attr("height", function(d) { return height - y(d.frequency); });

      var colorAxis = svg.selectAll(".saturation").data(starting_data);

      colorAxis.enter().append("rect")
          .attr("class", function(d) { return "saturation percent" + d.percent})
          .attr("x", function(d) { return x(d.percent) - 2.5; })
          .attr("y", height)
          .attr("height", "20")
          .attr("width", "19");
    }
}

module.exports = Chart;
