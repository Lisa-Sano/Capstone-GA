var Population = require('population');

var pop = new Population();

var num_gens = 100;
var env = pop.env;
var start_chrom_vals;
var end_chrom_vals;

for (let i = 0; i < num_gens; i++) {
  let probs = pop.probs;
  let fitness = pop.fitness;
  let chrom_vals = [];
  pop.population.forEach(function(m) {
    chrom_vals.push(parseInt(m.chromosome, 2));
  })

  if (i === 0) {
    start_chrom_vals = chrom_vals.reduce(function(acc, cur) {
      return acc + cur;
    }, 0);
  }

  if (i === (num_gens-1)) {
    end_chrom_vals = chrom_vals.reduce(function(acc, cur) {
      return acc + cur;
    }, 0);
  }

  var new_pop = [];
  for (let i = 0; i < pop.size; i++) {
    new_pop.push(pop.mate());
  }

  var pop_hash = {};
  pop_hash["population"] = new_pop;

  pop = new Population(pop_hash);
}

// console.log("");
// console.log("ENVIRONMENT score: #{env}");
// console.log("STARTING chromosome score: #{start_chrom_vals}");
// console.log("ENDING chromosome score: #{end_chrom_vals}");
// console.log("number of generations: #{num_gens}");
