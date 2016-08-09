function updateChart(starting_data, ending_data, environ) {
  var margin = {top: 80, right: 80, bottom: 80, left: 80},
      width = 700 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;


  var x = d3.scaleBand()
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .range([height, 0]);

  var y1 = d3.scaleLinear()
    .range([height, 0]);

  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y).ticks(10, "%");

  var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(starting_data.map(function(d) { return d.percent; }));
  y.domain([0, (d3.max(ending_data, function(d) { return d.frequency; }) + .03)]);

  var barWidth = (width - 150) / starting_data.length;

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis axisLeft")
      .attr("transform", "translate(0,0)")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  chart.append("rect")
    .attr("class", "envLine")
    .attr("filter", "url(#f1)")
    .attr("x", x(environ))
    .attr("y", "0")
    .attr("height", height)
    .attr("width", "20");

  var bar = chart.selectAll(".bar1")
      .data(starting_data)
    .enter().append("rect")
      .attr("class", "bar bar1")
      .attr("x", function(d) { return x(d.percent); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .attr("width", barWidth/2);

  var bar = chart.selectAll(".bar2")
      .data(ending_data)
    .enter().append("rect")
      .attr("class", "bar bar2")
      .attr("x", function(d) { return x(d.percent) + (barWidth/2) + 1; })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .attr("width", barWidth/2);

  bar.append("text")
      .attr("x", barWidth)
      .attr("y", function(d) { return y(d.frequency) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.frequency; });

  var colorAxis = chart.selectAll(".saturation")
      .data(starting_data)
    .enter().append("rect")
      .attr("class", function(d) { return "saturation percent" + d.percent})
      .attr("x", function(d) { return x(d.percent) - 2.5; })
      .attr("y", height)
      .attr("height", "20")
      .attr("width", "25");
}

module.exports = updateChart;