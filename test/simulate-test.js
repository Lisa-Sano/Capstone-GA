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
    sim_multi = new Simulation(config_multi);
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
      assert.equal(true, Array.isArray(sim.population));
      assert.equal(true, Array.isArray(sim_multi.population));
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
      var new_grey_chrom = buildChromosome([{grey: '00000000'}, {grey: '00000001'}], ["grey"], config_grey);
      var new_multi_chrom = buildChromosome([
        {red: '00000000', green: '00000000', blue: '00000000'},
        {red: '00000001', green: '00000001', blue: '00000001'}
      ],
      ["red", "green", "blue"],
      config_multi);

      assert.deepEqual({grey: '00000000'}, new_grey_chrom);
      assert.deepEqual({red: '00000000', green: '00000000', blue: '00000000'}, new_multi_chrom);
    });
  });

  describe('getMoth', function() {
    it('should return a moth object', function() {
      // function getMoth(population, probabilities)
      var chosen = getMoth(sim.population, [1]);
      var chosen_multi = getMoth(sim_multi.population, [1]);
      assert.deepEqual({chromosome: {grey: '00000000'}, value: {grey: 0}, chrom_length: 8}, chosen);
      assert.deepEqual(
        {
          chromosome: {red: '00000000', green: '11111111', blue: '11111111'},
          value: {red: 0, green: 255, blue: 255},
          chrom_length: 8
        }, chosen_multi);
    });
  });
});