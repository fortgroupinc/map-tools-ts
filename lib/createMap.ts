/// <reference path="references.ts"/>
module mapTools {

  export class createMap {

    public instance = {};

    public addMarker;

    constructor(options, cb) {

      this.instance = {good: 'instance'};

      this.addMarker = new mapTools.addMarker().add;

      console.log('creates a map! with options %s', options, this.instance);
      cb();


    }
  }

}
