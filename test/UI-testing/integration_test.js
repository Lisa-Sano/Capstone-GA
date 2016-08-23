var assert = require('assert'),     
    fs = require('fs'),     
    test = require('selenium-webdriver/testing'),     
    webdriver = require('selenium-webdriver');

require('chai').should();

describe('Evolution in Color', function() {
  this.timeout(5000);
  var driver;

  before(function() {
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  });

  // test.it('Page should return success', function(){     
  //   driver.get('http://localhost:4567'); 
  //   driver.findElement(webdriver.By.id('color').click());
  //   // driver.findElement(webdriver.By.name('name')).sendKeys('Glenn Taylor');
  //   // driver.findElement(webdriver.By.name('email')).sendKeys('glenn@glenntaylor.co.uk');
  //   // driver.findElement(webdriver.By.name('message')).sendKeys('This is a test message!');
  //   // driver.findElement(webdriver.By.className('contact-form')).submit();
  //   driver.wait(function() {
  //       return driver.isElementPresent(webdriver.By.className('success-flash'));
  //   }, 3000);
  // });

  describe('My site', function() {
    it('should return success', function() {
      driver.get('http://localhost:4567');
        // .then(done()));
    });

    it('should have the title "Evolution in Color"', function() {
      driver.getTitle().then(function(title) { title.should.equal('Evolution in Color')});
    });

    it('should have a canvas element', function(done) {
      driver.findElement(webdriver.By.tagName('canvas'))
      .then(function() { done(); });
    });
  });


  after(function() {
    driver.quit();
  });
});