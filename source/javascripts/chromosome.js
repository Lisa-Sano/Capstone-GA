module.exports = function() {
  d3.select(".chromosomes")
      .attr("width", 200)
      .attr("height", 180);

  var x_data = [0,20,40,60,80,100,120,140,160,180];
  var height = 20;
  var width = 20;
    
  var text = d3.select(".chromosomes").selectAll(".parent-text").data([x_data]);

  text.enter().append("text")
    .attr("class", "parent-text")
    .attr("x", "75")
    .attr("y", "30")
    .text("Parents:")
    .attr("font-size", "15");

  var chromosomes = d3.select(".chromosomes").selectAll(".parent1").data([x_data]);

  chromosomes.enter().append("g")
      .attr("class", "parent1");

  var bps = d3.select(".parent1").selectAll(".bps").data(x_data);

  bps.enter().append("rect")
    .attr("class", "bps")
    .attr("y", "40")
    .attr("height", height)
    .attr("width", width)
    .attr("fill", "#0099cc")
    .attr("stroke", "black")
  .merge(bps)
    .attr("x", function(d) { return d });

  var chromosomes = d3.select(".chromosomes").selectAll(".parent2").data([x_data]);

  chromosomes.enter().append("g")
      .attr("class", "parent2");

  bps = d3.select(".parent2").selectAll(".bps").data(x_data);

  bps.enter().append("rect")
    .attr("class", "bps")
    .attr("y", "70")
    .attr("height", height)
    .attr("width", height)
    .attr("fill", "#990099")
    .attr("stroke", "black")
  .merge(bps)
    .attr("x", function(d) { return d });


  text = d3.select(".chromosomes").selectAll(".combined-text").data([x_data]);

  text.enter().append("text")
    .attr("class", "combined-text")
    .attr("x", "80")
    .attr("y", "125")
    .text("Child:")
    .attr("font-size", "15");

  var chromosomes = d3.select(".chromosomes").selectAll(".combined").data([x_data]);

  chromosomes.enter().append("g")
    .attr("class", "combined");

  bps = d3.select(".combined").selectAll(".bps").data(x_data);

  bps.enter().append("rect")
    .attr("class", "bps")
    .attr("y", "135")
    .attr("height", height)
    .attr("width", height)
    .attr("stroke", "black")
  .merge(bps)
    .attr("x", function(d) { return d })
    .attr("fill", function(d) {
      if (d < 70) {
        return "#0099cc";
      } else {
        return "#990099";
      }
    });

  d3.select(".mutated-chrom")
    .attr("width", 200)
    .attr("height", 50);

  var mutated = d3.select(".mutated-chrom").selectAll(".mutated").data([x_data]);

  mutated.enter().append("g")
    .attr("class", "mutated");

  bps = d3.select(".mutated").selectAll(".bps").data(x_data);

  bps.enter().append("rect")
    .attr("class", "bps")
    .attr("y", "20")
    .attr("height", height)
    .attr("width", height)
    .attr("stroke", "black")
  .merge(bps)
    .attr("x", function(d) { return d })
    .attr("fill", function(d) {
      if (d < 70) {
        return "#0099cc";
      } else if (d === 160) {
        return "#ff9966";
      } else {
        return "#990099";
      }
    });
}
