this.options = {
  custom_map: "",
  map_size: 20,
  starting_ship: 605,
  max_players: 6,
  max_level: 6,
  friendly_colors: 1,
  speed_mod: 1.2,
  release_crystal: true,
  weapons_store: true,
};
let alien = {
  code: 10,
  levels: 2,
  x: 0,
  y: 0,
  crystal_drop: 20,
};
let difficult = {
  damage: 100,
  rate: 1.5,
  laser_speed: 100,
  shield: 150,
};
this.tick = function (game) {
  if (game.aliens.length < 30 && game.ships.length) {
    game.addAlien(alien);
    game.custom.alien_spawn = game.step;
  }
  if (game.step % 30 === 0 && game.step > game.custom.alien_spawn + 10)
    game.aliens.forEach((alien, i) => {
      alien.set(difficult);
    });
};

this.event = function (event, game) {
  let ship = event.ship;
  switch (event.name) {
    case "ship_spawned":
      ship.set({ stats: 66666666, shield: 300 });
      break;

    case "ship_destroyed":
      game.aliens.forEach(alien => { })
      break;
  }
};
