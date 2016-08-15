var Moth = require("./moth");

var Population = function(pop={}, white=false, moth_obj=Moth) {
  this.newMoth = function(properties={}) {
    if (white) {
      properties["chrom"] = '00000000';
    }

    return new moth_obj(properties);
  };
  this.size = (pop.population == null ? 500 : pop.population.length);
  this.population = pop.population || this.getMoths(this.size);
  this.chrom_vals = getChromVals(this.population);
  this.max_env = 255;
  this.env = pop.env || Math.floor(Math.random() * (this.max_env + 1));
  this.fitness = evalFitness(this.population, this.max_env, this.env);
  this.probs = probabilities(this.fitness);
}

// if population not initialized with an array of moths, generate a new population
Population.prototype.getMoths = function(num) {
  let pop = [];
  for (let i = 0; i < num; i++) {
    pop.push(this.newMoth());
  }

  return pop;
}

// returns a Moth, sampled using the weighted probabilities
Population.prototype.weightedSample = function() {
  let r = Math.random();

  for (let i = 0; i < this.probs.length; i++) {
    if (r < this.probs[i]) {
      return this.population[i];
    }
  }

  return this.population[this.probs.length - 1];
}

Population.prototype.mate = function(moths={}) {
  // take a weighted sampling of two moths based on fitness scores/probabilities
  let moth1 = moths.moth_one || this.weightedSample();
  let moth2 = moths.moth_two || this.weightedSample();

  while (moth1 === moth2) {
    // this.same += 1
    moth2 = moths.moth_two || this.weightedSample();
  }

  // pick a random index of the chromosome to crossover
  let crossover = Math.floor(Math.random() * (7 - 1) + 1);

  let first_piece = moth1.chromosome.slice(0,crossover);
  let second_piece = moth2.chromosome.slice(crossover, 8);
  let new_chrom = first_piece + second_piece;

  // initialize a new moth based on the (potentially) mutated chromosome
  return this.newMoth({chrom: mutateChromosome(new_chrom)});
}

// create an array of chromosome values for the entire population
function getChromVals(population) {
  return population.map(function(m) {
    return m.value;
  });
}

// calculate the fitness (closer value of chromosome compared to environment value = higher score)
function evalFitness(pop, max, env) {
  return pop.map(function(m) {
    return (max - (Math.abs(env - m.value)) * 0.25) / max;
  });
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


// mutates 0 to 1, or 1 to 0 (goes through every index and mutates
// if willMutate() returns true)
function mutateChromosome(chrom) {
  for (let i = 0; i < chrom.length; i++) {
    if (willMutate()) {
      chrom = chrom.substr(0, i) + [1, 0][parseInt(chrom[i])] + chrom.substr(i+1);
    }
  }

  return chrom;
}

// determine whether a single binary value will mutate
function willMutate(rate=0.00005) {
  return Math.floor(Math.random() * (1/rate)) === 0;
}


module.exports = Population;
