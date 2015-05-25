/// <reference path="references.ts"/>
class Index {

  public instance;

  public addMarker;
  public addTopoJson;
  public addGeoJson;

  public locate;
  public crossfilter = require('crossfilter');

  constructor(options, cb) {
    var addMarker = new AddMarker(this);

    this.addMarker = function(marker, options) {
      return addMarker.addMarker(marker, options);
    };


    var addFeature = new AddFeature(this);

    this.addTopoJson = function(data, options) {
      return addFeature.addTopoJson(data, options);
    };

    this.addGeoJson = function(data, options) {
      return addFeature.addGeoJson(data, options);
    };

    this.locate = new Locate().locate;

    var map = new AddMap(this);
    map.load(options, cb);
  }
}

// Node
module.exports = Index;
