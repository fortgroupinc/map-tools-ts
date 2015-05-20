var mapTools;

(function(mapTools) {


  mapTools = function(options, cb) {

    this.createMap(options, cb);
  };


  // Make this a Static TypeScript Class
  mapTools.prototype.createMap = function(options, cb) {
    console.log('create map code');

    this.instance = {};

    // async
    cb(false, this.instance);

  };

  // Can this code be into a separated file?
  mapTools.prototype.addMarker = function() {
    console.log('code to add Marker');
    // required access to: this.instance
  };


})(mapTools);


// Syntax to create a Map

// var map = new mapTools({lat: 41, lng: 1}, function(err, map) {
//  map.addMarker({})
// });

