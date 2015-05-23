describe('Given the Utils Module', function () {

  var config;
  beforeEach(function() {

    config = require('config');
  });

  it('should have a version number', function () {
    expect(config.version).to.be.a('string');
  });

});
