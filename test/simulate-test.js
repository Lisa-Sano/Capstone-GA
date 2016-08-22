var chai = require('chai');
var assert = chai.assert;
var rewire = require('rewire');
var Simulation = require('../source/javascripts/simulate');
var simulate = rewire('../source/javascripts/simulate.js');

buildChromosome = simulate.__get__('buildChromosome');
getMoth = simulate.__get__('getMoth');
getPair = simulate.__get__('getPair');
sumFitness = simulate.__get__('sumFitness');
evalFitness = simulate.__get__('evalFitness');
probabilities = simulate.__get__('probabilities');

var sim;
var moth_grey;
var moth_grey_2;
var moth_multi;
var moth_multi_2;

var config_grey = {
  max_env: 255,
  population_size: 1,
  mutation_rate: 0,
  uniform: false,
  fitness_advantage: 1,
  env: {grey: 0},
  moth: function(properties) {
    return {
      chromosome: properties.chromosome || {grey: '00000000'},
      value: properties.value || {grey: 0},
      chrom_length: 8
    };
  },
  moth_type: ["grey"],
  matchmaker: function(properties) {
    return {
      mate: function(pair_arr) { return '00000000'; }
    }
  }
};
var config_multi = {
  max_env: 255,
  population_size: 1,
  mutation_rate: 0,
  uniform: false,
  fitness_advantage: 1,
  env: {red: 255, green: 255, blue: 255},
  moth: function(properties) {
    return {
      chromosome: properties.chromosome || {red: '00000000', green: '11111111', blue: '11111111'},
      value: properties.value || {red: 0, green: 255, blue: 255},
      chrom_length: 8
    };
  },
  moth_type: ["red", "green", "blue"],
  matchmaker: function(properties) {
    return {
      mate: function(pair_arr) { return '00000000'; }
    }
  }
};

describe('Simulate', function() {
  before(function(){
    sim = new Simulation(config_grey);
    moth_grey = sim.population[0];
    moth_grey_2 = {chromosome: {grey: '11111111'}, value: {grey: 255}, chrom_length: 8}

    sim_multi = new Simulation(config_multi);
    moth_multi = sim_multi.population[0];
    moth_multi_2 = {
      chromosome: {red: '11111111', green: '11111111', blue: '11111111'},
      value: {red: 255, green: 255, blue: 255},
      chrom_length: 8
    };
  });

  describe('config property', function() {
    it('should have a config property', function() {
      assert.isNotNull(sim.config);
      assert.notEqual(null, sim_multi.config);
    });
  });

  describe('population property', function() {
    it('should have a population property', function() {
      assert.notEqual(null, sim.population);
      assert.notEqual(null, sim_multi.population);
    });

    it('should be an array', function() {
      assert(Array.isArray(sim.population));
      assert(Array.isArray(sim_multi.population));
    });
  });

  describe('initializePopulation', function() {
    it('should create moths even if not given specific chromosome values for starting moths', function() {
      assert.equal('00000000', sim.population[0].chromosome.grey);
      assert.equal('00000000', sim_multi.population[0].chromosome.red);
      assert.equal('11111111', sim_multi.population[0].chromosome.green);
      assert.equal('11111111', sim_multi.population[0].chromosome.blue);
    });

    it('should initialize a population of moths with specific chromosomes if uniform = true', function() {
      config_grey.uniform = true;
      config_multi.uniform = true;
      var sim2 = new Simulation(config_grey);
      var sim2_multi = new Simulation(config_multi);

      assert.equal('11111111', sim2.population[0].chromosome.grey);
      assert.equal('10000111', sim2_multi.population[0].chromosome.red);
      assert.equal('00010000', sim2_multi.population[0].chromosome.green);
      assert.equal('01101011', sim2_multi.population[0].chromosome.blue);

      config_grey.uniform = false;
      config_multi.uniform = false;
    });
  });

  describe('buildChromosome', function() {
    it('should return a chromosome object', function() {
      var new_grey_chrom = buildChromosome([moth_grey.chromosome, moth_grey_2.chromosome], ["grey"], config_grey);
      var new_multi_chrom = buildChromosome([moth_multi.chromosome, moth_multi_2.chromosome], ["red", "green", "blue"], config_multi);

      assert.deepEqual({grey: '00000000'}, new_grey_chrom);
      assert.deepEqual({red: '00000000', green: '00000000', blue: '00000000'}, new_multi_chrom);
    });
  });

  describe('getMoth', function() {
    it('should return a moth object', function() {
      let chosen = getMoth(sim.population, [1]);
      let chosen_multi = getMoth(sim_multi.population, [1]);
      assert.deepEqual(moth_grey, chosen);
      assert.deepEqual(moth_multi, chosen_multi);
    });
  });

  describe('getPair', function() {

    it('should return an array of two moth chromosomes', function() {
      let pair_grey = getPair([moth_grey, moth_grey_2], [0.5, 1]);
      let pair_multi = getPair([moth_multi, moth_multi_2], [0.5, 1]);

      assert(Array.isArray(pair_grey));
      assert(pair_grey.includes(moth_grey.chromosome));
      assert(pair_grey.includes(moth_grey_2.chromosome));

      assert(Array.isArray(pair_multi));
      assert(pair_multi.includes(moth_multi.chromosome));
      assert(pair_multi.includes(moth_multi_2.chromosome));
    });

    it('should never return chromosomes from the same two moths', function() {
      let pair_grey = getPair([moth_grey_2, moth_grey, moth_grey, moth_grey, moth_grey, moth_grey], [0.1, 0.2, 0.3, 0.4, 0.5, 1])
    
      assert(pair_grey.includes(moth_grey.chromosome));
      assert(pair_grey.includes(moth_grey_2.chromosome));
    });

    it('can pick the same chromosome values as long as they are from diff moths', function() {
      let moth_1 = {chromosome: {grey: '11111111'}};
      let moth_2 = {chromosome: {grey: '11111111'}};

      let pair_grey = getPair([moth_1, moth_2], [0.5, 1]);

      assert(pair_grey.includes(moth_1.chromosome));
      assert(pair_grey.includes(moth_2.chromosome));
    });
  });

  describe('evalFitness', function() {
    var fitness_grey;
    var fitness_multi;

    before(function() {
      fitness_grey = evalFitness([moth_grey, moth_grey_2], config_grey);
      fitness_multi = evalFitness([moth_multi, moth_multi_2], config_multi);
    });

    it('returns an array of arrays', function() {
      assert(Array.isArray(fitness_grey));
      assert(Array.isArray(fitness_grey[0]));
      assert(Array.isArray(fitness_multi));
      assert(Array.isArray(fitness_multi[0]));
    });

    it('should have an inner array representing an individual moth\'s fitness for each of its chromosome colors', function() {
      assert.equal(2, fitness_grey.length);
      assert.equal(1, fitness_grey[0].length);
      assert.equal(1, fitness_grey[0][0]);
      assert.equal(0, fitness_grey[1][0]);

      // for multi colored moths, inner array should represent r, g, b values (length == 3);
      assert.equal(2, fitness_multi.length);
      assert.equal(3, fitness_multi[0].length);
      assert.equal(0, fitness_multi[0][0]);
      assert.equal(1, fitness_multi[0][1]);
      assert.equal(1, fitness_multi[0][2]);
      assert.equal(1, fitness_multi[1][0]);
      assert.equal(1, fitness_multi[1][1]);
      assert.equal(1, fitness_multi[1][2]);
    });
  });

  describe('sumFitness', function() {
    it('should return an array of the sum of the individual chromosome colors\'s fitnesses for each moth', function() {
      let sum_grey = sumFitness([moth_grey, moth_grey_2], config_grey);
      let sum_multi = sumFitness([moth_multi, moth_multi_2], config_multi);

      assert(Array.isArray(sum_grey));
      assert(Array.isArray(sum_multi));

      assert.deepEqual([1, 0], sum_grey);
      assert.deepEqual([2, 3], sum_multi);
    });
  });

  describe('probabilities', function() {
    var probs;

    before(function() {
      probs = probabilities([1, 0, 1, 1, 2]);
    });

    it('should return an array', function() {
      assert(Array.isArray(probs));
    });

    it('should have a last value of 1', function() {
      assert.equal(1, probs[probs.length-1]);
    });

    it('should assign probability weights based on fitness (fitness of 0 should not add anything to previous value)', function() {
      assert.equal(probs[0], probs[1]);
    });

    it('should assign probability weights based on fitness (higher fitness should add more to prev value than lower fitness)', function() {
      assert((probs[4] - probs[3]) > (probs[3] - probs[2]));
    });
  });
});
