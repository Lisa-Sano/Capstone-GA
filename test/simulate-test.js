var assert = require('assert');
var rewire = require('rewire');
var Simulation = require('../source/javascripts/simulate');
var simulate = rewire('../source/javascripts/simulate.js');

getMoth = simulate.__get__('getMoth');
getPair = simulate.__get__('getPair');
evalFitness = simulate.__get__('evalFitness');
probabilities = simulate.__get__('probabilities');

var sim;
var config = {
  max_env: 255,
  population_size: 1,
  mutation_rate: 0,
  uniform: false,
  env: 20,
  moth: function(properties) {
    return {
      chromosome: properties.chrom || '00000000',
      value: properties.value || 0,
      chrom_length: 8
    };
  },
  matchmaker: function(properties) {
    return {
      mate: function(pair_arr) { return '00000000'; }
    }
  }
}

describe('Simulate', function() {
  before(function(){
    sim = new Simulation(config);
  });

  describe('config property', function() {
    it('should have a config property', function() {
      assert.notEqual(null, sim.config);
    });
  });

  describe('population property', function() {
    it('should have a population property', function() {
      assert.notEqual(null, sim.population);
    });

    it('should be an array', function() {
      assert.equal(true, Array.isArray(sim.population));
    });

    it('should create moths with default chromosomes if not given specific chromosome values', function() {
      assert.equal('00000000', sim.population[0].chromosome);
    });

    it('should initialize a population of moths with chromosomes "11111111" if uniform = true', function() {
      config.uniform = true;
      var sim2 = new Simulation(config);
      assert.equal('11111111', sim2.population[0].chromosome);
      config.uniform = false;
    });
  });
});