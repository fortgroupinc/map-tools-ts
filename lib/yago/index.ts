/// <reference path="references.ts"/>
module _mapTools {
    export var crossfilter = require('crossfilter');
}


class mapTools extends _mapTools.createMap {
  public crossfilter = _mapTools.crossfilter;
  public addMarker = _mapTools.addMarker.addMarker
}

// Node

module.exports = mapTools;
