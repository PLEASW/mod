addBots = number => {
  for (let i = 0; i < number; i++) Bot.create()
}

let Spectator_102 = '{"name":"Spectator","level":1,"model":2,"size":0.025,"zoom":0.075,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"bodies":{"face":{"section_segments":100,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-2,-2,2,2],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"vertical":true,"texture":[6]}},"typespec":{"name":"Spectator","level":1,"model":2,"code":102,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"shape":[0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001],"lasers":[],"radius":0.001}}';
let ships = [Spectator_102];

this.options = {
  // auto_assign_teams: true,
  ships: ships,
  // root_mode: 'team',
  max_players: 30,
  crystal_value: 3,
  radar_zoom: 5,
  starting_ship: 800,
  asteroids_strength: 3,
  speed_mod: 1.25,
  release_crystal: true,
  mines_self_destroy: false,
  projectile_speed: 1.2,
  hues: [180, 360],//[180, 120, 360],
  station_size: 1,
  station_crystal_capacity: 0.5,
  friendly_colors: 2,
  map_size: 80
};

const map_size = this.options.map_size;
const radar_zoom = this.options.radar_zoom;

const colors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 255, 1)'];
const colors_radar = ['rgba(255, 0, 0, 0.1)', 'rgba(0, 255, 255, 0.1)'];
const radar_radius = (map_size * 10) / radar_zoom;

const width = 1;
const radar_width = radar_radius * 10 / map_size;
const radar_pos = (radar_width - width) / 2;

const friendly_colors = this.options.friendly_colors;

const upgrades = [
  { id: "9", position: [25, 0, 20, 10], visible: true, clickable: true, shortcut: "9", components: [{ type: "box", position: [0, 0, 100, 100] }] },
  { id: "0", position: [45, 0, 20, 10], visible: true, clickable: true, shortcut: "0", components: [{ type: "box", position: [0, 0, 100, 100] }] }
];

const Spectator = {
  id: 'spectator',
  position: [73, 0, 6.6, 4],
  clickable: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
    { type: "text", position: [5, 5, 90, 75], value: "Spectator", color: "#cde" },
    // button cooldown 
    { type: "box", position: [0, 85, 100, 15], fill: '#0ff' },  // bar 
    { type: "box", position: [0, 85, 0, 7.5], fill: '#FFA500' }, // progress effect
    { type: "box", position: [0, 92.5, 0, 7.5], fill: '#f00' } // progress cooldown
  ]
};

const Gem = {
  id: 'gem',
  position: [66.3, 0, 6.6, 4],
  clickable: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
    { type: "text", position: [0, 5, 100, 80], value: "Gem", color: "#cde" },
    { type: "box", position: [0, 85, 100, 15], fill: '#0ff' },  // bar
    { type: "box", position: [0, 85, 0, 15], fill: '#f00' }    // progress bar
  ]
};

const ToogleMap = {
  id: 'map toogle',
  position: [59.6, 0, 6.6, 4],
  clickable: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
    { type: "text", position: [0, 5, 100, 90], value: "Map", color: "#cde" },
  ]
};

const Players_List = {
  id: 'players list',
  position: [73, 4.1, 6.6, 4],
  clickable: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
    { type: "text", position: [0, 5, 100, 90], value: "Players", color: "#cde" },
  ]
};
const disable_uis = (ids, ship) => { for (let id of ids) ship.setUIComponent({ id: id, visible: false }) };

const SPECTATOR = {
  args: {
    spectator: Spectator,
    end_time_spectator: 0,          //time end the spectator
    spectator_activated: 0,         // time activated button
    spectator_allowed_time: 0,      // time end the spectator 
    is_spectator: false,
    spectator_delay: 5 * 60 * 60,
    stats: {},    // button cooldown
    time_uses_spectator: .5 * 60 * 60,
  },
  methods: {
    show_activate_button: ship => ship.setUIComponent(ship.custom.spectator),
    button_clicked: function (ship, custom) {
      ship.type != 102 && (custom.stats = { type: ship.type, stats: ship.stats, collider: true, shield: ship.shield, generator: ship.generator, crystals: ship.crystals, invulnerable: 120 });
      if (!custom.is_spectator && game.step >= custom.spectator_allowed_time) {
        custom.is_spectator = true;

        custom.spectator_activated = game.step;
        custom.spectator_allowed_time = game.step + custom.spectator_delay;
        custom.end_time_spectator = game.step + custom.time_uses_spectator;

        this.activate_effect(ship);
        for (let upgrade of upgrades) ship.setUIComponent(upgrade);
      } else if (custom.is_spectator) {
        ship.custom.end_time_spectator = game.step;
        this.remove_effect(ship);
      }
    },
    ui_cooldown_effect: function (game, ship) {
      if (game.step <= ship.custom.end_time_spectator) {
        let time = ship.custom.end_time_spectator - game.step;
        ship.custom.spectator.components[3].position[2] = (time / ship.custom.time_uses_spectator) * 100;
      } else if (ship.custom.spectator.components[3].position[2] !== 0)
        ship.custom.spectator.components[3].position[2] = 0;
    },
    ui_button_cooldown: function (game, ship) {
      if (game.step <= ship.custom.spectator_allowed_time) {
        let time = ship.custom.spectator_allowed_time - game.step;
        ship.custom.spectator.components[4].position[2] = (time / ship.custom.spectator_delay) * 100;
      } else if (ship.custom.spectator.components[4].position[2] !== 0) {
        ship.custom.spectator.components[4].position[2] = 0;
        this.remove_effect(ship);
      }
    },
    activate_effect: function (ship) {
      if (ship.type != 102 && ship.custom.is_spectator) ship.set({ type: 102, collider: false });
    },
    remove_effect: ship => {
      if (game.step >= ship.custom.end_time_spectator && ship.custom.is_spectator) {
        ship.set(ship.custom.stats);
        ship.custom.is_spectator = false;
        for (let upgrade of upgrades) ship.setUIComponent({ id: upgrade.id, visble: false });
      }
    }
  }
};
const GEM = {
  args: {
    gem: Gem,
    gem_delay: 5 * 60 * 60,             // button cooldown
    gem_activated: 0,
    gem_cooldown_time: 0,
    value: 0,
  },
  methods: {
    show_activate_button: ship => ship.setUIComponent(ship.custom.gem),
    button_clicked: function (ship, custom) {
      if (game.step > custom.gem_cooldown_time) {
        value = custom.leader ? 1 : 0.5;
        custom.value = Math.trunc(ship.type / 100) ** 2 * 5 * 4 * value;
        custom.gem_activated = game.step;
        custom.gem_cooldown_time = game.step + custom.gem_delay;

        ship.set({ crystals: ship.crystals + custom.value });
      }
    },
    ui_button_cooldown: function (game, ship) {
      if (game.step < ship.custom.gem_cooldown_time) {
        let time = ship.custom.gem_cooldown_time - game.step;
        ship.custom.gem.components[3].position[2] = (time / ship.custom.gem_delay) * 100;
      } else if (ship.custom.gem.components[3].position[2] !== 0)
        ship.custom.gem.components[3].position[2] = 0;
    }
  }
};
const make_list = function (values, number) {
  let result = [];
  let sub = [];
  for (let item of values) {
    sub.push(item);
    if (sub.length == number || values.indexOf(item) == values.length - 1) {
      result.push(sub);
      sub = [];
    }
  }
  return result;
}

const MAP = {
  args: {
    view_map: false,
    map: { id: 'map', position: [25, 5, 85 * 0.5625, 85], components: [] },
    toggle_map: ToogleMap
  },
  methods: {
    show_activate_button: ship => ship.setUIComponent(ship.custom.toggle_map),
    button_clicked(ship, custom) {
      if (!custom.view_players) custom.view_map = !custom.view_map;
    },
    convert_Pos: (x, y) => [(map_size * 5 + x), (map_size * 5 - y - 1)],
    checkPos(pos1, pos2) {
      let [x1, y1, width] = pos1;
      let [x2, y2] = pos2;
      return (y1 < y2 && y2 < y1 + width) && (x1 < x2 && x2 < x1 + width);
    },
    ships_components(ships, ship) {
      return ships.map(space_ship => {
        const [x, y] = this.convert_Pos(space_ship.x, space_ship.y).map(i => (i - width * 0.5) / map_size * 10);

        let result = [
          space_ship.team === ship.team ?
            { type: 'box', position: [x, y, width, width], fill: colors[space_ship.team] } :
            { type: 'box', position: [x, y, width, width], fill: colors[space_ship.team] },
        ];
        return result;
      }).flat();
    },
    radars_components(radars, ship) {
      return radars.map(radar => {
        const [x, y] = this.convert_Pos(radar.x, radar.y).map(i => ((i - width * 0.5) / map_size * 10) - radar_pos);

        let result = [{ type: 'box', position: [x, y, radar_width, radar_width], fill: colors_radar[ship.team] }];

        let x2 = radar_width + x > 100 ? -100 + x : x;
        let y2 = radar_width + y > 100 ? -100 + y : y;

        let x3 = x < 0 ? 100 + x : x;
        let y3 = y < 0 ? 100 + y : y;

        if (x2 != x) {
          result.push({ type: 'box', position: [x2, y, radar_width, radar_width], fill: result[0].fill });
          if (y2 != y) result.push({ type: 'box', position: [x2, y2, radar_width, radar_width], fill: result[0].fill });
          if (y3 != y) result.push({ type: 'box', position: [x2, y3, radar_width, radar_width], fill: result[0].fill });
        }
        if (y2 != y) result.push({ type: 'box', position: [x, y2, radar_width, radar_width], fill: result[0].fill });

        if (x3 != x) {
          result.push({ type: 'box', position: [x3, y, radar_width, radar_width], fill: result[0].fill });
          if (y2 != y) result.push({ type: 'box', position: [x3, y2, radar_width, radar_width], fill: result[0].fill });
          if (y3 != y) result.push({ type: 'box', position: [x3, y3, radar_width, radar_width], fill: result[0].fill });
        }
        if (y3 != y) result.push({ type: 'box', position: [x, y3, radar_width, radar_width], fill: result[0].fill });

        return result;
      }).flat(2);
    },
    drawMap(ships, ship) {
      let result = [{ type: 'box', position: [0, 0, 100, 100], fill: 'rgba(100, 100, 100, 0.5)' }];
      let allies = ships.filter(value => value.team == ship.team);
      let enemies = ships.filter(value => value.team != ship.team);
      let radars = allies.map(function (i) { return { x: i.x, y: i.y, team: i.team }; });

      result.push(this.ships_components(allies, ship));
      enemies_components = this.ships_components(enemies, ship);
      radars_components = this.radars_components(radars, ship);

      for (let radar of radars_components) for (let enemy of enemies_components)
        if (this.checkPos(radar.position.slice(0, 3), enemy.position.slice(0, 2)) && !result.includes(enemy)) result.push(enemy);

      result.push(radars_components);
      return result.flat(2);
    },
    view_map(ship) {
      if (ship.custom.view_map) {
        ship.custom.map.components = this.drawMap(game.ships, ship);
        ship.setUIComponent(ship.custom.map);
      } else disable_uis(['map'], ship);
    }
  }
};
const PLAYERS_LIST = {
  args: {
    players_list: Players_List,
    allies: [],
    enemies: [],
    view_players: false,
    allies_page: 0,
    enemies_page: 0
  },
  methods: {
    show_activate_button: ship => ship.setUIComponent(ship.custom.players_list),
    sortTeam: (ships) => {
      let result = {};
      for (let i = 0; i < friendly_colors; i++)
        result[i] = ships.filter(value => value.team == i).sort((a, b) => a.id - b.id);
      return result;
    },
    ally_component(ship) {
      console.log(ship)
      return {
        id: ship.id,
        position: [],
        clickable: true,
        components: [{ type: 'player', id: ship.id, position: [0, 0, 100, 100] }]
      }
    },
    enemy_component(enemy, ship) {
      console.log(enemy);
      return {
        id: ship.id,
        position: [],
        clickable: true,
        components: [{ type: 'player', id: ship.id, position: [0, 0, 100, 100] }]
      }
    },
    button_clicked: (ships, ship, custom) => {
      if (!custom.view_map) {
        custom.view_players = !custom.view_players;
        if (custom.view_players) {
          let sides = PLAYERS_LIST.methods.sortTeam(ships);
          for (let team in sides)
            if (team == ship.team) custom.allies = make_list(sides[team], 10);
            else custom.enemies = make_list(sides[team], 10);
          ship.setUIComponent({
            id: 'allies',
            position: [25, 15, 10, 5],
            clickable: true,
            components: [
              { type: 'box', position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
              { type: 'text', position: [17.5, 0, 65, 100], value: 'Allies', color: '#cde' }
            ]
          });
          ship.setUIComponent({
            id: 'enemies',
            position: [55.1, 15, 10, 5],
            clickable: true,
            components: [
              { type: 'box', position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
              { type: 'text', position: [0, 0, 100, 100], value: 'Enemies', color: '#cde' }
            ]
          });
          ship.setUIComponent({
            id: 'box',
            position: [25, 20.1, 40.1, 60],
            components: [{ type: 'box', position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 }]
          })
          custom.view_map = false;
        } else disable_uis(['enemies', 'allies', 'box'], ship);
      }
    },
  }
}
const LEADER = {
  setup: (ship) => {
    if (!ship.custom.leader) {
      ship.custom.leader = true;
      Object.assign(ship.custom, SPECTATOR.args, MAP.args, GEM.args, PLAYERS_LIST.args, { leader: true })
      SPECTATOR.methods.show_activate_button(ship);
      GEM.methods.show_activate_button(ship);
      MAP.methods.show_activate_button(ship);
      PLAYERS_LIST.methods.show_activate_button(ship)
    };
  },
  methods(game, ship) {
    if (ship.custom.leader) {

      SPECTATOR.methods.ui_button_cooldown(game, ship);
      SPECTATOR.methods.ui_cooldown_effect(game, ship);
      SPECTATOR.methods.remove_effect(ship);
      SPECTATOR.methods.show_activate_button(ship);

      GEM.methods.ui_button_cooldown(game, ship);
      GEM.methods.show_activate_button(ship);

      MAP.methods.view_map(ship);
    }
  }
}
this.tick = function (game) {
  if (game.step % 60 === 0) {
    game.ships.forEach((ship) => { LEADER.setup(ship); });
  }
  if (game.step % 45 === 0) {
    game.ships.forEach((ship) => { LEADER.methods(game, ship); });
  }
};
this.event = function (event, game) {
  let ship = event.ship;
  let custom = ship.custom;
  switch (event.id) {
    case 'spectator':
      SPECTATOR.methods.button_clicked(ship, custom);
      break;
    case 'gem':
      GEM.methods.button_clicked(ship, custom);
      break;
    case 'map toogle':
      MAP.methods.button_clicked(ship, custom);
      break;
    case 'players list':
      PLAYERS_LIST.methods.button_clicked(game.ships, ship, custom);
      break;
    case 'allies':
      let allies_components = custom.allies[custom.allies_page].map(ally => PLAYERS_LIST.methods.ally_component(ally))

      break;
    case 'enemies':
      let enemies_components = custom.enemies[custom.enemies_page].map(enemy => PLAYERS_LIST.methods.enemy_component(enemy, ship))
      // console.log(enemies_components);
      break;
  }
  switch (event.name) {
    case 'ship_destroyed':
      break;
    case 'ship_spawned':
      break;
    case "ship_disconnected":
      break;
    default:
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



























