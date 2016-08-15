var Population = require('./population');
var Simulate = require('./simulate');
var frequency = require('./frequency');
var Chart = require('./barChart');
var Graphic = require('./main');


$(document).ready(function() {
  var pop = getPopulation();
  var starting = frequency(pop.chrom_vals);
  var graphic = new Graphic();
  var chart = new Chart();
  var num_gens = 1000;

  drawD3(starting, pop);

  $("#start").click(function() {
    var counter = 0;
    var ending;
    var n = 10;

    for (let i = 0; i < num_gens; i += 10) {

      // simulate 10 gens every 250ms
      (function (n, i, counter) {
        setTimeout(function() {
          pop = Simulate(n, pop);
          drawD3(starting, pop);
          $(".gen").html(i+10);
        }, (counter * 250));
      }) (n, i, counter);


      counter++;
    }
  });

  $("#reset, .radio").click(function() {
    console.log("RESET!!!!!");

    pop = getPopulation();
    starting = frequency(pop.chrom_vals);

    $(".gchart").remove();
    $(".env").remove();

    drawD3(starting, pop);
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

  function drawD3(starting, pop) {
    chart.drawChart(starting, frequency(pop.chrom_vals), Math.round(pop.env/12.75)*5);
    graphic.drawGraphic(pop.chrom_vals, pop.env);
  }
});

