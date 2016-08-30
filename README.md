# Evolution in Color
Exploring genetic algorithms and data visualization

### What is the product?
An educational tool for anyone interested in learning about genetics and evolution, and how they can be modeled using programming. It will familiarize users with the concept of natural selection (a process where individuals that are better suited to a particular environment tend to survive better and produce more offspring).

This tool will simulate the classic example of color variation in [peppered moths during the Industrial Revolution](https://en.wikipedia.org/wiki/Peppered_moth_evolution). In short, white moths were abundant (and dark moths were unknown) in a particular area at the beginning of the 19th century. These moths lived in light-colored trees covered in light-colored lichen. When the Industrial Revolution happened and the air became smoky and polluted, the environment changed and the trees became dark and bare, which led to an increase in predation of the white moths by birds. By the end of the 19th century, 98% of the moths were black. This tool will demonstrate how the population color was able to adapt so quickly to the environment using a genetic algorithm. 

### What is a genetic algorithm?
A [Genetic Algorithm](https://en.wikipedia.org/wiki/Genetic_algorithm) (GA) is modeled after the process of natural selection, and it's used for optimization and search problems. It begins by using a randomly generated population of individuals with varying characteristics ('chromosomes'), each of which represents a potential solution to a problem. With each generation, the fitness of each individual is calculated using a [fitness function](https://en.wikipedia.org/wiki/Fitness_function), and a weighted sampling (based on fitness score) is taken to create a population of new individuals (children). Each new child has a chromosome which is a random combination of its parents' chromosomes, with the potential for mutations to occur in any part of the chromosome. This scoring/sampling/recombination/mutation is repeated either until a specific number of generations has passed, or until a minimum set of criteria is reached.
[Genetic Algorithms can be used for cool things!](https://en.wikipedia.org/wiki/List_of_genetic_algorithm_applications)

### Market Research
##### What is the competition?
  * [PopG](http://evolution.gs.washington.edu/popgen/popg.html) is a simulation program for use by students to learn the effects of natural selection, mutation, migration, and genetic drift.  Input fields include population size, mutation rates, migration rates between populations, fitness rates of different potential genotypes, and number of generations.  Output is in graphical format.  It requires a student account, granted by an instructor.

  * [Mendel's Accountant](http://mendelsaccount.sourceforge.net/screenshots.html) is another simulator that allows for input of things like mutation rate, dominance, mating characteristics, average fertility, heritability, chromosome number, genome size, population size/sub-structure, and number of generations. It outputs data in both tabular and graphical format.  It's currently available for Windows and Linux systems.

##### What makes this product different?
  Many of the existing products assume and require knowledge of biology and genetics to set up a run. They're aimed toward people who are currently in university biology courses and already understand the basics (and, like PopG, may require a student account to be set up by a course instructor). They must be downloaded and run in particular environments instead of being completely web-based.

  This product will be much simpler and can be used by those who are unfamiliar with genetics.  It will be web-based and free for anyone to use without creating an account.  It will have certain customizable inputs, but it will be set up with a default state that can be run without any initial changes.

  Its output will be more visual than the competition, showing SVGs displaying the actual colors of the moths compared to their environment (allowing users to determine at a glance how well camouflaged the moths are throughout the simulation). It will also include graphical data representing color frequencies and clustering of the starting and ending populations once the run is complete.

### User Personas
##### The main user will probably be me
...because I think GA's are rad and I want to explore how they can model natural selection in a visual way
##### Students learning about evolutionary genetics
In my genetics class at UW, we used a simulator created by the professor that was similar to the competition listed above. It had several input fields, and its output was a single graph showing the population's gene frequency over time. It made its point, but it wasn't pretty or fun to use. This product will be both!
##### Programmers interested in GA's
I didn't know GA's were a thing until recently, and there are probably a lot of programmers who have never encountered them before. Maybe this simple example will inspire them to explore what GA's can do too!

### Tech features
* Visualization tools: [Three.js](http://threejs.org/), [D3.js](https://d3js.org/)
* Static-site framework: [Middleman](https://middlemanapp.com/)
* Deployment: [PubStorm](https://www.pubstorm.com/)
* Genetic Algorithm (my main motivation for doing this project is to explore this algorithm, which I think is SO DAMN COOL!)
* Testing: [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), [Selenium WebDriver](http://docs.seleniumhq.org/docs/03_webdriver.jsp), [Sinon](http://sinonjs.org/), [Istanbul](https://github.com/gotwarlost/istanbul)

### How to run on your machine
After cloning this project, you'll need the following installed:

* ruby (v2.3.1)
* node/npm
* bundler gem
* chromedriver (for running integration tests in Chrome. See http://brewformulas.org/Chromedriver to install)

Then, run the following commands in the root folder:

    bundle

    npm install  

To run a local server (port 4567):

    middleman server


Integration tests (using Selenium WebDriver) can be run from the root folder with:

    mocha test/UI-testing/integration_test.js


Unit tests (using Mocha, Chai, and Sinon) can be run from the root folder with:

    npm test


A coverage report (using Istanbul) can be generated and then opened with:

    npm run coverage
    open coverage/lcov-report/*.html
