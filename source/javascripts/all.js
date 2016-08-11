var Population = require('./population');
var Simulate = require('./simulate');
var frequency = require('./frequency');
var Chart = require('./barChart');
var Graphic = require('./main');


$(document).ready(function() {
  var chart = new Chart();
  var pop = new Population();
  var starting = frequency(pop.chrom_vals);
  var graphic = new Graphic();
  var environ = (Math.round(pop.env/12.75)*5);

  chart.initChart(starting, environ);

  graphic.drawGraphic(pop.chrom_vals, pop.env);

  $("#start").click(function() {
    var num_gens = 200;
    var counter = 0;
    var ending;

    for (let i = 0; i < num_gens; i += 1) {
      
      // the most changes will occur at generations < 15, so update
      // chart every generation until 15, then every 5 until 30, then
      // every 10 until the end
      if (i < 15) {
        var n = 1;
      } else if (i < 30) {
        var n = 5;
        i += 4;
      } else if (i < 100) {
        var n = 10;
        i += 9;
      } else {
        var n = 20;
        i += 19;
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

  $("#reset").click(function() {
    console.log("RESET!!!!!");
    pop = new Population();
    starting = frequency(pop.chrom_vals);

    $(".gchart").remove();
    chart.initChart(starting, (Math.round(pop.env/12.75)*5));

    $(".env").remove();
    graphic.drawGraphic(pop.chrom_vals, pop.env);

    $(".gen").html("1")
  });
});
