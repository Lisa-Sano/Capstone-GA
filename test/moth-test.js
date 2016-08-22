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
      assert.isObject(m.chromosome);
    });

    it('should return an object with the key grey when initialized with a grey type moth', function() {
      assert.isDefined(m.chromosome.grey);
    })

    it('chromosome object values should only contain binary numbers 0 or 1 by default', function() {
      assert.match(m.chromosome.grey, /^[01]+$/);
    });
  });

  describe('chrom_length property', function() {
    it('should be 8', function() {
      assert.equal(m.chrom_length, 8);
    });

    it('should be the same as the length of the chromosome', function() {
      assert.equal(m.chromosome.grey.length, m.chrom_length);
    });
  });

  describe('value property', function() {
    it('should equal the number equivalent of the binary chromosome', function() {
      assert.equal(parseInt(m2.chromosome.grey, 2), 15);
    });
  });

  describe('initializing a new moth', function() {
    it('can be initialized with a specific chromosome binary number', function() {
      assert.equal(m2.chromosome.grey, '00001111');
      assert.equal(parseInt(m2.chromosome.grey, 2), 15);
      assert.equal(m.chrom_length, 8);
    });
  });

  describe('lpad function', function() {
    var p = lpad("", "0", 8);

    it('should return a string of given length', function() {
      assert.lengthOf(p, 8);
    });

    it('should return a string of 0\'s if given an empty string to pad', function() {
      assert.equal(p, '00000000');
    });

    it('should add padding 0\'s to the left of the given string', function() {
      var pad2 = lpad("1111", "0", 8);

      assert.equal(pad2, '00001111');
    })
  });
});