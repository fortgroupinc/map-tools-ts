/// <reference path="maps.ts"/>
/// <reference path="typings/tsd.d.ts"/>
class AddMap {

  private id: string;

  constructor(public that) {

  }

  private getElement(args) {

    if (args.el) {
      return window.document.querySelector(args.el);
    }

    if (args.id) {
      return window.document.getElementById(args.id);
    }

  }

  create(args, cb) {

    cb = cb || function () {};

    var mapOptions = Maps.mapOptions(args);

    args.id = args.id || args.el.substring(1);
    this.that.id = args.id;
    this.that.options = args;
    this.that.instance = new google.maps.Map(this.getElement(args), mapOptions);
    this.that.events = [];

    // Add Events
    if (args.on) {
      var i;
      for (i in args.on) {
        if (args.on.hasOwnProperty(i)) {

          if (Config.customEvents.indexOf(i) > - 1) {
            this.that.events.push(i);
          }

          google.maps.event.addListener(this.that.instance, i, args.on[i]);

        }
      }
    }


    this.that.infoWindow = false;
    this.that.templates = {
      infoWindow: {},
      panel: {}
    };

    this.that.uid = args.uid;

    mapTools.maps[this.that.id].instance = this.that.instance;

    google.maps.event.addListenerOnce(this.that.instance, 'idle', ()=>{
      cb(false, this.that);
    });
  }

  private validOptions(options, cb) {
    if (!options || (options && typeof options !== 'object')) {
      cb(new Error('You must pass a valid first parameter: options'));
      return false;
    }

    if (!options.id && !options.el) {
      cb(new Error('You must pass an "id" or a "el" property values'));
      return false;
    }

    if (!options.lat || !options.lng) {
      cb(new Error('You must pass valid "lat" (latitude) and "lng" (longitude) values'));
      return false;
    }

    return true;
  }

  load(options, cb) {

    if (this.validOptions(options, cb)) {

      var id = options.id || options.el.substring(1);

      mapTools.maps = mapTools.maps || {};

      if (mapTools.maps[id]) {
        var msg = 'There is already another Map using the same id: ' + id;

        cb(new Error(msg));
        return false;

      }

      var that = this;

      mapTools.maps[id] = {
        create: function() {
          that.create(this.arguments, cb);
        },
        arguments: options
      };

      // Set Global Structure
      mapTools.maps[id].markers = mapTools.maps[id].markers || {all: {}, tags: {}, dataChanged: false};
      mapTools.maps[id].json = mapTools.maps[id].json || {all: {}, dataChanged: false};

      this.that.markers = mapTools.maps[id].markers;
      this.that.json = mapTools.maps[id].json;

      if (options.async !== false || options.sync === true) {
        Maps.load(id, options);
      } else {
        mapTools.maps[id].create();
      }
    }
  }

}

