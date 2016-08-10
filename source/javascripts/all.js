var Population = require('./population');
var Simulate = require('./simulate');
var frequency = require('./frequency');
var Chart = require('./barChart');


var chart = new Chart();

var pop = new Population();
var starting = frequency(pop.chrom_vals);
var num_gens = 100;
var counter = 0;

for (let i = 0; i < num_gens; i += 1) {
  
  if (i < 15) {
    var n = 1;
  } else if (i < 30) {
    var n = 5;
    i += 4;
  } else {
    var n = 10;
    i += 9;
  }

  setTimeout(function() {
    pop = Simulate(n, pop);
    var ending = frequency(pop.chrom_vals);
    chart.updateChart(starting, ending, (Math.round(pop.env/12.75)) * 5);
    if (i >= num_gens-1) { console.log("DONE!")}},
    (counter * 200));

  counter++;
}

