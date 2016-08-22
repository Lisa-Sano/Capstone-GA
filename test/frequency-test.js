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
      assert.deepEqual(freq[0], {percent: 0, frequency: 0.5});
      assert.deepEqual(freq[1], {percent: 5, frequency: 0});
      assert.deepEqual(freq[2], {percent: 10, frequency: 0});
      assert.deepEqual(freq[3], {percent: 15, frequency: 0});
      assert.deepEqual(freq[4], {percent: 20, frequency: 0});
      assert.deepEqual(freq[5], {percent: 25, frequency: 0});
      assert.deepEqual(freq[6], {percent: 30, frequency: 0});
      assert.deepEqual(freq[7], {percent: 35, frequency: 0});
      assert.deepEqual(freq[8], {percent: 40, frequency: 0});
      assert.deepEqual(freq[9], {percent: 45, frequency: 0});
      assert.deepEqual(freq[10], {percent: 50, frequency: 0});
      assert.deepEqual(freq[11], {percent: 55, frequency: 0});
      assert.deepEqual(freq[12], {percent: 60, frequency: 0});
      assert.deepEqual(freq[13], {percent: 65, frequency: 0});
      assert.deepEqual(freq[14], {percent: 70, frequency: 0});
      assert.deepEqual(freq[15], {percent: 75, frequency: 0});
      assert.deepEqual(freq[16], {percent: 80, frequency: 0});
      assert.deepEqual(freq[17], {percent: 85, frequency: 0});
      assert.deepEqual(freq[18], {percent: 90, frequency: 0});
      assert.deepEqual(freq[19], {percent: 95, frequency: 0});
      assert.deepEqual(freq[20], {percent: 100, frequency: 0.5});
  });
});