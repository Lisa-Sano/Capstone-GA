var assert = require('assert');
var rewire = require('rewire');
var Population = require('../source/javascripts/population');

var pop = rewire('../source/javascripts/population.js');

getChromVals = pop.__get__('getChromVals');
generateMoths = pop.__get__('generateMoths');
evalFitness = pop.__get__('evalFitness');
probabilities = pop.__get__('probabilities');
weightedSample = pop.__get__('weightedSample');
mutateChromosome = pop.__get__('mutateChromosome');
willMutate = pop.__get__('willMutate');


var p;
var p2;
var m1 = {chrom: '00000001', value: 1};
var m2 = {chrom: '00000010', value: 2};
var m3 = {chrom: '00000011', value: 3};

describe('Population', function() {
  before(function(){
    p = new Population();
    p2 = new Population({
      population: [m1, m2, m3],
      env: 100
    });
  });

  describe('getChromVals function', function() {
    let vals = getChromVals([m1, m2, m3]);

    it('returns an array', function() {
      assert.equal(true, Array.isArray(vals));
    });

    it('returns an array of the numerical values of the chromosome binaries', function() {
      assert.deepEqual([1, 2, 3], vals);
    });
  });

  describe('evalFitness function', function() {
    let fitness = evalFitness([m1, m2, m3], 255, 100);

    it('should return an array', function() {
      assert.equal(true, Array.isArray(fitness));
    });

    it('should evaluate a higher fitness for chromosome values closer to the env color', function() {
      assert.equal(true, (fitness[0] < fitness[2]));
    });
  });

  describe('probabilities function', function() {
    let fitness = [1, 2, 3];
    let probs = probabilities(fitness);

    it('should return an array', function() {
      assert.equal(true, Array.isArray(probs));
    });

    it('should have a last value of 1', function() {
      assert.equal(1, probs[probs.length - 1]);
    });

    it('should be the same length as the fitness array', function() {
      assert.equal(probs.length, fitness.length);
    });

    it('the delta between highest fitness vs prev val should be larger than lower fitness vs prev val', function() {
      var probability_of_2 = probs[1] - probs[0];
      var probability_of_3 = probs[2] - probs[1];
      assert.equal(true, probability_of_2 < probability_of_3);
    });
  });

  describe('weightedSample function', function() {
    let probs = [0.2, 0.5, 1];
    let sample = weightedSample(probs, [m1, m2, m3]);

    it('should return a member of the given population that responds to .chrom and .value', function() {
      assert.equal('object', typeof(sample));
      assert.notEqual(null, sample.chrom);
      assert.notEqual(null, sample.value);
    });
  });

  it('should have a max_env property of 255', function() {
    assert.equal(255, p.max_env);
  });

  describe('size property', function() {
    it('should return a number', function() {
      assert.equal('number', typeof(p.size));
    });

    it('should be 500 by default if no population is provided', function() {
      assert.equal(500, p.size);
    })

    it('should equal the length of the population', function() {
      assert.equal(3, p2.size);
    });
  });

  describe('population property', function() {
    it('should be an array', function() {
      assert.equal(true, Array.isArray(p.population));
    });

    it('should be 500 long by default if no population is provided', function() {
      assert.equal(500, p.population.length);
    })

    it('should be set if an obj with population key is passed in', function() {
      assert.deepEqual([m1, m2, m3], p2.population);
    });
  });

  describe('chrom_vals property', function() {
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

  describe('fitness property function', function() {
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






