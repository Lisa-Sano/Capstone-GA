var Simulate = function(config) {
  this.config = config;
  this.population = this.initializePopulation();
}

Simulate.prototype = {
  initializePopulation: function() {
    var population = [];
    var moth_properties = {};

    if (this.config.uniform) {
      moth_properties.chrom = '11111111';
    }

    for (let i = 0; i < this.config.population_size; i++) {
      population.push(new this.config.moth(moth_properties));
    }

    return population;
  },
  runSimulation: function (numberOfGenerations) {
    var matchmaker = new this.config.matchmaker(this.config);

    // run the simulation (numberOfGenerations) number of times
    for (let i = 0; i < numberOfGenerations; i++) {
      // get array of all the numerical chromosome values
      let fitness = evalFitness(this.population, this.config);
      let probs = probabilities(fitness);

      // create the same number of children as the starting pop by mating
      var new_pop = [];
      // pop.same = 0;
      for (let i = 0; i < this.config.population_size; i++) {
        let pair = getPair(this.population, probs);
        let moth = new this.config.moth({chrom: matchmaker.mate(pair)});
        new_pop.push(moth);
      }

      this.population = new_pop;
    }
  }
}

// returns a Moth, sampled using the weighted probabilities
function getMoth(population, probabilities) {
  let r = Math.random();

  for (let i = 0; i < population.length; i++) {
    if (r < probabilities[i]) {
      return population[i];
    }
  }

  return population[probabilities.length - 1];
}

function getPair(population, probabilities) {
  var moth1 = getMoth(population, probabilities);
  var moth2 = getMoth(population, probabilities);

  while (moth1 === moth2) {
    moth2 = getMoth(population, probabilities);
  }

  return [moth1, moth2];
}

// calculate the fitness (closer value of chromosome compared to environment value = higher score)
function evalFitness(pop, config) {
  return pop.map(function(m) {
    return (config.max_env - (Math.abs(config.env - m.value)) * config.fitness_advantage) / config.max_env;
  });
}

// weighted probabilities based on fitness score
// higher fitness scores have higher chance of being selected
function probabilities(fitness) {
  let fit_sum = fitness.reduce(function(acc, cur) {
    return acc + cur;
  }, 0);
  let prob_sum = 0.0;
  let probs_arr = [];
  let counter = 0;

  fitness.forEach(function(f) {
    probs_arr[counter] = prob_sum + (f / fit_sum);
    prob_sum = probs_arr[counter];
    counter++;
  });

  return probs_arr;
}

module.exports = Simulate;
