var Moth = require("./moth");

var Population = function(pop={}) {
  this.size = (pop.population == null ? 500 : pop.population.length),
  this.population = pop.population || generateMoths(this.size),
  this.chrom_vals = getChromVals(this.population),
  this.max_env = 255,
  this.env = pop.env || Math.floor(Math.random() * (this.max_env + 1)),
  this.fitness = evalFitness(this.population, this.max_env, this.env),
  this.probs = probabilities(this.fitness),
  this.mate = function() {
    // take a weighted sampling of two moths based on fitness scores/probabilities
    let moth1 = weightedSample(this.probs, this.population);
    let moth2 = weightedSample(this.probs, this.population);

    // pick a random index of the chromosome to crossover
    let crossover = Math.floor(Math.random() * 8);

    let first_piece = moth1.chromosome.slice(0,crossover);
    let second_piece = moth2.chromosome.slice(crossover, 8);
    let new_chrom = first_piece + second_piece;

    // mutate the newly generated chromosome
    mutateChromosome(new_chrom);

    // initialize a new moth based on the (potentially) mutated chromosome
    let new_moth = new Moth({chrom: new_chrom});
    return new_moth;
  }

  // create an array of chromosome values for the entire population
  function getChromVals(population) {
    let vals = [];
    population.forEach(function(m) {
      vals.push(m.value);
    })
    return vals;
  }

  // if population not initialized with an array of moths, generate a new population
  function generateMoths(num) {
    let pop = [];
    for (let i = 0; i < num; i++) {
      let m = new Moth();
      pop.push(m);
    }

    return pop;
  }

  // calculate the fitness (closer value of chromosome compared to environment value = higher score)
  function evalFitness(pop, max, env) {
    let f = [];
    pop.forEach(function(m) {
      f.push(max - (Math.abs(env - m.value) * 0.2));
    });

    return f;
  }

  // weighted probabilities based on fitness score
  // higher fitness scores have higher chance of being selected
  function probabilities(fitness) {
    let fit_sum = fitness.reduce(function(acc, cur) {
      return acc + cur;
    }, 0);
    let prob_sum = 0.0;
    let probs = [];
    let counter = 0;

    fitness.forEach(function(f) {
      probs[counter] = prob_sum + (f / fit_sum);
      prob_sum = probs[counter];
      counter++;
    });

    return probs;
  }

  // returns a Moth, sampled using the weighted probabilities
  function weightedSample(probs, population) {
    let r = Math.random();

    for (let i = 0; i < probs.length; i++) {
      if (r < probs[i]) {
        return population[i];
      }
    };

    return population[probs.length - 1];
  }

  // mutates 0 to 1, or 1 to 0 (goes through every index and mutates
  // if willMutate() returns true)
  function mutateChromosome(chrom) {
    let chrom_array = chrom.split('');
    let counter = 0;

    chrom_array.forEach(function(n) {
      if (willMutate()) {
        chrom_array[counter] = [1, 0][parseInt(n)];
      }
      counter++;
    });

    return chrom_array.join('');
  }

  // determine whether a single binary value will mutate
  function willMutate(rate=0.0005) {
    return Math.floor(Math.random() * (1/rate)) === 0;
  }
}

module.exports = Population;
