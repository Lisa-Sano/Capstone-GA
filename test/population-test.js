var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');
var Population = require('../source/javascripts/population');

var pop = rewire('../source/javascripts/population.js');

mutateChromosome = pop.__get__('mutateChromosome');
willMutate = pop.__get__('willMutate');

var p;
var p2;
var m1 = {chrom: '00000001', value: 1};
var m2 = {chrom: '00000010', value: 2};
var m3 = {chrom: '00000011', value: 3};

describe('Population', function() {
  before(function() {
    var mockMoth = function(properties) {
      return {
        chromosome: properties.chrom || '00000000',
        value: properties.chrom || 0,
        chrom_length: 8
      }
    };

    p = new Population({}, mockMoth);
    p2 = new Population({
      population: [m1, m2, m3],
      env: 100
    });
  });

  describe('newMoth function', function() {
    it('should return a Moth object with specific chromosome if given a properties obj containing chrom key', function() {
      let new_moth = p.newMoth(m1);
      assert.equal(m1.chrom, new_moth.chromosome);
      assert.equal(1, new_moth.value);
      assert.equal(8, new_moth.chrom_length);
    })
  });

  describe('weightedSample function', function() {
    it('should return a member of the given population', function() {
      let sample = p2.weightedSample();
      assert.equal('object', typeof(sample));
      assert.notEqual(null, sample.chrom);
      assert.notEqual(null, sample.value);
    });
  });

  describe('mate function', function() {
    let moths = {moth_one: {chromosome: '00000000', value: 0}, moth_two: {chromosome: '11111111', value: 255}};

    it('should return an object with Moth properties', function() {
      assert.equal('object', typeof(p.mate(moths)));
    });

    it('should cross over the chromosomes from the two moth objects chosen for mating', function() {
      let child = p.mate(moths);
      assert.equal(true, child.chromosome.includes("0"));
      assert.equal(true, child.chromosome.includes("1"));
    });

    it('should always contain values from both parents in chromosome (can\'t cross over at first or last index)', function() {
      let child = p.mate(moths);
      assert.equal('0', child.chromosome[0]);
      assert.equal('1', child.chromosome[7]);
    });
  });

  it('should have a max_env property of 255', function() {
    assert.equal(255, p.max_env);
  });

  describe('size property', function() {
    it('should return a number', function() { 
      assert.equal('number', typeof(p.size));
    });

    it('should be 500 by default', function() {
      assert.equal(500, p.size);
    })

    it('should equal the length of the population, if provided', function() {
      assert.equal(3, p2.size);
    });
  });

  describe('population property / getMoths function', function() {
    it('should be an array', function() {
      assert.equal(true, Array.isArray(p.population));
    });

    it('should be 500 long by default', function() {
      assert.equal(500, p.population.length);
    })

    it('should be set if an obj with population key is passed in', function() {
      assert.deepEqual([m1, m2, m3], p2.population);
    });
  });

  describe('chrom_vals property / getChromVals function', function() {
    it('should be an array', function() {
      assert.equal(true, Array.isArray(p2.chrom_vals));
    });

    it('should contain the numerical values of the binary chromosomes', function() {
      assert.deepEqual([1, 2, 3], p2.chrom_vals);
    })
  });

  describe('env property', function() {
    it('should be set if an obj with env key is passed in', function() {
      assert.equal(100, p2.env);
    });

    it('should by default be set to a number if no env is passed in', function() {
      assert.equal('number', typeof(p.env));
    })
  });

  describe('fitness property / evalFitness function', function() {
    it('should return an array', function() {
      assert.equal(true, Array.isArray(p2.fitness));
    });

    it('should evaluate a higher fitness for chromosome values closer to the env color', function() {
      assert.equal(true, (p2.fitness[0] < p2.fitness[2]));
    });
  });

  describe('probs property function', function() {
    it('should return an array', function() {
      assert.equal(true, Array.isArray(p2.probs));
    });

    it('should have a last value of 1', function() {
      assert.equal(1, p2.probs[p2.probs.length - 1]);
    });

    it('should be the same length as the population', function() {
      assert.equal(3, p2.population.length);
    });

    it('the delta between highest fitness vs prev val should be larger than lower fitness vs prev val', function() {
      var probability_of_2 = p2.probs[1] - p2.probs[0];
      var probability_of_3 = p2.probs[2] - p2.probs[1];
      assert.equal(true, probability_of_2 < probability_of_3);
    });
  });
});






