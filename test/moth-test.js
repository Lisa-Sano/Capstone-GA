var assert = require('assert');
var Moth = require('../source/javascripts/moth');

var m;

describe('Moth', function() {
  before(function(){
    m = new Moth();
  });

  describe('chromosome property', function() {
    it('should return a string', function() {
      assert.equal("string", typeof(m.chromosome));
    });

    it('should return a string of 8 elements', function() {
      assert.equal(8, m.chromosome.length);
    });
  });

  describe('chrom_length property', function() {
    it('should be 8', function() {
      assert.equal(8, m.chrom_length);
    });

    it('should be the same as the length of the chromosome', function() {
      assert.equal(m.chrom_length, m.chromosome.length);
    })
  })
});