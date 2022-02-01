class SHIP {
  constructor() {
    this.init = {};
    this.events = {};
  }
  #extraShip = '{"name":"","level":1,"model":1,"size":1,"specs":{"shield":{"capacity":[1000,1000],"reload":[1000,1000]},"generator":{"capacity":[1,1],"reload":[1,1]},"ship":{"mass":1,"speed":[1,1],"rotation":[1,1],"acceleration":[1,1]}},"bodies":{"main":{"section_segments":3,"offset":{"x":0,"y":0,"z":0},"position":{"x":[],"y":[],"z":[]},"width":[],"height":[],"texture":[]}},"typespec":{"name":"","level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[1000,1000],"reload":[1000,1000]},"generator":{"capacity":[1,1],"reload":[1,1]},"ship":{"mass":1,"speed":[1,1],"rotation":[1,1],"acceleration":[1,1]}},"shape":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"lasers":[],"radius":0}}';
  addShiptree(shiptree, ships) {
    if (this.shiptrees) return;
    this.init[shiptree = shiptree.toLowerCase()] = this.#initShipPath(Object.values(ships).map(ship => Object.assign(JSON.parse(ship), { shiptree })))
  }
  initializeShiptree() {
    this.shiptrees = {}; this.shipCodes = {};
    Object.values({ ...this.init }).flat().sort((a, b) => a.level - b.level).map((ship, code) => {
      ship.model = ship.typespec.model = code - ship.level * 100;
      ship.typespec.code = code;
      return ship;
    }).forEach(ship => {
      ship.next = ship.typespec.next = ship.next?.map(code => code.typespec.code);
      this.shiptrees[ship.shiptree] ??= []; this.shipCodes[ship.shiptree] ??= [];
      this.shiptrees[ship.shiptree].push(ship);
      this.shipCodes[ship.shiptree].push(ship.typespec.code);
    })
  }
  #findShipCode = (code, ships) => ships.find(ship => ship.typespec.code === code);
  #initShipPath(ships) {
    const shipArr = Array(8).fill(0).map((i, level) => ships.filter(ship => ship.level === level)).map(tier => tier.sort((a, b) => a.model - b.model));
    return ships.map(ship => {
      if (ship.next && ship.typespec.next) ship.next = ship.typespec.next = ship.next?.map(code => this.#findShipCode(code, ships))
      else {
        const level = ship.level;
        if (level + 1 > 7) return ship;
        const alpha = Math.max(0, Math.round(shipArr[level].indexOf(ship) / Math.max(shipArr[level].length - 1, 1) * (shipArr[level + 1].length - 2)))
        ship.next = ship.typespec.next = shipArr[level + 1].slice(alpha, alpha + 2);
      }
      return ship;
    })
  }
  get ships() {
    this.shiptrees ?? this.initializeShiptree();
    const ships = Object.values(this.shiptrees).flat().map(JSON.stringify)
    return ships.concat(ships.length < 102 ? this.#extraShip : []);
  }
  getShipObj = ship => Object.values(this.shiptrees).flat().find(data => data.typespec.code === ship.type);
  getShipTier = ship => this.getShipObj(ship).level;
  setEvent = (id, callback) => this.events[id] = callback.bind(this);
  getEvent = (id, ...param) => {
    try { return this.events[id](...param) }
    catch (e) { console.log(e) }
  };
}
const shiptree = new SHIP();


shiptree.setEvent('next', function (ship, shiptree) {
  const ships = this.shipCodes[shiptree];
  const type = ships[ships.indexOf(ship.type) + 1] ?? ships[0];
  return { type, ...this.events?.restore(ship, 88888888) }
});
shiptree.setEvent('previous', function (ship, shiptree) {
  const ships = [...this.shipCodes[shiptree]].reverse();
  const type = ships[ships.indexOf(ship.type) + 1] ?? ships[0];
  return { type, ...this.events?.restore(ship, 88888888) };
});
shiptree.setEvent('restore', function (ship, stats = ship.stats) {
  return { crystals: this.getShipTier(ship) ** 2 * 20, stats, shield: 1000, collider: true, vx: 0, vy: 0 };
});
shiptree.setEvent('spectate', function () {
  return { collider: false, type: this.shiptrees.spectate?.[0].typespec.code, crystals: 0, stats: 0 };
});
shiptree.setEvent('stats', function (ship) {
  return this.events?.restore(ship, !ship.stats * 88888888);
});
shiptree.setEvent('reset', function (ship, shiptree) {
  return { type: this.shipCodes?.[shiptree][0], ...this.events?.restore(ship) };
});