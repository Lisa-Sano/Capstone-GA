var Simulate = function(config) {
  this.config = config;
  this.population = this.initializePopulation();
}

Simulate.prototype = {
  initializePopulation: function() {
    var population = [];
    var moth_properties = {
      chromosome_types: this.config.moth_type
    };

    if (this.config.uniform) { 
      moth_properties.chromosome = (moth_properties.chromosome_types[0] === "grey"
        ? {grey: '11111111'}
        : {red: '10000111', green: '00010000', blue: '01101011'});
    }

    for (let i = 0; i < this.config.population_size; i++) {
      population.push(new this.config.moth(moth_properties));
    }

    return population;
  },
  runSimulation: function (numberOfGenerations) {
    // run the simulation (numberOfGenerations) times
    for (let i = 0; i < numberOfGenerations; i++) {
      let fitness = sumFitness(this.population, this.config);
      let probs = probabilities(fitness);

      // create the same number of children as the starting pop by mating
      var new_pop = [];
      for (let i = 0; i < this.config.population_size; i++) {
        let pair_chromosomes = getPair(this.population, probs);
        let types = this.config.moth_type;
        let full_chromosome = buildChromosome(pair_chromosomes, types, this.config);
        let moth = new this.config.moth({chromosome: full_chromosome, chromosome_types: types});
        new_pop.push(moth);
      }

      this.population = new_pop;
    }
  }
}

function buildChromosome(pair_chromosomes, types, config) {
  var matchmaker = new config.matchmaker(config);
  var new_chrom = {};

  for (let type of types) {
    new_chrom[type] = matchmaker.mate([pair_chromosomes[0][type], pair_chromosomes[1][type]]);
  }

  return new_chrom;
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

  return [moth1.chromosome, moth2.chromosome];
}

function sumFitness(pop, config) {
  var arr = evalFitness(pop, config);

  return arr.map(function(inner) {
    return inner.reduce(function(a, b) {
      return a + b;
    }, 0);
  })
}

// calculate the fitness (closer value of chromosome compared to environment value = higher score)
function evalFitness(pop, config) {
  // return an array of arrays. inner array represents fitnesses for each individuals chromosome(s)
  return pop.map(function(m) {
    let a = [];

    // iterate through all chromosomes (either grey, or red, green, and blue)
    for (let type of config.moth_type) {
      a.push((config.max_env - (Math.abs(config.env[type] - m.value[type])) * config.fitness_advantage) / config.max_env);
    }

    return a;
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
