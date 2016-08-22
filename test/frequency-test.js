var chai = require('chai');
var assert = chai.assert;
var rewire = require('rewire');
var frequency = require('../source/javascripts/frequency');

var chrom_vals = [[0], [255]]
var freq = frequency(chrom_vals);

describe('frequency', function() {
  it('should return an array of objects with the keys percent and frequency', function() {
    assert.isArray(freq);
    assert.isObject(freq[0]);
    assert.isDefined(freq[0].percent);
    assert.isDefined(freq[0].frequency);
  });

  it('should have a frequency of 0.5 for objects with percent === 0 and percent === 100 and others should be 0', function() {
      assert.deepEqual({percent: 0, frequency: 0.5}, freq[0]);
      assert.deepEqual({percent: 5, frequency: 0}, freq[1]);
      assert.deepEqual({percent: 10, frequency: 0}, freq[2]);
      assert.deepEqual({percent: 15, frequency: 0}, freq[3]);
      assert.deepEqual({percent: 20, frequency: 0}, freq[4]);
      assert.deepEqual({percent: 25, frequency: 0}, freq[5]);
      assert.deepEqual({percent: 30, frequency: 0}, freq[6]);
      assert.deepEqual({percent: 35, frequency: 0}, freq[7]);
      assert.deepEqual({percent: 40, frequency: 0}, freq[8]);
      assert.deepEqual({percent: 45, frequency: 0}, freq[9]);
      assert.deepEqual({percent: 50, frequency: 0}, freq[10]);
      assert.deepEqual({percent: 55, frequency: 0}, freq[11]);
      assert.deepEqual({percent: 60, frequency: 0}, freq[12]);
      assert.deepEqual({percent: 65, frequency: 0}, freq[13]);
      assert.deepEqual({percent: 70, frequency: 0}, freq[14]);
      assert.deepEqual({percent: 75, frequency: 0}, freq[15]);
      assert.deepEqual({percent: 80, frequency: 0}, freq[16]);
      assert.deepEqual({percent: 85, frequency: 0}, freq[17]);
      assert.deepEqual({percent: 90, frequency: 0}, freq[18]);
      assert.deepEqual({percent: 95, frequency: 0}, freq[19]);
      assert.deepEqual({percent: 100, frequency: 0.5}, freq[20]);
  });
});