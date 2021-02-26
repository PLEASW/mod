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
let scoreboard = {
  id: "scoreboard",
  components: [],
};
let aliens = [10, 11, 14, 16, 17, 18];
this.tick = function (game) {
  if (game.aliens.length < 25) {
    game.addAlien({
      code: aliens[1],
      level: 2,
      x: Math.random() * this.options.map_size,
      y: Math.random() * this.options.map_size,
      crystal_drop: 20,
      weapon_drop: ~~(Math.random * 100),
    });
    game.custom.time_squawn = game.step;
  }
  let ships_in_scoreboard = [];
  game.ships.forEach((ship, i) => {
    ships_in_scoreboard.push({
      type: "player",
      id: i,
      position: [0, i * 10, 50, 10],
    });
    if (!ship.custom.init) {
      ship.set({ stats: 88888888 });
      ship.custom.init = true;
      ship.custom.aliens_killed = 0;
      ship.custom.deaths = 0;
      ship.custom.time_survired = [];
      ship.custom.resquawn = game.step;
    }
  });
  if (game.step > game.custom.time_squawn + 10)
    for (let alien of game.aliens) {
      if (!alien.custom.init) {
        alien.custom.init = true;
        alien.set({
          damage: 100,
          laser_speed: 100,
          rate: 1.2,
        });
      }
    }
};
this.event = function (event, game) {
  let ship = event.ship;
  switch (event.name) {
    case "ship_spawned":
      ship.set({ stats: 66666666 });
      break;
    default:
      break;
  }
};
