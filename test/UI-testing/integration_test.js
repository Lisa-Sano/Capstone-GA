var assert = require('assert'),     
    fs = require('fs'),     
    test = require('selenium-webdriver/testing'),     
    webdriver = require('selenium-webdriver');

require('chai').should();

test.describe('Evolution in Color', function() {
  this.timeout(3000);
  var driver;

  test.before(function() {
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  });

  it('should return success', function() {
    driver.get('http://localhost:4567');
  });

  it('should have the title "Evolution in Color"', function(done) {
    driver.getTitle()
      .then(function(title) {
        title.should.equal('Evolution in Color');
        done();
    });
  });

  it('should have a canvas element', function(done) {
    driver.findElement(webdriver.By.tagName('canvas'))
    .then(function(canvas) { done() });
  });

  it('should have 1 radio button with id color', function(done) {
    driver.findElements(webdriver.By.id("color"))
      .then(function(color) { 
        color.length.should.equal(1);
    });

    driver.findElement(webdriver.By.id("color")).getAttribute("type")
      .then(function(type) {
        type.should.equal("radio");
        done();
    });
  });

  it('should have 1 radio button with id black-white', function(done) {
    driver.findElements(webdriver.By.id("black-white"))
      .then(function(black_white) { 
        black_white.length.should.equal(1);
    });

    driver.findElement(webdriver.By.id("black-white")).getAttribute("type")
      .then(function(type) {
        type.should.equal("radio");
        done();
    });
  });

  it('should have an element with id main-graphic', function(done) {
    driver.findElement(webdriver.By.className("main-graphic"))
      .then(function() { done() });
  });

  test.describe('Chart displays', function() {
    it('bar chart should be hidden when the color radio button is active', function(done) {
      driver.findElement(webdriver.By.id("color")).click();

      driver.wait(function() {
        return driver.findElement(webdriver.By.id("container-for-3d")).isDisplayed();
      }, 1000);

      driver.findElement(webdriver.By.id('chart-container')).getAttribute("style")
        .then(function(style) {
          style.should.equal("display: none;");
          done();
        });
    });

    it('3D scatter plot should be visible when the color radio button is active', function(done) {
      driver.findElement(webdriver.By.id("color")).click();

      driver.wait(function() {
        return driver.findElement(webdriver.By.id("container-for-3d")).isDisplayed();
      }, 1000);

      driver.findElement(webdriver.By.id("container-for-3d")).isDisplayed()
        .then(function(div) {
          done();
        });
    });

    it('bar chart should be visible when the black-white radio button is active', function(done) {
      driver.findElement(webdriver.By.id("black-white")).click();

      driver.wait(function() {
        return driver.findElement(webdriver.By.id("chart-container")).isDisplayed();
      }, 1000);

      driver.findElement(webdriver.By.id('chart-container')).isDisplayed()
        .then(function() { done() });
    });

    it('3D scatter plot should be hidden when the black-white radio button is active', function(done) {
      driver.findElement(webdriver.By.id("black-white")).click();

      driver.wait(function() {
        return driver.findElement(webdriver.By.id("chart-container")).isDisplayed();
      }, 1000);

      driver.findElement(webdriver.By.id('container-for-3d')).getAttribute("style")
        .then(function(style) {
          style.should.equal("display: none;");
          done();
        })
    });
  });

  test.describe('Generation counter', function() {
    it('should start at generation 0', function(done) {
      driver.findElement(webdriver.By.className('gen')).getAttribute('innerHTML')
        .then(function(gen) {
          parseInt(gen).should.equal(0);
          done();
        });
    });

    it('should increase when a simulation is started', function(done) {
      driver.findElement(webdriver.By.id('start')).click();

      driver.wait(function() {
        return driver.findElement(webdriver.By.className('gen')).getAttribute("innerHTML")
          .then(function(text) {
            if (text === '10') {
              return true;
            }
          });
      }, 1000)

      driver.findElement(webdriver.By.className('gen')).getAttribute('innerHTML')
        .then(function(gen) {
          parseInt(gen).should.be.above(0);
          done();
        });
    });


    it('should reset to 0 when the reset button is clicked', function(done) {
      driver.findElement(webdriver.By.className('gen')).getAttribute('innerHTML')
        .then(function(gen) {
          parseInt(gen).should.be.above(0);
        });

      driver.findElement(webdriver.By.id('reset')).click();

      driver.findElement(webdriver.By.className('gen')).getAttribute('innerHTML')
        .then(function(gen) {
          parseInt(gen).should.equal(0);
          done();
        });
    });
  });

  test.describe('Scenarios', function() {
    it('the first scenario button is selected by default', function(done) {
      driver.findElement(webdriver.By.id("uniform")).isSelected()
        .then(function(val) {
          val.should.equal(true);
        });

      driver.findElement(webdriver.By.id("random")).isSelected()
        .then(function(val) {
          val.should.equal(false);
        });

      driver.findElement(webdriver.By.id("black-white")).isSelected()
        .then(function(val) {
          val.should.equal(true);
        });

      driver.findElement(webdriver.By.id("color")).isSelected()
        .then(function(val) {
          val.should.equal(false);
        });

      driver.findElement(webdriver.By.id("mut-rate")).getAttribute("value")
        .then(function(val) {
          val.should.equal('0.0002');
        });

      driver.findElement(webdriver.By.id("num-gens")).getAttribute("value")
        .then(function(val) {
          val.should.equal('300');
        });

      driver.findElement(webdriver.By.id("pop-size")).getAttribute("value")
        .then(function(val) {
          val.should.equal('500');
        });

      driver.findElement(webdriver.By.id("fitness")).getAttribute("value")
        .then(function(val) {
          val.should.equal('0.2');
        });

      driver.findElement(webdriver.By.id("scenario-a")).getAttribute("style")
        .then(function(style) {
          style.should.equal("border: transparent; background-color: rgb(170, 170, 170);")
          done();
        });
    });

    it('settings are updated when the second scenario button is clicked', function(done) {
      driver.findElement(webdriver.By.id("scenario-b")).click();

      driver.findElement(webdriver.By.id("uniform")).isSelected()
        .then(function(val) {
          val.should.equal(true);
        });

      driver.findElement(webdriver.By.id("random")).isSelected()
        .then(function(val) {
          val.should.equal(false);
        });

      driver.findElement(webdriver.By.id("black-white")).isSelected()
        .then(function(val) {
          val.should.equal(true);
        });

      driver.findElement(webdriver.By.id("color")).isSelected()
        .then(function(val) {
          val.should.equal(false);
        });

      driver.findElement(webdriver.By.id("num-gens")).getAttribute("value")
        .then(function(val) {
          val.should.equal('200');
        });

      driver.findElement(webdriver.By.id("pop-size")).getAttribute("value")
        .then(function(val) {
          val.should.equal('500');
        });

      driver.findElement(webdriver.By.id("fitness")).getAttribute("value")
        .then(function(val) {
          val.should.equal('0.2');
        });

      driver.findElement(webdriver.By.id("mut-rate")).getAttribute("value")
        .then(function(val) {
          val.should.equal('0');
          done();
        });
    });

    it('settings are updated when the third scenario button is clicked', function(done) {
      driver.findElement(webdriver.By.id("scenario-c")).click();

      driver.findElement(webdriver.By.id("uniform")).isSelected()
        .then(function(val) {
          val.should.equal(false);
        });

      driver.findElement(webdriver.By.id("random")).isSelected()
        .then(function(val) {
          val.should.equal(true);
        });

      driver.findElement(webdriver.By.id("black-white")).isSelected()
        .then(function(val) {
          val.should.equal(true);
        });

      driver.findElement(webdriver.By.id("color")).isSelected()
        .then(function(val) {
          val.should.equal(false);
        });

      driver.findElement(webdriver.By.id("num-gens")).getAttribute("value")
        .then(function(val) {
          val.should.equal('300');
        });

      driver.findElement(webdriver.By.id("pop-size")).getAttribute("value")
        .then(function(val) {
          val.should.equal('500');
        });

      driver.findElement(webdriver.By.id("fitness")).getAttribute("value")
        .then(function(val) {
          val.should.equal('0.35');
        });

      driver.findElement(webdriver.By.id("mut-rate")).getAttribute("value")
        .then(function(val) {
          val.should.equal('0.0001');
          done();
        });
    });

    it('settings are updated when the fifth scenario button is clicked', function(done) {
      driver.findElement(webdriver.By.id("scenario-e")).click();

      driver.findElement(webdriver.By.id("uniform")).isSelected()
        .then(function(val) {
          val.should.equal(false);
        });

      driver.findElement(webdriver.By.id("random")).isSelected()
        .then(function(val) {
          val.should.equal(true);
        });

      driver.findElement(webdriver.By.id("black-white")).isSelected()
        .then(function(val) {
          val.should.equal(false);
        });

      driver.findElement(webdriver.By.id("color")).isSelected()
        .then(function(val) {
          val.should.equal(true);
        });

      driver.findElement(webdriver.By.id("num-gens")).getAttribute("value")
        .then(function(val) {
          val.should.equal('500');
        });

      driver.findElement(webdriver.By.id("pop-size")).getAttribute("value")
        .then(function(val) {
          val.should.equal('500');
        });

      driver.findElement(webdriver.By.id("fitness")).getAttribute("value")
        .then(function(val) {
          val.should.equal('0');
        });

      driver.findElement(webdriver.By.id("mut-rate")).getAttribute("value")
        .then(function(val) {
          val.should.equal('0.0001');
          done();
        });
    });

    it('settings are updated when the fourth scenario button is clicked', function(done) {
      driver.findElement(webdriver.By.id("scenario-d")).click();

      driver.findElement(webdriver.By.id("uniform")).isSelected()
        .then(function(val) {
          val.should.equal(false);
        });

      driver.findElement(webdriver.By.id("random")).isSelected()
        .then(function(val) {
          val.should.equal(true);
        });

      driver.findElement(webdriver.By.id("black-white")).isSelected()
        .then(function(val) {
          val.should.equal(false);
        });

      driver.findElement(webdriver.By.id("color")).isSelected()
        .then(function(val) {
          val.should.equal(true);
        });

      driver.findElement(webdriver.By.id("num-gens")).getAttribute("value")
        .then(function(val) {
          val.should.equal('300');
        });

      driver.findElement(webdriver.By.id("pop-size")).getAttribute("value")
        .then(function(val) {
          val.should.equal('500');
        });

      driver.findElement(webdriver.By.id("fitness")).getAttribute("value")
        .then(function(val) {
          val.should.equal('0.35');
        });

      driver.findElement(webdriver.By.id("mut-rate")).getAttribute("value")
        .then(function(val) {
          val.should.equal('0.0001');
          done();
        });
    });
  });

  test.after(function() {
    driver.quit();
  });
});
