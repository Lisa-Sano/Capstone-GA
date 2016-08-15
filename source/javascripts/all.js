var Simulation = require('./simulate');
var Chart = require('./barChart');
var Graphic = require('./main');
var frequency = require('./frequency');
var Moth = require('./moth');
var Matchmaker = require('./matchmaker');

const MAX_ENV = 255;
const POP_SIZE = 500;
const MUTATION_RATE = 0.00005;
const NUM_GENS = 1000;

$(document).ready(function() {
  var env;
  var config;
  var mySim;
  var starting;
  var graphic = new Graphic();
  var chart = new Chart();

  initializeSim();

  drawD3(starting, mySim.population, config);

  $("#start").click(function() {
    var n = 10;

    for (let i = 0; i < NUM_GENS; i += n) {

      // simulate 10 gens every 250ms
      (function (n, i) {
        setTimeout(function() {
          mySim.runSimulation(n);
          drawD3(starting, mySim.population, config);
          $(".gen").html(i+10);
        }, (i * 25));
      }) (n, i);

    }
  });

  $("#reset, .radio").click(function() {
    $(".gchart").remove();
    $(".env").remove();

    initializeSim();

    drawD3(starting, mySim.population, config);
  });


  function makeConfig(obj={}) {
    var config = {
      max_env: MAX_ENV,
      population_size: POP_SIZE,
      mutation_rate: MUTATION_RATE,
      moth: obj.moth || Moth,
      matchmaker: obj.matchmaker || Matchmaker
    }

    if ($('input[id=uniform]:checked').length > 0) {
      config.uniform = true;
      config.env = 20;
    } else {
      config.uniform = false;
      config.env = Math.floor(Math.random() * (255 + 1));
    }

    return config;
  }

  function drawD3(starting, pop, config) {
    let chrom_vals = getChromVals(mySim.population);
    chart.drawChart(starting, frequency(chrom_vals), Math.round(config.env/12.75)*5);
    graphic.drawGraphic(chrom_vals, config.env);
  }

  function initializeSim() {
    config = makeConfig();
    mySim = new Simulation(config);
    starting = frequency(getChromVals(mySim.population));
  }


  function getChromVals(population) {
    return population.map(function(m) {
      return m.value;
    });
  }
});

