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
        Have spectator 
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
this.options = {
  auto_assign_teams: true,
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
var LEADER = () => {
  this.spectator = {
    id: 'spectator',
    position: [],
    clickable: true,
    visible: true,
    components: [],
  };
  this.spectator_delay = 5 * 60 ** 2;
  this.spectator_activated = 0;
  this.spectator_allowed = 0;
  this.list = [];
  this.enemy = [];
};

var team1, team2;
this.tick = function (game) {
  game.step % 60 === 0 && ([team1, team2] = sortTeam(game));
  if (game.step % 30 === 0) {

  }
};
this.event = function (event, game) {
  switch (event.name) {
    case 'ship_destroyed':

      break;
    case 'ship_spawned':
      break
    default:
      break;
  }
};







































