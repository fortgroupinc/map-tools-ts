describe('Given the Utils Module', function () {

  var config;
  beforeEach(function() {
    config = require('config.ts').mapTools.Config;
  });

  it('should have a version number', function () {
    expect(config.version).to.be.a('string');
  });

});
