var Population = require('./population');
var Simulate = require('./simulate');
var frequency = require('./frequency');
var updateChart = require('./barChart');


var pop = new Population();
var num_gens = 100;

var last_pop = Simulate(num_gens, pop);

var starting = frequency(pop.chrom_vals);
var ending = frequency(last_pop.chrom_vals);

updateChart(starting, ending, (Math.round(pop.env/12.75)) * 5);
