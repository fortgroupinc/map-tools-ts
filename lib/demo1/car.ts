/// <reference path="vehicle.ts" />
module demo {
  export class Car implements Vehicle {
    moveTo(x: number, y: number) {
      console.log('Driving to ' + x + ' ' + y);
    }
  }
}


