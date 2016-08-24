module.exports = function (population) {
  let buckets = {};

  for (let i = 0; i < 21; i++) {
    buckets[i] = 0;
  }

  // bars represent 5% increase in white
  population.forEach( function(n) { buckets[Math.round(n[0] / 12.75)]++ });

  let result = [];

  for (let key in buckets) {
    let obj = {};
    obj["percent"] = key * 5;
    obj["frequency"] = buckets[key] / population.length;
    result.push(obj);
  }

  return result;
}
