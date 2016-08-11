var assert = require('assert');
var Population = require('../source/javascripts/population');

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

  it('should have a max_env property of 255', function() {
    assert.equal(255, p.max_env);
  })

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

});






