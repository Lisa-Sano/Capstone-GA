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
  var canRun = true;

  drawChromosomes();
  scatter.initPlot();

  initializeSim();

  // render starting population in the SVG/canvas
  drawD3(starting, mySim.population, config);

  $("#start").click(function() {
    showStop();

    var n = 10;
    var i = 0;
    var text = $('.gen').text();

    // simulate 10 gens every 250ms
    var interval = setInterval(function() {
      if (i < num_gens && canRun) {
          mySim.runSimulation(n);
          drawD3(starting, mySim.population, config);
          $(".gen").html(parseInt(text) + i+10);
      } else {
        clearInterval(interval);
        canRun = true;
        showStart();
      }
      i += 10;
    }, 250);
  });

  $('#stop').on('click', function() {
    canRun = false;
    showStart();
  });

  $('#myForm :input, .radio').on('click change', function() {
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

  $('#reset').on('click', function() {
    $('#stop').click();
    resetSim();
  });

  $("#back-to-top").click(function (event){
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $("h1").offset().top - 120
      }, 300);
  });

  $("#nav-sim").click(function (event){
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $("#simulation").offset().top - 90
      }, 300);
  });

  $("#nav-history").click(function (event){
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $("#moth-history").offset().top - 90
      }, 300);
  });

  $("#nav-how").click(function (event){
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $("#how-it-works").offset().top - 90
      }, 300);
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
      document.getElementById("container-for-3d").style.display = "none";
      document.getElementById("chart-container").style.display = "";

      chart.drawChart(starting, frequency(chrom_vals), Math.round(config.env["grey"]/12.75)*5);
      graphic.drawGraphic(chrom_vals, [config.env["grey"],config.env["grey"],config.env["grey"]]);
    } else {
      $('.legend').remove();
      document.getElementById("container-for-3d").style.display = "";
      document.getElementById("chart-container").style.display = "none";

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

  function showStop() {
    document.getElementById('start').style.display = "none";
    document.getElementById('stop').style.display = "inline-block";
  }

  function showStart() {
    document.getElementById('start').style.display = "";
    document.getElementById('stop').style.display = "none";
  }
});

