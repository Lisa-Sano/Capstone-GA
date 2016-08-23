var assert = require('assert'),     
    fs = require('fs'),     
    // test = require('selenium-webdriver/testing'),     
    webdriver = require('selenium-webdriver');

require('chai').should();

describe('Evolution in Color', function() {
  this.timeout(5000);
  var driver;

  before(function() {
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  });

  it('should return success', function() {
    driver.get('http://localhost:4567');
  });

  it('should have a canvas element', function(done) {
    driver.findElement(webdriver.By.tagName('canvas'))
    .then(function(canvas) { done() });
  });

    it('should have 1 (radio) button with id color', function(done) {
      driver.findElements(webdriver.By.id("color"))
        .then(function(color) { 
          color.length.should.equal(1);
          done();
        });
    });

    it('should have 1 (radio) button with id black-white', function(done) {
      driver.findElements(webdriver.By.id("black-white"))
        .then(function(color) { 
          color.length.should.equal(1);
          done();
        });
    });

  describe('Chart displays', function() {
    it('bar chart should be hidden when the color radio button is active', function(done) {
      driver.findElement(webdriver.By.id("color")).click();

      driver.findElement(webdriver.By.id('chart')).getAttribute("style")
        .then(function(style) {
          style.should.equal("display: none;");
          done();
        });
    });

    it('3D scatter plot should be visible when the color radio button is active', function(done) {
      driver.findElement(webdriver.By.id("color")).click();

      driver.findElement(webdriver.By.id('container3d')).getAttribute("style")
        .then(function(style) {
          style.should.equal("display: initial;");
          done();
        })
    });

    it('bar chart should be visible when the black-white radio button is active', function(done) {
      driver.findElement(webdriver.By.id("black-white")).click();

      driver.findElement(webdriver.By.id('chart')).getAttribute("style")
        .then(function(style) {
          style.should.equal("display: initial;");
          done();
        });
    });

    it('3D scatter plot should be hidden when the black-white radio button is active', function(done) {
      driver.findElement(webdriver.By.id("black-white")).click();

      driver.findElement(webdriver.By.id('container3d')).getAttribute("style")
        .then(function(style) {
          style.should.equal("display: none;");
          done();
        })
    });
  });

  it('should have the title "Evolution in Color"', function(done) {
    driver.getTitle()
      .then(function(title) {
        title.should.equal('Evolution in Color');
        done();
    });
  });

  after(function() {
    driver.quit();
  });
});