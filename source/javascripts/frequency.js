module.exports = function frequency(population) {
  let buckets = {};

  for (let i = 0; i < 21; i++) {
    buckets[i] = 0;
  }

  // bars represent 5% saturation increase
  population.forEach( function(n) { buckets[Math.round(n / 12.75)]++ });

  result = [];

  for (key in buckets) {
    let obj = {};
    obj["percent"] = key * 5;
    obj["frequency"] = buckets[key] / population.length;
    result.push(obj);
  }

  return result;
}
