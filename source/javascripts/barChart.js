var Chart = function() {
    this.margin = {top: 50, right: 40, bottom: 50, left: 60},
    this.width = 500 - this.margin.left - this.margin.right,
    this.height = 400 - this.margin.top - this.margin.bottom,
    this.initChart = function(starting_data, environ) {     


    // INITIALIZE CHART and LEGEND 
      d3.select(".chart")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);
        
      d3.select(".legend")
        .attr("transform", "translate(" + ((this.width - this.margin.left) / 2) + ",0)");

      d3.select(".legend").selectAll("text")
        .style("font-size","0.8rem");

      // INITIALIZE TOOLTIP
      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>Frequency:</strong> <span class='tooltip-freq'>" + (d.frequency * 100).toFixed(2) + "%</span>";
        });

      // INITIALIZE GLOBAL TAG
      var svg = d3.select(".chart").selectAll(".gchart").data([starting_data]);
        
      svg.enter().append("g")
        .attr("class", "gchart")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      d3.select(".chart").call(tip);
      
      // SET ORDINAL X AXIS AND LINEAR Y AXIS RANGES
      var height = this.height;
      var width = this.width;
      var x = d3.scaleBand()
        .rangeRound([0, width])
      var y = d3.scaleLinear()
        .domain([0,1])
        .range([height, 0]);

      // REFERENCE AXES
      var xAxis = d3.axisBottom(x).ticks(0);
      var yAxis = d3.axisLeft(y).ticks(10, "%");

      // SET X DOMAIN BASED ON SATURATION VALUES
      x.domain(starting_data.map(function(d) { return d.percent; }));

      // SET BAR WIDTH BASED ON DATA SET
      var barWidth = (width - 100) / starting_data.length;
      
      // CREATE LEFT Y AXIS
      d3.select(".gchart").append("g")
          .attr("class", "y axis axisLeft")
          .attr("transform", "translate(0,0)")
          .call(yAxis)
        .append("text")
          .style("font-size","0.8rem")
          .attr("transform", "rotate(-90)")
          .attr("y", -width/8)
          .attr("x", -height/2.5)
          .style("text-anchor", "end")
          .text("Frequency");

      // CREATE X AXIS
      d3.select(".gchart").append("g")
          .attr("class", "x axis axisBottom")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .style("font-size","0.8rem")
          .attr("y", 40)
          .attr("x", (width - this.margin.left)/2)
          .style("text-anchor", "start")
          .text("Moth Color");

      // SHOW COLOR GRADIENT ON THE X AXIS
      var colorAxis = d3.select(".gchart").selectAll(".saturation").data(starting_data);

      colorAxis.enter().append("rect")
          .attr("class", function(d) { return "saturation percent" + d.percent})
          .attr("x", function(d) { return x(d.percent); })
          .attr("y", height)
          .attr("height", "20")
          .attr("width", "20");

      // SHOW ENVIRONMENT COLOR
      d3.select(".gchart").append("rect")
          .attr("class", "envLine")
          .attr("filter", "url(#f1)")
          .attr("x", x(environ))
          .attr("y", "0")
          .attr("height", height - 2)
          .attr("width", "20");

      // STARTING POPULATION DATA
      // bind data
      var bar1 = d3.select(".gchart").selectAll(".bar1").data(starting_data);

      bar1.enter().append("rect")
          .attr("class", "bar bar1")
          .attr("width", barWidth/2)
          .attr("x", function(d) { return x(d.percent) + 2; })
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
        .merge(bar1)
          .attr("y", function(d) { return y(d.frequency); })
          .attr("height", function(d) { return height - y(d.frequency); });

      var bar2 = d3.select(".gchart").selectAll(".bar2").data(starting_data);

      bar2.enter().append("rect")
          .attr("class", "bar bar2")
          .attr("width", barWidth/2)
          .attr("x", function(d) { return x(d.percent) + (barWidth/2) + 3; })
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
        .merge(bar1)
          .attr("y", function(d) { return y(d.frequency); })
          .attr("height", function(d) { return height - y(d.frequency); });
    },
    this.updateChart = function(starting_data, ending_data) {
      var svg = d3.select(".gchart");
        
      var height = this.height;
      var width = this.width;

      var x = d3.scaleBand()
        .rangeRound([0, width]);

      var y = d3.scaleLinear()
        .range([height, 0]);

      x.domain(ending_data.map(function(d) { return d.percent; }));
      // y.domain([0, (d3.max(ending_data, function(d) { return d.frequency; }) + .03)]);
      y.domain([0,1]);

      var barWidth = (width - 100) / ending_data.length;

      var t = d3.transition()
          .duration(250)
          .ease(d3.easeLinear);

      // bind data
      var bar2 = svg.selectAll(".bar2").data(ending_data);

      // enter
      bar2.enter().append("rect")
          .attr("class", "bar bar2")
          .attr("width", barWidth/2);


      // update
      bar2.merge(bar2).transition(t)
          .attr("x", function(d) { return x(d.percent) + (barWidth/2) + 3; })
          .attr("y", function(d) { return y(d.frequency); })
          .attr("height", function(d) { return height - y(d.frequency); });
    }
}

module.exports = Chart;
