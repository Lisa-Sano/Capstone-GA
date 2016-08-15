var assert = require('assert');
var rewire = require('rewire');
var frequency = require('../source/javascripts/frequency');

var population = [{chromosome: '00000000', value: 0}];
var freq = frequency(population);

describe('frequency', function() {
  it('should return an array of objects with the keys percent and frequency', function() {
    assert.equal(true, Array.isArray(freq));
    assert.equal('object', typeof(freq[0]));
    assert.notEqual(null, freq[0].percent);
    assert.notEqual(null, freq[0].frequency);
  });
});