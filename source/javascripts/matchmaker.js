var Matchmaker = function(config) {
  this.config = config;
}

Matchmaker.prototype.mate = function(moth_chromosomes) {
  // take a weighted sampling of two moths based on fitness scores/probabilities
  let moth1 = moth_chromosomes[0];
  let moth2 = moth_chromosomes[1];

  // pick a random index of the chromosome to crossover
  let crossover = Math.floor(Math.random() * (7 - 1) + 1);

  let first_piece = moth1.slice(0,crossover);
  let second_piece = moth2.slice(crossover, 8);
  let new_chrom = first_piece + second_piece;

  return mutateChromosome(new_chrom, this.config.mutation_rate);
}

// mutates 0 to 1, or 1 to 0 (goes through every index and mutates
// if willMutate() returns true)
function mutateChromosome(chrom, rate) {
  for (let i = 0; i < chrom.length; i++) {
    if (willMutate(rate)) {
      chrom = chrom.substr(0, i) + [1, 0][parseInt(chrom[i])] + chrom.substr(i+1);
    }
  }

  return chrom;
}

// determine whether a single binary value will mutate
function willMutate(rate) {
  return Math.floor(Math.random() * (1/rate)) === 0;
}

module.exports = Matchmaker;
