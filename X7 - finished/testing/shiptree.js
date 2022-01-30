class shipTree {
  constructor() {
    this.initShiptree = {};
    this._shiptrees = {};
  }
  #placeHolder = '{"name":"Fly","level":1,"model":1,"size":1.05,"next":[],"specs":{"shield":{"capacity":[75,100],"reload":[2,3]},"generator":{"capacity":[40,60],"reload":[10,15]},"ship":{"mass":60,"speed":[125,145],"rotation":[110,130],"acceleration":[100,120]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-65,-60,-50,-20,10,30,55,75,60],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,10,30,25,30,18,15,0],"height":[0,6,8,12,20,20,18,15,0],"propeller":true,"texture":[4,63,10,1,1,1,12,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,0,20,30,60],"z":[0,0,0,0,0]},"width":[0,13,17,10,5],"height":[0,18,25,18,5],"propeller":false,"texture":[7,9,9,4,4]},"cannon":{"section_segments":6,"offset":{"x":0,"y":-15,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[5,6],"rate":4,"type":1,"speed":[160,180],"number":1,"error":2.5},"propeller":false,"texture":[3,3,10,3]}},"wings":{"main":{"length":[60,20],"width":[100,50,40],"angle":[-10,10],"position":[0,20,10],"doubleside":true,"offset":{"x":0,"y":10,"z":5},"bump":{"position":30,"size":20},"texture":[11,63]}},"typespec":{"name":"Fly","level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[75,100],"reload":[2,3]},"generator":{"capacity":[40,60],"reload":[10,15]},"ship":{"mass":60,"speed":[125,145],"rotation":[110,130],"acceleration":[100,120]}},"shape":[1.368,1.368,1.093,0.965,0.883,0.827,0.791,0.767,0.758,0.777,0.847,0.951,1.092,1.667,1.707,1.776,1.856,1.827,1.744,1.687,1.525,1.415,1.335,1.606,1.603,1.578,1.603,1.606,1.335,1.415,1.525,1.687,1.744,1.827,1.856,1.776,1.707,1.667,1.654,0.951,0.847,0.777,0.758,0.767,0.791,0.827,0.883,0.965,1.093,1.368],"lasers":[{"x":0,"y":-1.365,"z":-0.21,"angle":0,"damage":[5,6],"rate":4,"type":1,"speed":[160,180],"number":1,"spread":0,"error":2.5,"recoil":0}],"radius":1.856,"next":[]}}';
  addShiptree(name, ships) {
    this.initShiptree[name] = Object.values(ships).map(ship => {
      ship = JSON.parse(ship);
      ship.shiptree = name;
      return ship;
    });
  }
  #findShipCode(code, ships) {
    return ships.find(ship => ship.typespec.code === code);
  }
  #generateShipPath(ships) {
    const shipArr = Array(8).fill(0).map(i => []);
    ships.forEach(ship => shipArr[ship.level].push(ship));
    shipArr.map(i => i.sort((a, b) => a.model - b.model));
    ships.forEach(ship => {
      if (ship.next && ship.typespec.next) {
        ship.next = ship.typespec.next = ship.next?.map(code => this.#findShipCode(code, ships))
      } else {
        const level = ship.level;
        if (level + 1 > 7) return
        const model = shipArr[level].indexOf(ship);
        const alpha = Math.max(0, Math.round(model / Math.max(shipArr[level].length - 1, 1) * (shipArr[level + 1].length - 2)))
        ship.next = ship.typespec.next = shipArr[level + 1].slice(alpha, alpha + 2);
      }
    })
  }
  get ships() {
    const shiptrees = { ...this.initShiptree };
    for (let shiptree of Object.values(shiptrees)) this.#generateShipPath(shiptree);
    const ships = Object.values(shiptrees).flat().sort((a, b) => a.level - b.level).map((ship, code) => {
      ship.typespec.code = code;
      ship.typespec.model = ship.model = code - ship.level * 100;
      return ship;
    }).map(ship => {
      ship.next = ship.typespec.next = ship.next?.map(code => code?.typespec.code)
      return JSON.stringify(ship);
    })
    if (ships.length < 102) return ships.concat(this.#placeHolder);
    return ships;
  }
  get shiptrees() {
    const ships = this.ships.map(JSON.parse);
    Object.keys(this.initShiptree).forEach(key => this._shiptrees[key] = [])
    for (let ship of ships) this._shiptrees[ship.shiptree]?.push(ship);
    Object.values(this._shiptrees).forEach(shiptrees => shiptrees.sort((a, b) => a.typespec.code - b.typespec.code))
    return this._shiptrees;
  }
}