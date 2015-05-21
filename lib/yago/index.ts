/// <reference path="references.ts"/>
module _mapTools {

    export var crossfilter = require('crossfilter');
}

// To expose:
var mapTools = _mapTools.createMap;
mapTools.prototype.addMarker = _mapTools.addMarker;


