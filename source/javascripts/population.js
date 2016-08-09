var Population = function(pop={}) {
  this.size = (pop.population == null ? 1000 : pop.population.length),
  this.population = pop.population || generateMoths(this.size),
  this.max_env = 255,
  this.env = 223,
  this.fitness = evalFitness(this.population, this.max_env, this.env),
  this.probs = probabilities(this.fitness),
  this.mate = function() {
    // take a weighted sampling of two moths
    let moth1 = weightedSample(this.probs, this.population);
    let moth2 = weightedSample(this.probs, this.population);

    // pick a random index of the chromosome to cross the chromosomes of the 2 moths
    let crossover = Math.floor(Math.random() * 8);

    let first_piece = moth1.chromosome.slice(0,crossover);
    let second_piece = moth2.chromosome.slice(crossover, 8);
    let new_chrom = first_piece + second_piece;
    mutateChromosome(new_chrom);
    let new_moth = new Moth({chrom: new_chrom});
    return new_moth;
  }

  function generateMoths(num) {
    let pop = [];
    for (let i = 0; i < num; i++) {
      let m = new Moth();
      pop.push(m);
    }

    return pop;
  }

  function evalFitness(pop, max, env) {
    let f = [];
    pop.forEach(function(m) {
      f.push(Math.pow(max - Math.abs(env - parseInt(m.chromosome, 2)), 1.001));
    });

    return f;
  }

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

  function weightedSample(probs, population) {
    let r = Math.random();
    console.log("r is: " + r);

    for (let i = 0; i < probs.length; i++) {
      if (r < probs[i]) {
        return population[i];
      }
    };

    return population[probs.length - 1];
  }

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

  function willMutate(rate=0.0005) {
    return Math.floor(Math.random() * (1/rate)) === 0;
  }
}

module.exports = Population;
