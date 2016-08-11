var assert = require('assert');
var Moth = require('../source/javascripts/moth');

var m;
var m2;

describe('Moth', function() {
  before(function(){
    m = new Moth();
    m2 = new Moth({chrom: '00001111'});
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
    });
  });

  describe('value property', function() {
    it('should equal the number equivalent of the binary chromosome', function() {
      assert.equal(15, parseInt(m2.chromosome, 2));
    });
  });

  describe('initializing a new moth', function() {
    it('can be initialized with a specific chromosome binary number', function() {
      assert.equal('00001111', m2.chromosome);
      assert.equal(15, parseInt(m2.chromosome, 2));
      assert.equal(8, m.chrom_length);
    });
  });
});