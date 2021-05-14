/*
Team mode
  Winning: 
    Kill Base
    Kill a amount of enemies/aliens
    Race to tier 7 first
    Capture unspecific objects 
    Steal something from enemy 
  Content: ...
  Rule: ...
*/
this.options = {
    root_mode: 'team',
    max_players: 20,
    crystal_value: 5,
    starting_ship: 800,
    speed_mod: 1.25,
    release_crystal: true,
    mines_self_destroy: false,
    shield_regen_factor: 0.1,
    projectile_speed: 1.2,
    hues: [180, 360],
    station_size: 1,
    station_crystal_capacity: 0.5,
    auto_assign_teams: true
};
this.tick = function (game) { };
this.event = function (event, game) { };