var Population = require('./population');

var Simulate = function(num, pop) {
  var start_chrom_vals;
  var end_chrom_vals;

  for (let i = 0; i < num; i++) {
    let probs = pop.probs;
    let fitness = pop.fitness;
    let chrom_vals = pop.chrom_vals;

    if (i === 0) {
      let sum = chrom_vals.reduce(function(acc, cur) {
        return acc + cur;
      }, 0);
      start_chrom_vals = Math.floor(sum/pop.size);
    }

    if (i === (num-1)) {
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

  document.write("ENVIRONMENT score: " + pop.env);
  document.write(". STARTING chromosome score: " + start_chrom_vals);
  document.write(". ENDING chromosome score: " + end_chrom_vals);
  document.write(". number of generations: " + num);

  return pop;
}

module.exports = Simulate;
