describe('Given the Maps module', function () {

  var maps;

  beforeEach(function () {
    maps = require('maps');
  });

  it('should you load a map', function() {
    var response = maps.load('myId', {});
    expect(response.src).to.equal('//maps.googleapis.com/maps/api/js?v=3.18&callback=mapTools.maps.myId.create');
    expect(response.type).to.equal('text/javascript');
  });

});
