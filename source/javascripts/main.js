var Graphic = function() {
  this.drawGraphic = function(pop_data, environ) {
    var margin = {top: 0, right: 5, bottom: 5, left: 5},
        width = 400 - margin.left - margin.right,
        height = 375 - margin.top - margin.bottom;

    var rgb = "rgb(" + environ[0] + "," + environ[1] + "," + environ[2] + ")";


    d3.select(".main-graphic")
        .attr("width", width + margin.right + margin.left)
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

      moths.enter().append("polygon")
        .attr("class", "moth")
        .attr("stroke", rgb)
      .merge(moths)
        .attr("fill", function(d) { return "rgb(" + d[0] + "," + d[1] + "," + d[2] + ")"; })
        .attr("points", function() {
            var new_x = Math.random() * ((width-10) - 10) + 10;
            var new_y = Math.random() * ((height-10) - 10) + 10;
            d3.select(this).attr("transform", function() { return "rotate(" + (Math.random() * (width - 5) + 5) + "," + new_x + "," + new_y + ")"});
            return [
              [new_x, new_y].join(','),
              [new_x+6, new_y+9].join(','),
              [new_x+0.5, new_y+9].join(','),
              [new_x, new_y+6].join(','),
              [new_x-0.5, new_y+9].join(','),
              [new_x-6, new_y+9].join(',')
            ].join(" ");
        });
  }
}

module.exports = Graphic;