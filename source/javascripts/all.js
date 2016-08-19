var Simulation = require('./simulate');
var Chart = require('./barChart');
var Graphic = require('./main');
var frequency = require('./frequency');
var Moth = require('./moth');
var Matchmaker = require('./matchmaker');
var drawChromosomes = require('./chromosome');
var ScatterPlot = require('./scatter3D');

const MAX_ENV = 255;

$(document).ready(function() {
  var num_gens = $('#num-gens').val();
  var env;
  var config;
  var mySim;
  var starting;
  var graphic = new Graphic();
  var chart = new Chart();
  var scatter = new ScatterPlot();

  drawChromosomes();
  scatter.initPlot();

  initializeSim();

  // render starting population in the SVG/canvas
  drawD3(starting, mySim.population, config);

  $("#start").click(function() {
    var n = 10;
    var text = $('.gen').text();


    for (let i = 0; i < num_gens; i += n) {

      // simulate 10 gens every 250ms
      (function (n, i) {
        setTimeout(function() {
          mySim.runSimulation(n);
          drawD3(starting, mySim.population, config);
          $(".gen").html(parseInt(text) + i+10);
        }, (i * 25));
      }) (n, i);

    }
  });

  $('#reset, #myForm :input, .radio').on('click', function() {
    // get all the inputs into an array
    var $inputs = $('#myForm :input');
    var values = {};

    // adjust settings according to the form data
    $inputs.each(function() {
        $(this.name).val($(this).val());
    });

    // set the number of generations to form input value
    num_gens = $('#num-gens').val();

    resetSim();
  });

  $('#myForm').keypress(function(e){
    if (e.which == 13) { //Enter key pressed
        $('#reset').click(); //Trigger reset button click event
    }
  });

  function resetSim() {
    $(".gchart").remove();
    $(".env").remove();
    $(".gen").html('0');

    initializeSim();

    drawD3(starting, mySim.population, config);
  }

  function makeConfig(obj={}) {
    var blackAndWhite = ["grey"];
    var color = ["red", "green", "blue"];
    var config = {
      max_env: MAX_ENV,
      population_size: $('#pop-size').val(),
      mutation_rate: $('#mut-rate').val(),
      fitness_advantage: $('#fitness').val(),
      moth: obj.moth || Moth,
      moth_type: ($('input[id=color]:checked').length > 0) ? color : blackAndWhite,
      matchmaker: obj.matchmaker || Matchmaker
    }

    if ($('input[id=uniform]:checked').length > 0) {
      config.uniform = true;
      config.env = (config.moth_type === color
                  ? { red: 165, green: 222, blue: 230 }
                  : { grey: 20 });
    } else {
      config.uniform = false;
      config.env = (config.moth_type === color
                  ? { red: randomNum(), green: randomNum(), blue: randomNum()}
                  : { grey: randomNum() });
    }

    return config;
  }

  function randomNum() {
    return Math.floor(Math.random() * (255 + 1));
  }

  function drawD3(starting, pop, config) {
    let chrom_vals = getChromVals(mySim.population);

    if (config.moth_type[0] === "grey") {
      // show only the bar chart or the 3D scatter plot, depending on color mode
      document.getElementById("container3d").style.display = "none";
      document.getElementById("chart").style.display = "initial";

      chart.drawChart(starting, frequency(chrom_vals), Math.round(config.env["grey"]/12.75)*5);
      graphic.drawGraphic(chrom_vals, [config.env["grey"],config.env["grey"],config.env["grey"]]);
    } else {
      $('.legend').remove();
      document.getElementById("container3d").style.display = "initial";
      document.getElementById("chart").style.display = "none";

      scatter.drawPlot(getChromVals(pop));
      graphic.drawGraphic(chrom_vals, [config.env["red"],config.env["green"],config.env["blue"]]);
    }
  }

  function initializeSim() {
    config = makeConfig();
    mySim = new Simulation(config);
    starting = frequency(getChromVals(mySim.population));
  }

  function getChromVals(population) {
    // return array of arrays. inner array contains numerical chromosome values
    // for either a single grey chromosome, or for red, green, blue chromosomes
    return population.map(function(m) {
      let a = [];
      if (Object.keys(m.value).length === 1) {
        a = [m.value["grey"], m.value["grey"], m.value["grey"]];
      } else {
        for (let type in m.value) {
          a.push(m.value[type]);
        }
      }
      return a;
    });
  }
});

