
function shipCode() {
  this.shipTree = {};
}
shipCode.prototype.changeShipTree = function (event) {
  if (Object.keys(this.shipTree).includes(event.id)) event.ship.custom.shipTree = event.id;
}
shipCode.prototype.addShipTree = (ships, id) => this.shipTree[id] = this.init(ships);
shipCode.prototype.type = ship => typeof ship === 'object' ? ship.type : ship;
shipCode.prototype.shipCargo = ship => Math.trunc(this.type(ship) / 100) ** 2 * 20;
shipCode.prototype.maxStats = ship => this.type(ship) < 700 ? 88888888 : 0;
shipCode.prototype.init = function (ships) {
  const arr = {};
  Object.values(ships).forEach(function (ship) {
    const object = JSON.parse(ship).typespec;
    arr[object.name] = object;
  })
  return arr;
}
shipCode.prototype.shipValue = function (ship) {
  const type = this.type(ship);
  return { type, stats: this.maxStats(type), crystals: this.shipCargo(type) };
}
shipCode.prototype.changeShip = function (ship, reverse = false) {
  const shipTree = Object.values(this.shipTree[ship.custom.shipTree]).map(ship => ship.code).sort((a, b) => (a - b) * (!reverse - 1));
  return this.shipValue(shipTree[shipTree.indexOf(ship.type) + 1] || shipTree[0]);
}
shipCode.prototype.reset = function (ship) {
  const type = Object.values(this.shipTree[ship.custom.shipTree])[0].code;
  return { type, crystals: this.shipCargo(type), stats: this.maxStats(type) };
}