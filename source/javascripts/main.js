var Graphic = function() {
  this.drawGraphic = function(pop_data, environ) {
    var margin = {top: 40, right: 40, bottom: 40, left: 40},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var sat = 255-environ;
    var rgb = "rgb(" + sat + "," + sat + "," + sat + ")";


    d3.select(".main-graphic")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
      
    var mainGraphic = d3.select(".main-graphic").selectAll(".env").data([pop_data]);

    mainGraphic.enter().append("g")
        .attr("class", "env")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var mainSquare = d3.select(".env").selectAll(".env-container")
      .data([pop_data]);

    mainSquare.enter().append("rect")
      .attr("class", "env-container")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", height + 5)
      .attr("width", width + 5)
      .attr("fill", rgb);


    var moths = d3.select(".env").selectAll(".moth")
        .data(pop_data);

      moths.enter().append("circle")
        .attr("class", "moth")
        .attr("r", "4")
        .attr("stroke", "#33ff33")
        .attr("stroke-width", "0.15")
      .merge(moths)
        .attr("cx", function() { return Math.random() * (width - 5) + 5 } )
        .attr("cy", function() { return Math.random() * (height - 5) + 5 } )
        .attr("fill", function(d) { return "rgb(" + (255-d) + "," + (255-d) + "," + (255-d) + ")"; });

  }
}

module.exports = Graphic;