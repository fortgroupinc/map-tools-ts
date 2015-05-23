/// <reference path="references.ts"/>
export module mapTools {

  export class Wrapper {

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
