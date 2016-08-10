var Moth = function(obj={}) {
  // binary chrom length of 8 - possible values up to 255
  this.chrom_length = 8,

  // can be initialized with an existing chromosome or randomly generated
  this.chromosome = obj.chrom || randChromosome(this.chrom_length),

  // parseInt(bin, 2) to turn a binary string back into a number
  this.value = parseInt(this.chromosome, 2)

  function randChromosome(length) {
    var num = Math.floor(Math.random() * 256) + 1 ;
    return lpad(num.toString(2), "0", length);
  }
}

// add 0's to the left so that each chromosome is the same chromosome length
function lpad(string, pad, length) {
    var str = string;
    while (str.length < length)
        str = pad + str;
    return str;
}

module.exports = Moth;
