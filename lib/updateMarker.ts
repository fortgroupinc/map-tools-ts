/// <reference path="typings/tsd.d.ts"/>
/// <reference path="Utils.ts"/>
/// <reference path="Config.ts"/>
/// <reference path="findMarkerById.ts"/>
/// <reference path="filter.ts"/>


class UpdateMarker {


  findMarker;

  constructor(public that) {

    var findMarker = new FindMarkerById(that);

    this.findMarker = function(marker) {
      return findMarker.find(marker);
    }
  }

  removeTags(marker) {
    if (Utils.isArray(marker.tags)) {
      var i, tag;
      for (i in marker.tags) {
        if (marker.tags.hasOwnProperty(i)) {
          tag = marker.tags[i];
          delete this.that.markers.tags[tag][marker.data.uid];

        }
      }
    } else {
      delete this.that.markers.tags[marker.tags][marker.data.uid];
    }

  }

  addTags(marker, options) {

    if (Utils.isArray(options.custom.tags)) {
      var i, tag;
      for (i in options.custom.tags) {
        tag = options.custom.tags[i];
        this.that.markers.tags[tag] = this.that.markers.tags[tag] || {};
        this.that.markers.tags[tag][marker.data.uid] = marker;
      }

    } else {
      this.that.markers.tags[options.custom.tags] = this.that.markers.tags[options.custom.tags] || {};
      this.that.markers.tags[options.custom.tags][marker.data.uid] = marker;
    }

    marker.tags = options.custom.tags;
  }

  updateTag(marker, options) {
    this.removeTags(marker);
    this.addTags(marker, options);
  }

  public customUpdate(marker, options) {

    if (options.custom) {
      if (options.custom.move) {
        marker.setAnimation(google.maps.Animation[options.custom.move.toUpperCase()]);
      }

      if (options.custom.lat && options.custom.lng) {
        marker.setPosition(new google.maps.LatLng(options.custom.lat, options.custom.lng));
      }

      if (options.custom.infoWindow && options.custom.infoWindow.content) {
        marker.infoWindow.content = options.custom.infoWindow.content;
      }

      if (options.custom.tags) {
        this.updateTag(marker, options);
      }

    }

    if (options.defaults) {
      marker.setOptions(options.defaults);
    }

    return marker;
  }

  bulkUpdate(args, options) {

    var marker, results = [], instance, x;
    for (x in args) {
      if (args.hasOwnProperty(x)) {
        marker = args[x];
        instance = this.customUpdate(this.findMarker(marker), options);
        results.push(instance);
      }
    }

    return results;

  }

  countVisible() {

    var x, count = 0;

    for (x in this.that.markers.all) {
      if (this.that.markers.all[x].visible) {
        count++;
      }
    }

    google.maps.event.trigger(this.that.instance, 'marker_visibility_changed', count);
  }

  public update(args, options) {

    var visibilityFlag = false;
    var preparedOptions = Utils.prepareOptions(options, Config.customMarkerOptions);
    if (preparedOptions.defaults && preparedOptions.defaults.hasOwnProperty('visible') && this.that.events.indexOf('marker_visibility_changed') > -1) {
      visibilityFlag = true;
    }


    var result;
    var type = Object.prototype.toString.call(args);

    if (type === '[object Object]') {
      if (Object.keys(args).length === 1 && args.tags) {

        var filter = new Filter(this.that, 'markers');

        result = this.bulkUpdate(filter.filter(args), preparedOptions);

      } else {
        result = this.customUpdate(this.findMarker(args), preparedOptions);
      }
    }
    if (type === '[object Array]') {
      result = this.bulkUpdate(args, preparedOptions);
    }

    if (visibilityFlag) {
      this.countVisible();
    }

    this.that.markers.dataChanged = true;

    return result;
  }

}
