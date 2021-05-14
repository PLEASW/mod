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
*/
this.options = {
    root_mode: 'team',
    max_players: 30,
    crystal_value: 3,
    starting_ship: 800,
    asteroids_strength: 0.5,
    speed_mod: 1.25,
    release_crystal: true,
    mines_self_destroy: false,
    projectile_speed: 1.2,
    hues: [180, 120, 360],
    station_size: 1,
    station_crystal_capacity: 0.5,
    friendly_colors: 3
};
this.tick = function (game) { };
this.event = function (event, game) { };