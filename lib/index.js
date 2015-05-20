var mapTools;
(function (mapTools) {
    var addMarker = (function () {
        function addMarker() {
        }
        addMarker.addMarker = function () {
            console.log('add a Marker');
        };
        return addMarker;
    })();
    mapTools.addMarker = addMarker;
})(mapTools || (mapTools = {}));
var mapTools;
(function (mapTools) {
    var createMap = (function () {
        function createMap(options, cb) {
            console.log('creates a map');
        }
        return createMap;
    })();
    mapTools.createMap = createMap;
})(mapTools || (mapTools = {}));
var MT = mapTools.createMap;
MT.prototype.addMarker = mapTools.addMarker.addMarker;
/// <reference path="createMap.ts"/>
/// <reference path="index.ts"/>
/// <reference path="addMarker.ts"/>
