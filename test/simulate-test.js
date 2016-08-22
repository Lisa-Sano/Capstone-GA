var assert = require('assert');
var rewire = require('rewire');
var Simulation = require('../source/javascripts/simulate');
var simulate = rewire('../source/javascripts/simulate.js');

buildChromosome = simulate.__get__('buildChromosome');
getMoth = simulate.__get__('getMoth');
getPair = simulate.__get__('getPair');
evalFitness = simulate.__get__('evalFitness');
probabilities = simulate.__get__('probabilities');

var sim;
var moth_grey;
var moth_multi;

var config_grey = {
  max_env: 255,
  population_size: 1,
  mutation_rate: 0,
  uniform: false,
  env: 20,
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
  env: 20,
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

    sim_multi = new Simulation(config_multi);
    moth_multi = sim_multi.population[0];
  });

  describe('config property', function() {
    it('should have a config property', function() {
      assert.notEqual(null, sim.config);
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
      var new_grey_chrom = buildChromosome([moth_grey.chromosome, moth_grey.chromosome], ["grey"], config_grey);
      var new_multi_chrom = buildChromosome([moth_multi.chromosome, moth_multi.chromosome], ["red", "green", "blue"], config_multi);

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
      let moth_grey_2 = {chromosome: {grey: '11111111'}, value: {grey: 255}, chrom_length: 8};
      let pair_grey = getPair([moth_grey, moth_grey_2], [0.5, 1]);

      let moth_multi_2 = {
        chromosome: {red: '11111111', green: '11111111', blue: '11111111'},
        value: {red: 255, green: 255, blue: 255},
        chrom_length: 8
      };
      let pair_multi = getPair([moth_multi, moth_multi_2], [0.5, 1]);

      assert(Array.isArray(pair_grey));
      assert(pair_grey.includes(moth_grey.chromosome));
      assert(pair_grey.includes(moth_grey_2.chromosome));

      assert(Array.isArray(pair_multi));
      assert(pair_multi.includes(moth_multi.chromosome));
      assert(pair_multi.includes(moth_multi_2.chromosome));
    });

    it('should never return chromosomes from the same two moths', function() {
      let moth_grey_2 = {chromosome: {grey: '11111111'}, value: {grey: 255}, chrom_length: 8};
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
});