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
let aliens = [10, 11, 14, 16, 17, 18];

let damage = 50,
  laser_speed = 100,
  rate = 1.2;

this.tick = function (game) {
  game.ships.forEach((ship, i) => {
    if (!ship.custom.init) {
      ship.custom.init = true;
      ship.custom.scoreboard = {
        id: "scoreboard",
        components: [],
      };
    }
  });
  if (game.step % 30 === 0) {
    if (game.aliens.length < 25) {
      game.addAlien({
        code: aliens[0],
        level: 2,
        x: Math.trunc(Math.random() * this.options.map_size),
        y: Math.trunc(Math.random() * this.options.map_size),
      });
      game.custom.aliens_squawn = game.step;
    }
    if (game.step > game.custom.aliens_squawn + 10)
      game.aliens.forEach((alien, i) => {});
  }
};
this.event = function (event, game) {
  let ship = event.ship;
  switch (event.name) {
  }
};
