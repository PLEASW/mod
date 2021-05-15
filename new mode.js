var Spectator_102 = '{"name":"Spectator","level":1,"model":2,"size":0.025,"zoom":0.075,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"bodies":{"face":{"section_segments":100,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-2,-2,2,2],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"vertical":true,"texture":[6]}},"typespec":{"name":"Spectator","level":1,"model":2,"code":102,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"shape":[0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001],"lasers":[],"radius":0.001}}';
var ships = [Spectator_102];
this.options = {
  auto_assign_teams: true,
  ships: ships,
  root_mode: 'team',
  max_players: 30,
  crystal_value: 3,
  starting_ship: 800,
  asteroids_strength: 0.5,
  speed_mod: 1.25,
  release_crystal: true,
  mines_self_destroy: false,
  projectile_speed: 1.2,
  hues: [180, 360],//[180, 120, 360],
  station_size: 1,
  station_crystal_capacity: 0.5,
  friendly_colors: 2
};
function sortTeam(game, number = 2) {
  let result = new Array(number).fill(0).map(i => Array);
  for (let i = 0; i < number; i++) {
    result[i] = game.ships.map(ship => { if (ship.team === i) return ship; }).filter((value, index, array) => value !== undefined);
  }
  return result;
};
const upgrades = [
  { id: "9", position: [25, 0, 20, 10], visible: true, clickable: true, shortcut: "9", components: [{ type: "box", position: [0, 0, 100, 100] }] },
  { id: "0", position: [45, 0, 20, 10], visible: true, clickable: true, shortcut: "0", components: [{ type: "box", position: [0, 0, 100, 100] }] }
];
const Gem = {
  id: 'gem',
  position: [66.4, 0, 6.6, 4],
  clickable: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
    { type: "text", position: [0, 5, 100, 80], value: "Gem", color: "#cde" },
    { type: "box", position: [0, 85, 100, 15], fill: '#0ff' },  // bar
    { type: "box", position: [0, 85, 0, 15], fill: '#f00' }    // progress bar
  ]
};
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
const ToogleMap = {
  id: 'map toogle',
  position: [59.8, 0, 6.6, 4],
  clickable: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
    { type: "text", position: [0, 5, 100, 90], value: "Map", color: "#cde" },
  ]
};
const LEADER = {
  // spectator
  spectator: Spectator,
  spectator_delay: 0,       // button cooldown
  time_uses_spectator: 0,   // how long effect
  end_time_spectator: 0,          //time end the spectator
  spectator_activated: 0,         // time activated button
  spectator_allowed_time: 0,      // time end the spectator 
  is_spectator: false,
  // gem
  gem: Gem,
  gem_delay: 0,             // button cooldown
  gem_activated: 0,
  gem_cooldown_time: 0,
  value: 0,
  // players list
  allies: [],
  enemy: [],
  // map
  view_map: false,
  map: {
    id: 'map',
    position: [25, 5, 85 * 0.5625, 85],
    components: [{ type: 'box', position: [0, 0, 100, 100], fill: 'rgba(100, 100, 100, 0.5)' }]
  },
  toggle_map: ToogleMap
};
this.tick = function (game) {
  if (game.step % 60 === 0) {
    ([team1, team2] = sortTeam(game));
    game.ships.forEach((ship, index) => {
      if (!ship.custom.leader) {
        Object.assign(ship.custom, LEADER);
        ship.setUIComponent(ship.custom.spectator);
        ship.setUIComponent(ship.custom.gem);
        ship.setUIComponent(ship.custom.toggle_map);
        ship.custom.leader = true;
        ship.custom.spectator_delay = 5 * 60 ** 2;
        ship.custom.time_uses_spectator = 1.5 * 60 ** 2;
        ship.custom.gem_delay = 5 * 60 ** 2;
      }
    });
  }
  if (game.step % 45 === 0) {
    game.ships.forEach((ship, index) => {
      if (ship.custom.leader) {
        // effect cooldown bar
        if (game.step <= ship.custom.spectator_allowed_time) {
          let time = ship.custom.spectator_allowed_time - game.step;
          ship.custom.spectator.components[3].position[2] = (time / ship.custom.spectator_delay) * 100;
        } else ship.custom.spectator.components[3].position[2] = 0;
        if (game.step <= ship.custom.end_time_spectator) {
          let time = ship.custom.end_time_spectator - game.step;
          ship.custom.spectator.components[4].position[2] = (time / ship.custom.time_uses_spectator) * 100;
        } else ship.custom.spectator.components[4].position[2] = 0;
        ship.setUIComponent(ship.custom.spectator);
        // remove effect after time
        if (ship.custom.is_spectator && game.step > ship.custom.end_time_spectator) {
          ship.set(ship.custom.stats);
          ship.custom.is_spectator = false;
        }
        // gem effect
        if (game.step < ship.custom.gem_cooldown_time) {
          let time = ship.custom.gem_cooldown_time - game.step;
          ship.custom.gem.components[3].position[2] = (time / ship.custom.gem_delay) * 100;
        } else ship.custom.gem.components[3].position[2] = 0;
        ship.setUIComponent(ship.custom.gem);
      }
    });
  }
};
this.event = function (event, game) {
  let ship = event.ship;
  let custom = ship.custom;
  switch (event.id) {
    case 'spectator':
      !custom.is_spectator && (custom.stats = { type: ship.type, stats: ship.stats, collider: true, shield: ship.shield, generator: ship.generator, crystals: ship.crystals, invulnerable: 120 });
      if (!custom.is_spectator && game.step >= custom.spectator_allowed_time) {
        custom.spectator_activated = game.step;
        custom.spectator_allowed_time = game.step + custom.spectator_delay;
        custom.end_time_spectator = game.step + custom.time_uses_spectator;
        custom.is_spectator = true;
        ship.set({ type: 102, collider: false });
        for (let upgrade of upgrades) ship.setUIComponent(upgrade);
      } else if (custom.is_spectator) {
        ship.set(custom.stats);
        custom.is_spectator = false;
        custom.end_time_spectator = game.step;
        for (let upgrade of upgrades) ship.setUIComponent({ id: upgrade.id, visble: false });
      }
      break;
    case 'gem':
      if (game.step > custom.gem_cooldown_time) {
        value = custom.leader ? 1 : 0.5;
        custom.value = Math.trunc(ship.type / 100) ** 2 * 5 * 4 * value;
        ship.set({ crystals: ship.crystals + custom.value });
        custom.gem_activated = game.step;
        custom.gem_cooldown_time = game.step + custom.gem_delay;
      }
      break;
    case 'map toogle':
      custom.view_map = !custom.view_map;
      if (custom.view_map) {
        ship.setUIComponent(custom.map);
      } else ship.setUIComponent({ id: 'map', visible: false });
      break;
  }
  switch (event.name) {
    case 'ship_destroyed':

      break;
    case 'ship_spawned':
      break;
    default:
      break;
  }
};







































