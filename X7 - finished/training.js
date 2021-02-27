this.options = {
  custom_map: "",
  map_size: 20,
  starting_ship: 605,
  max_players: 6,
  max_level: 5,
  friendly_colors: 1,
  speed_mod: 1.2,
  release_crystal: true,
  weapons_store: true,
};

this.tick = function (game) {
  if (game.step < 180 * 60) {
    for (let ship of game.ships) { }
  } else { }
};
this.event = function (event, game) { };
