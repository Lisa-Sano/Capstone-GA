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
    assert.notEqual(null, m.config);
  });

  describe('mate function', function() {
    before(function(){
      child_chromosome = m.mate([moth1.chromosome.grey, moth2.chromosome.grey]);
    });

    it('should return a string of 8 elements', function() {
      assert.equal("string", typeof(child_chromosome));
      assert.equal(8, child_chromosome.length);
    });

    it('should return a string only containing binary numbers', function() {
      assert.equal(true, /^[01]+$/.test(child_chromosome));
    });

    // crossover index cannot be first or last index - there must be both parents represented
    it('should return a combination of the two parent chromosomes', function() {
      assert.equal(true, child_chromosome.includes('1'));
      assert.equal(true, child_chromosome.includes('0'));
    });
  });

  describe('mutateChromosome function', function() {
    it('should return a string of 8 binary numbers', function() {
      var mutated = mutateChromosome(moth1.chromosome.grey, 1);
      assert.equal("string", typeof(mutated));
      assert.equal(8, mutated.length);
      assert.equal(true, /^[01]+$/.test(mutated));
    });

    it('should flip all values of string if the mutation rate is 1', function() {
      var mutated1 = mutateChromosome(moth1.chromosome.grey, 1);
      console.log("mutated1", mutated1);
      assert.equal('11111111', mutated1);
    });

    it('should flip none of the values of string if the mutation rate is 0', function() {
      var mutated2 = mutateChromosome(moth1.chromosome.grey, 0);
      assert.equal(moth1.chromosome.grey, mutated2);
    });
  });

  describe('willMutate function', function() {
    before(function() {
      mutate_1 = willMutate(1);
      mutate_0 = willMutate(0);
    });

    it('should return a boolean value', function() {
      assert.equal('boolean', typeof(mutate_1));
      assert.equal('boolean', typeof(mutate_0));
    });

    it('should return true if the mutation rate is 1', function() {
      assert.equal(true, mutate_1);
    });

    it('should return false if the mutation rate is 0', function() {
      assert.equal(false, mutate_0);
    });
  });
});


