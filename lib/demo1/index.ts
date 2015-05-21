/// <reference path="airplane.ts" />
/// <reference path="sportscar.ts" />
/// <reference path="vehicle.ts" />

module demo {

  function navigate(vehicle: Vehicle) {
    vehicle.moveTo(59.9436499, 10.7167959);
  }

  export var airplane = new Airplane();
  export var car = new SportsCar();

  navigate(airplane);
  navigate(car);

}
