var Moth = function(obj={}) {
  // binary chrom length of 8 - possible values up to 255
  this.chrom_length = 8;

  this.types = obj.chromosome_types;

  // can be initialized with an existing chromosome or randomly generated
  this.chromosome = obj.chromosome || randChromosome(8, this.types);

  // parseInt(bin, 2) to turn a binary string back into a number
  this.value = getValue(this.chromosome);
}

function getValue(chromosome_obj) {
    var values = {};

    for (var chrom in chromosome_obj) {
      values[chrom] = parseInt(chromosome_obj[chrom], 2);
    }

    return values;
};

function randChromosome(length, chrom_types) {
  var num;
  var chrom = {};

  for (let type of chrom_types) {
    num = Math.floor(Math.random() * 256) + 1;
    chrom[type] = lpad(num.toString(2), "0", length);
  }

  return chrom;
}

// add 0's to the left so that each chromosome is the same chromosome length
function lpad(string, pad, length) {
    var str = string;
    while (str.length < length)
        str = pad + str;
    return str;
}

module.exports = Moth;
