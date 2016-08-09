var Population = function(pop={}) {
  this.size = (pop.population == null ? 1000 : pop.population.length),
  this.population = pop.population || generateMoths(this.size),
  this.max_env = 255,
  this.env = 223,
  this.fitness = eval_fitness(this.population, this.max_env, this.env),
  this.probs = probabilities(this.fitness)

  function generateMoths(num) {
    var pop = [];
    for (let i = 0; i < num; i++) {
      var m = new Moth();
      // var m = "moth!!!";
      pop.push(m);
    }

    return pop;
  }

  function eval_fitness(pop, max, env) {
    var f = [];
    pop.forEach(function(m) {
      f.push(Math.pow(max - Math.abs(env - parseInt(m.chromosome, 2)), 1.001));
    });

    return f;
  }

  function probabilities(fitness) {
    var fit_sum = fitness.reduce(function(acc, cur) {
      return acc + cur;
    }, 0);
    var prob_sum = 0.0;
    var probs = [];
    var counter = 0;

    fitness.forEach(function(f) {
      probs[counter] = prob_sum + (f / fit_sum);
      prob_sum = probs[counter];
      counter++;
    });

    return probs;
  }

  function weighted sample() {
  }

  function mate() {
  }

  function mutate_chromosome() {
  }

  function willMutate() {
  }
}



//   def weighted_sample
//     r = rand

//     probs.each_with_index do |p, i|
//       if r < p
//         return population[i]
//       end
//     end

//     return population[probs.length - 1]
//   end

//   def mate
//     moth1 = weighted_sample
//     moth2 = weighted_sample

//     length = moth1.chrom_length
//     r1 = rand(0..length-1)
//     # r2 = rand(r1..length-1)

//     # randomnly determine which moth the 1st part of chromosome is taken from
//     moths = [moth1, moth2].shuffle
//     first_piece = moths[0].chromosome.slice(0...r1)
//     second_piece = moths[1].chromosome.slice(r1..length-1)
//     # third_piece = moths[0].chromosome.slice(r2..length-1)
//     new_chrom = first_piece + second_piece
//     # puts "new chrom is: #{new_chrom}"
    
//     mut_chrom = mutate_chromosome(new_chrom.clone)

//     new_moth = Moth.new({chrom: mut_chrom})
//   end

//   def mutate_chromosome(chrom)
//     chrom_array = chrom.split('')
//     chrom_array.each_with_index do |n, i|
//       if mutate?
//         chrom_array[i] = [1, 0][n.to_i]
//       end
//     end
//     return chrom_array.join('')
//   end

//   def mutate?(rate = 0.0005)
//     rand(1/rate) == 0
//   end
// end

