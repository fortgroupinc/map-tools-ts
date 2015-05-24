/// <reference path="references.ts"/>
class Index {

  public instance = {};
  public addMarker;
  public locate;
  public crossfilter = require('crossfilter');

  constructor(options, cb) {

    this.instance = {good: 'instance'};
    this.addMarker = new AddMarker().add;

    this.locate = new Locate().locate;

    var map = new AddMap(this);

    map.load(options, cb);
  }
}

// Node
module.exports = Index;
