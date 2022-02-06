class SHIP {
  constructor() {
    this.init = {};
    this.events = {};
  }
  #extraShips = [
    '{"name":"","level":1,"model":1,"size":1,"next":[],"specs":{"shield":{"capacity":[1000,1000],"reload":[1000,1000]},"generator":{"capacity":[1,1],"reload":[1,1]},"ship":{"mass":1,"speed":[1,1],"rotation":[1,1],"acceleration":[1,1]}},"bodies":{"main":{"section_segments":3,"offset":{"x":0,"y":0,"z":0},"position":{"x":[],"y":[],"z":[]},"width":[],"height":[],"texture":[]}},"typespec":{"name":"","level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[1000,1000],"reload":[1000,1000]},"generator":{"capacity":[1,1],"reload":[1,1]},"ship":{"mass":1,"speed":[1,1],"rotation":[1,1],"acceleration":[1,1]}},"shape":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"lasers":[],"radius":0,"next":[]}}',
    '{"name":"","level":2,"model":1,"size":1,"next":[],"specs":{"shield":{"capacity":[1000,1000],"reload":[1000,1000]},"generator":{"capacity":[1,1],"reload":[1,1]},"ship":{"mass":1,"speed":[1,1],"rotation":[1,1],"acceleration":[1,1]}},"bodies":{"main":{"section_segments":3,"offset":{"x":0,"y":0,"z":0},"position":{"x":[],"y":[],"z":[]},"width":[],"height":[],"texture":[]}},"typespec":{"name":"","level":2,"model":1,"code":201,"specs":{"shield":{"capacity":[1000,1000],"reload":[1000,1000]},"generator":{"capacity":[1,1],"reload":[1,1]},"ship":{"mass":1,"speed":[1,1],"rotation":[1,1],"acceleration":[1,1]}},"shape":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"lasers":[],"radius":0,"next":[]}}',
    '{"name":"","level":2,"model":2,"size":1,"next":[],"specs":{"shield":{"capacity":[1000,1000],"reload":[1000,1000]},"generator":{"capacity":[1,1],"reload":[1,1]},"ship":{"mass":1,"speed":[1,1],"rotation":[1,1],"acceleration":[1,1]}},"bodies":{"main":{"section_segments":3,"offset":{"x":0,"y":0,"z":0},"position":{"x":[],"y":[],"z":[]},"width":[],"height":[],"texture":[]}},"typespec":{"name":"","level":2,"model":2,"code":202,"specs":{"shield":{"capacity":[1000,1000],"reload":[1000,1000]},"generator":{"capacity":[1,1],"reload":[1,1]},"ship":{"mass":1,"speed":[1,1],"rotation":[1,1],"acceleration":[1,1]}},"shape":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"lasers":[],"radius":0,"next":[]}}'
  ].map(JSON.parse)
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
      ship.next = ship.typespec.next = ship.next?.map(code => code?.typespec.code);
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
    const ships = Object.values(this.shiptrees).flat();
    this.#extraShips.forEach(data => ships.find(ship => ship.typespec.code === data.typespec.code) ?? ships.push(data))
    return ships.map(JSON.stringify);
  }
  get tier1() {
    this.shiptrees ?? this.initializeShiptree();
    return Object.values(this.shiptrees).flat().filter(ship => ship.level === 1 && ship.name).map(ship => ship.typespec.code)
  }
  getShipObj = ship => Object.values(this.shiptrees).flat().find(data => data.typespec.code === ship.type);
  getShipTier = ship => this.getShipObj(ship).level;
  setEvent = (id, callback) => this.events[id] = callback.bind(this);
  getEvent = (id, ...param) => { try { return this.events[id](...param) } catch (e) { console.log(e) } };
}
