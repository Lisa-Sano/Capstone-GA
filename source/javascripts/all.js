var Population = require('./population');
var Simulate = require('./simulate');
var frequency = require('./frequency');
var Chart = require('./barChart');


var chart = new Chart();
chart.chart;

var pop = new Population();
var starting = frequency(pop.chrom_vals);
var num_gens = 100;

for (let i = 0; i < num_gens; i += 5) {
  setTimeout(function() {

    pop = Simulate(5, pop);
    var ending = frequency(pop.chrom_vals);
    chart.updateChart(starting, ending, (Math.round(pop.env/12.75)) * 5)
    console.log("number " + i)}, (i * 50));
}
