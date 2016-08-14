var Population = require('./population');
var Simulate = require('./simulate');
var frequency = require('./frequency');
var Chart = require('./barChart');
var Graphic = require('./main');


$(document).ready(function() {
  var pop = getPopulation();
  var starting = frequency(pop.chrom_vals);
  var graphic = new Graphic();
  var environ = (Math.round(pop.env/12.75)*5);
  var chart = new Chart();



  chart.initChart(starting, environ);

  graphic.drawGraphic(pop.chrom_vals, pop.env);

  $("#start").click(function() {
    var num_gens = 500;
    var counter = 0;
    var ending;
    var n;

    for (let i = 0; i < num_gens; i += 1) {
      
      // many changes will happen early, so start the simulation slow
      // then speed up as it gets to higher generations
      if (i < 10) {
        n = 1;
      } else if (i < 30) {
        n = 5;
        i += 4;
      } else if (i < 100) {
        n = 10;
        i += 9;
      } else if (i < 200) {
        n = 20;
        i += 19;
      } else {
        n = 50;
        i += 49;
      }

      // update chart every 250ms
      setTimeout(function() {
        pop = Simulate(n, pop);
        ending = frequency(pop.chrom_vals);
        chart.updateChart(starting, ending);
        graphic.drawGraphic(pop.chrom_vals);
        $(".gen").html(i+1);
        console.log("number: " + i)},
        (counter * 250));

      counter++;
    }
  });

  $("#reset, .radio").click(function() {
    console.log("RESET!!!!!");

    pop = getPopulation();
    starting = frequency(pop.chrom_vals);

    $(".gchart").remove();
    chart.initChart(starting, (Math.round(pop.env/12.75)*5));

    $(".env").remove();
    graphic.drawGraphic(pop.chrom_vals, pop.env);

    $(".gen").html("1")
  });
});

function getPopulation() {
  var uniform;
  var properties = {};

  if ($('input[id=uniform]:checked').length > 0) {
    uniform = true;
    properties.env = 235;
  } else {
    uniform = false;
  }

  return new Population(properties, uniform);
}
