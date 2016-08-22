var chai = require('chai');
var assert = chai.assert;
var rewire = require('rewire');
var Moth = require('../source/javascripts/moth');

var moth = rewire('../source/javascripts/moth.js');

lpad = moth.__get__('lpad');

var m;
var m2;

describe('Moth', function() {
  before(function(){
    m = new Moth({chromosome_types: ["grey"]});
    m2 = new Moth({chromosome_types: ["grey"], chromosome: { grey: '00001111' }});
  });

  describe('chromosome property', function() {
    it('should return an object', function() {
      assert.equal("object", typeof(m.chromosome));
    });

    it('should return an object with the key grey when initialized with a grey type moth', function() {
      assert.notEqual(null, m.chromosome.grey);
    })

    it('chromosome object values should only contain binary numbers 0 or 1 by default', function() {
      assert.equal(true, /^[01]+$/.test(m.chromosome.grey));
    });
  });

  describe('chrom_length property', function() {
    it('should be 8', function() {
      assert.equal(8, m.chrom_length);
    });

    it('should be the same as the length of the chromosome', function() {
      assert.equal(m.chrom_length, m.chromosome.grey.length);
    });
  });

  describe('value property', function() {
    it('should equal the number equivalent of the binary chromosome', function() {
      assert.equal(15, parseInt(m2.chromosome.grey, 2));
    });
  });

  describe('initializing a new moth', function() {
    it('can be initialized with a specific chromosome binary number', function() {
      assert.equal('00001111', m2.chromosome.grey);
      assert.equal(15, parseInt(m2.chromosome.grey, 2));
      assert.equal(8, m.chrom_length);
    });
  });

  describe('lpad function', function() {
    var p = lpad("", "0", 8);

    it('should return a string of given length', function() {
      assert.equal(8, p.length);
    });

    it('should return a string of 0\'s if given an empty string to pad', function() {
      assert.equal('00000000', p);
    });

    it('should add padding 0\'s to the left of the given string', function() {
      var pad2 = lpad("1111", "0", 8);

      assert.equal('00001111', pad2);
    })
  });
});