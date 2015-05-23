/// <reference path="references.ts"/>
class Index {

  public instance = {};
  public addMarker;
  public crossfilter = require('crossfilter');

  constructor(options, cb) {

    this.instance = {good: 'instance'};
    this.addMarker = new AddMarker().add;

    console.log('creates a map! with options %s', options, this.instance);
    cb();

  }
}

// Node
module.exports = Index;
