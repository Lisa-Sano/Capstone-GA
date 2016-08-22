var chai = require('chai');
var assert = chai.assert;
var rewire = require('rewire');
var Matchmaker = require('../source/javascripts/matchmaker');
var matchmaker = rewire('../source/javascripts/matchmaker.js');

mutateChromosome = matchmaker.__get__('mutateChromosome');
willMutate = matchmaker.__get__('willMutate');

var m;
var mutate_1;
var mutate_0;
var child_chromosome;
var config = { mutation_rate: 0 };
var moth1 = { chromosome: {grey: '00000000'}, chromosome_types: ["grey"], value: 0 };
var moth2 = { chromosome: {grey: '11111111'}, chromosome_types: ["grey"], value: 255 };

describe('Matchmaker', function() {
  before(function(){
    m = new Matchmaker(config);
  });

  it('should have a config property', function() {
    assert.isNotNull(m.config);
  });

  describe('mate function', function() {
    before(function(){
      child_chromosome = m.mate([moth1.chromosome.grey, moth2.chromosome.grey]);
    });

    it('should return a string of 8 elements', function() {
      assert.isString(child_chromosome);
      assert.lengthOf(child_chromosome, 8);
    });

    it('should return a string only containing binary numbers', function() {
      assert.match(child_chromosome, /^[01]+$/);
    });

    // crossover index cannot be first or last index - there must be both parents represented
    it('should return a combination of the two parent chromosomes', function() {
      assert.include(child_chromosome, '1');
      assert.include(child_chromosome, '0');
    });
  });

  describe('mutateChromosome function', function() {
    it('should return a string of 8 binary numbers', function() {
      var mutated = mutateChromosome(moth1.chromosome.grey, 1);
      assert.isString(mutated);
      assert.lengthOf(mutated, 8);
      assert.match(mutated, /^[01]+$/);
    });

    it('should flip all values of string if the mutation rate is 1', function() {
      var mutated1 = mutateChromosome(moth1.chromosome.grey, 1);
      assert.equal(mutated1, '11111111');
    });

    it('should flip none of the values of string if the mutation rate is 0', function() {
      var mutated2 = mutateChromosome(moth1.chromosome.grey, 0);
      assert.equal(mutated2, moth1.chromosome.grey);
    });
  });

  describe('willMutate function', function() {
    before(function() {
      mutate_1 = willMutate(1);
      mutate_0 = willMutate(0);
    });

    it('should return a boolean value', function() {
      assert.isBoolean(mutate_1);
      assert.isBoolean(mutate_0);
    });

    it('should return true if the mutation rate is 1', function() {
      assert.isTrue(mutate_1);
    });

    it('should return false if the mutation rate is 0', function() {
      assert.isFalse(mutate_0);
    });
  });
});


