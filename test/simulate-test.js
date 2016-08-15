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
  population_size: 10,
  mutation_rate: 0,
  moth: function(properties) {
      return {
        chromosome: properties.chrom || '00000000',
        value: properties.value || 0,
        chrom_length: 8
      }
    },
  uniform: false,
  env: 20
}

describe('Matchmaker', function() {
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
  });
});