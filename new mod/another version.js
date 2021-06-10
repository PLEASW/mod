addBots = number => { for (let i = 0; i < number; i++) Bot.create() };

this.options = {
  auto_assign_teams: true,
  max_players: 30,
  crystal_value: 2,
  radar_zoom: 5,
  asteroids_strength: 0.5,
  speed_mod: 1.25,
  release_crystal: true,
  mines_self_destroy: false,
  projectile_speed: 1.2,
  hues: [180, 360],
  station_size: 1,
  station_crystal_capacity: 0.5,
  friendly_colors: 2,
  map_size: 80,
  map_density: 2,
  weapons_store: false
};

const map_size = this.options.map_size;
const radar_zoom = this.options.radar_zoom;

const colors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 255, 1)'];
const radar_radius = (map_size * 10) / radar_zoom;

const width = 0.75;
const radar_width = radar_radius * 10 / map_size;
const radar_pos = (radar_width - width) / 2;

const friendly_colors = this.options.friendly_colors;

const upgrades = [
  { id: "9", position: [25, 0, 20, 10], visible: true, clickable: true, shortcut: "9", components: [{ type: "box", position: [0, 0, 100, 100] }] },
  { id: "0", position: [45, 0, 20, 10], visible: true, clickable: true, shortcut: "0", components: [{ type: "box", position: [0, 0, 100, 100] }] }
];
const RADAR_BACKGROUND = function () {
  this.radar = function (number) {
    let result = [];
    const width = 100 / number;
    for (let i = 0; i < number; i++) for (let j = 0; j < number; j++)
      result.push({ type: 'box', position: [i * width, j * width, width, width], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 0.2, pos: [i, j] });
    return result;
  };
  this.realRadar = {
    id: 'radar_background',
    components: this.radar(10)
  };
}
const RADAR_UI = function (ship) {
  this.view_radar = false;

  this.uiRadar = {
    id: 'radar',
    position: [25, 5, 85 * 0.5625, 85],
    components: []
  };
  this.button = {
    id: 'radar ui',
    position: [59.6, 0, 6.6, 4],
    clickable: true,
    components: [
      { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
      { type: "text", position: [0, 5, 100, 90], value: "Map", color: "#cde" },
    ]
  };
  ship.setUIComponent(this.button);
  this.posConvt = function (x, y) {
    return [map_size * 5 + x, map_size * 5 - y - 1];
  };
  this.ship_component = function (ship = { x: 0, y: 0 }, team = 0) {
    let [x, y] = this.posConvt(ship.x, ship.y).map(i => (i - width * 0.5) / map_size * 10);
    return { type: 'box', position: [x, y, width, width], fill: colors[ship.team] };
  };
  this.radar_ui = function (ship) {
    let result = [this.posConvt(ship.x, ship.y)];
    let [x, y] = result[0];
    let x2 = radar_width + x > 100 ? x - 100 : x;
    let y2 = radar_width + y > 100 ? y - 100 : y;
    let x3 = x < 0 ? 100 + x : x;
    let y3 = y < 0 ? 100 + y : y;
    if (x2 != x) {
      result.push([x2, y]);
      if (y2 != y) result.push([x2, y2]);
      if (y3 != y) result.push([x2, y3]);
    }
    if (y2 != y) result.push([x, y2]);
    if (x3 != x) {
      result.push([x3, y]);
      if (y2 != y) result.push([x3, y2]);
      if (y3 != y) result.push([x3, y3]);
    }
    if (y3 != y) result.push([x, y3]);
    return result;
  };
  this.checkPos = function ([x, y, width], [X, Y]) {
    return x < X && X < x + width && y < Y && Y < y + width;
  };
  this.drawRadar = function (ships = [], ship = {}) {
    let result = ships.filter(a => a.team === ship.team).map(b => this.ship_component(b, ship.team));
    let radars = ships.filter(value => value.team === ship.team).map(a => this.radar_ui(a)).flat();
    let enemies = ships.filter(value => value.team !== ship.team);
    for (let enemy of enemies) for (let radar of radars) {
      let component = this.ship_component(enemy, ship.team);
      if (this.checkPos(radar.concat(radar_radius / 2), this.posConvt(enemy.x, enemy.y))) {
        result.push(component);
        break;
      }
    }
    return result.concat({ type: 'box', position: [0, 0, 100, 100], fill: 'rgba(100, 100, 100, 0.4)', stroke: "#cde", width: 0.5 });
  };
};
game.custom = new RADAR_BACKGROUND();
game.setUIComponent(game.custom.realRadar);
this.tick = function (game) {
  if (game.step === 0)
    game.setUIComponent(game.custom.realRadar);

  if (game.step % 60 === 0) {
    for (let ship of game.ships) {
      if (!ship.custom.init) {
        ship.custom = new RADAR_UI(ship);
        ship.custom.init = true;
      }
      if (ship.custom.view_radar) {
        ship.custom.uiRadar.components = ship.custom.drawRadar(game.ships, ship).concat(game.custom.radar(10));
        ship.setUIComponent(ship.custom.uiRadar);
      } else ship.setUIComponent({ id: 'radar', visible: false });
    }
  }
};
this.event = function (event, game) {
  let ship = event.ship;
  switch (event.id) {
    case 'radar ui':
      ship.custom.view_radar = !ship.custom.view_radar;
      break;
  }
};

; (function () {
  var internals_init = function () {
    if (game.custom.shipDisconnected_init) return;
    const modding = game.modding;
    const internals = Object.values(modding).find(val => val && typeof val.shipDisconnected === "function");
    if (!internals) {
      modding.terminal.error(new Error("Failed to initialize 'ship_disconnected' event: modding internals object not found"));
      return;
    }
    if (!internals.shipDisconnected.old) {
      function shipDisconnected({ id } = {}) {
        if (modding.context.event && id) var ship = game.findShip(id);
        var result = shipDisconnected.old.apply(this, arguments);
        if (ship) try { modding.context.event({ name: "ship_disconnected", ship }, game); } catch (e) { }
        return result;
      }
      shipDisconnected.old = internals.shipDisconnected;
      internals.shipDisconnected = shipDisconnected;
    }
    game.custom.shipDisconnected_init = true;
  }
  var tick = this.tick;
  this.tick = function (game) {
    this.tick = tick;
    internals_init();
    this.tick(game);
  }
}).call(this);


