var Moth = function(obj={}) {
  this.chrom_length = 8,
  this.chromosome = obj.chrom || randChromosome()

  function randChromosome() {
    var num = Math.floor(Math.random() * 256) + 1 ;
    return lpad(num.toString(2), "0", 8);
  }
}

function lpad(string, pad, length) {
    var str = string;
    while (str.length < length)
        str = pad + str;
    return str;
}

module.exports = Moth;

// parseInt(bin, 2) to turn a binary string back into a number