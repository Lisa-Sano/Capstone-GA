var Population = require('./population');

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
    let sum = chrom_vals.reduce(function(acc, cur) {
      return acc + cur;
    }, 0);
    start_chrom_vals = Math.floor(sum/pop.size);
  }

  if (i === (num_gens-1)) {
    let sum = chrom_vals.reduce(function(acc, cur) {
      return acc + cur;
    }, 0);
    end_chrom_vals = Math.floor(sum/pop.size);
  }

  var new_pop = [];
  for (let i = 0; i < pop.size; i++) {
    new_pop.push(pop.mate());
  }

  var pop_hash = {};
  pop_hash["population"] = new_pop;

  pop = new Population(pop_hash);
}


document.write("ENVIRONMENT score: " + env);
document.write(". STARTING chromosome score: " + start_chrom_vals);
document.write(". ENDING chromosome score: " + end_chrom_vals);
document.write(". number of generations: " + num_gens);
