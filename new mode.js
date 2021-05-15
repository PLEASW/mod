/*
Team mode
  Winning: 
    Kill Base                             *****
    Kill a amount of enemies/aliens       **
    Race to tier 7 first                  ***
    Capture unspecific objects            * 
    Steal something from enemy            * 
    Kill a ship                           *****
  Players:
    10 players:
      1 leader
        Give commands
          Max: 50 char/command
          frequency: 2min  
        Always full cargo 
          frequency: 7.5min
        Have spectator done 
          time: ~2min
          frequency: 5min
        Has advance team members stats 
          Ship, lives, stats, name, rank, frags, death, position
        More advance information from enemy 
          ship, stats, frags, death, rank, position 
        Has entire map
      2 strategist 
        Give suggest to leader
        Has list of Enemies
          name, score
        Stats of each players 
          ship,stat,name
        Have spectator options
          time: ~2\3min
          frequency: 3min
        can have x gem/minute
          frequency: 10min
          value: 1/2 cargo
      5 - 7 players
        Can have mining pods for free:
          3 pods/times
          every deaths
        Follow Leader Commands
        Suspect enemy leader
  Rule: 
    Strategist, Leader: can be normal ships
    The game end when: 
      Leader dead
      Base destroy
      Team has less than 7 players  
    Some important Factor:
      Map draw enemies land
      ally mining land 
    Player kills 10 enemies will have a free torpedo
*/
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
}
const Gem = {
  id: 'gem',
  position: [],
  clickable: true,
  visible: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
    { type: "text", position: [0, 5, 100, 90], value: "Spectator", color: "#cde" }
  ]
};
const Spectator = {
  id: 'spectator',
  position: [73, 0, 6.6, 4],
  clickable: true,
  visible: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
    { type: "text", position: [5, 5, 90, 75], value: "Spectator", color: "#cde" },
    // button cooldown 
    { type: "box", position: [0, 85, 100, 15], fill: '#0ff' },  // bar 
    { type: "box", position: [0, 85, 0, 7.5], fill: '#f00' }, // progress cooldown
    { type: "box", position: [0, 92.5, 0, 7.5], fill: '#FFA500' } // progress effect

  ]
};
const LEADER = {
  // spectator
  spectator: Spectator,
  spectator_delay: 20 * 60,
  time_uses_spectator: 10 * 60,
  end_time_spectator: 0,
  spectator_activated: 0,
  spectator_allowed_time: 0,
  is_spectator: false,
  // players list
  allies: [],
  enemy: []
};

this.tick = function (game) {
  game.step % 60 === 0 && ([team1, team2] = sortTeam(game));
  if (game.step % 60 === 0) {
    game.ships.forEach((ship, index) => {
      if (!ship.custom.leader) {
        Object.assign(ship.custom, LEADER);
        ship.setUIComponent(ship.custom.spectator);
        ship.custom.leader = true;
      }
    });
  }
  game.ships.forEach((ship, index) => {
    if (ship.custom.leader) {
      // effect cooldown bar
      if (game.step <= ship.custom.spectator_allowed_time) {
        let time = ship.custom.spectator_allowed_time - game.step;
        ship.custom.spectator.components[3].position[2] = (time / ship.custom.spectator_delay) * 100;
      }
      if (game.step <= ship.custom.end_time_spectator) {
        let time = ship.custom.end_time_spectator - game.step;
        ship.custom.spectator.components[4].position[2] = (time / ship.custom.time_uses_spectator) * 100;
      }
      ship.setUIComponent(ship.custom.spectator);
      // remove effect after time
      if (game.step % 60 === 0) console.log(ship.custom.spectator.components[2].position[2]);
      if (ship.custom.is_spectator && game.step > ship.custom.end_time_spectator) {
        ship.set(ship.custom.stats);
        ship.custom.is_spectator = false;
      }
    }
  });
};
this.event = function (event, game) {
  switch (event.id) {
    case 'spectator':
      let ship = event.ship;
      let custom = ship.custom;
      !custom.is_spectator && (custom.stats = { type: ship.type, stats: ship.stats, collider: true, shield: ship.shield, generator: ship.generator, crystals: ship.crystals, invulnerable: 120 });
      if (!custom.is_spectator && game.step >= custom.spectator_allowed_time) {
        custom.spectator_activated = game.step;
        custom.spectator_allowed_time = game.step + custom.spectator_delay;
        custom.end_time_spectator = game.step + custom.time_uses_spectator;
        custom.is_spectator = true;
        ship.set({ type: 102, collider: false });
      } else if (custom.is_spectator) {
        ship.set(custom.stats);
        custom.is_spectator = false;
      }
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







































