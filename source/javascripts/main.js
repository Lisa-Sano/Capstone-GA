var Graphic = function() {
  this.initGraphic = function(pop_data, environ) {
    var margin = {top: 80, right: 80, bottom: 80, left: 80},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var sat = 255-environ;
    var rgb = "rgb(" + sat + "," + sat + "," + sat + ")";

    var mainGraphic = d3.select(".main-graphic")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("class", "env")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("fill", rgb);

    mainGraphic.append("rect")
      .attr("class", "env-container")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "400")
      .attr("width", "400");


    var moths = mainGraphic.selectAll(".moth")
        .data(pop_data);

    moths.enter().append("circle")
        .attr("class", "moth")
        .attr("r", "2")
      .merge(moths)
        .attr("cx", function() { return Math.random() * (395 - 5) + 5 } )
        .attr("cy", function() { return Math.random() * (395 - 5) + 5 } )
        .attr("fill", function(d) { return "rgb(" + (255-d) + "," + (255-d) + "," + (255-d) + ")"; });
  },
  this.updateGraphic = function(pop_data) {
    var mainGraphic = d3.select(".env");

    var moths = mainGraphic.selectAll(".moth")
        .data(pop_data);

    // moths.enter().append("circle")
    //     .attr("class", "moth")
    //     .attr("r", "2")
      moths.merge(moths)
        .attr("cx", function() { return Math.random() * (395 - 5) + 5 } )
        .attr("cy", function() { return Math.random() * (395 - 5) + 5 } )
        .attr("fill", function(d) { return "rgb(" + (255-d) + "," + (255-d) + "," + (255-d) + ")"; });

  }
}

module.exports = Graphic;