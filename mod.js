this.options = {
  // see documentation for options reference
  root_mode: "invasion",
  map_size: 30,
  lives: 5,
  starting_ship: 605,
  starting_ship_maxed: true
};

var reset_button = {
  id: "reset",
  position: [2, 50, 8, 14],
  clickable: true,
  visible: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "#456", stroke: "#CDE", width: 2 },
    { type: "text", position: [10, 35, 80, 30], value: "RESET", color: "#CDE" },
    { type: "text", position: [20, 70, 60, 20], value: "[R]", color: "#CDE" }
  ]
};

var resetShip = function (ship) {
  ship.set({ type: 101 });
};

var delay = 600; //delay is 60 seconds
this.tick = function (game) {
  if (game.step % 60 === 0) {
    for (var i = 0; i < game.ships.length; i++) {
      var ship = game.ships[i];
      if (!ship.custom.reset_button_installed) {
        ship.custom.reset_button_installed = true;
        ship.setUIComponent(reset_button);
      }
    }
  }



  if (game.step < 300 + delay && game.step % 60 === 0) {
    game.addCollectible({ code: 21, x: 150, y: 150 }); //drops heavy mines
    ReduceAllAsteroids(game); //reduce in-game asteroids
  }

  if (game.step >= 7200 && game.step % 30 === 0) {
    killStationaryAsteroids(game); //eliminate in-game asteroids only after all asteroids spawned
  }

  if (game.step >= 300 + delay && game.step < 2700 + delay && (game.step - delay) % 60 === 0) {
    var angle = Math.random() * Math.PI * 2;
    var radius = 210 - Math.random() * 120;
    game.addAlien({ code: 11, level: 2, crystal_drop: 30, x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }); //40 Red Chickens
  }

  if (game.step >= 300 + delay && game.step < 2700 + delay && (game.step - delay) % 60 === 0) {
    var angle2 = Math.random() * Math.PI * 2;
    var radius2 = Math.random() * 30;
    game.addAsteroid({ x: Math.cos(angle2) * radius2, y: Math.sin(angle2) * radius2, vx: Math.random() * 0.2 - 0.1, vy: -0.6, size: 40 }); //40 Big Asteroids
  }

  if (game.step >= 7200 && game.step % 60 === 0) //killing any chickens that spawn in the real wave 1
  {
    killAllChickens(game);
  }

  if (game.step >= 300 + delay && game.step < 3900 + delay && (game.step - delay) % 720 == 300) {
    var angle3 = Math.random() * Math.PI * 2;
    var radius3 = 210 - Math.random() * 120;
    game.ships[0].setUIComponent({
      id: "reset",
      position: [0, 0, 0, 0],
      shortcut: undefined,
      visible: false,
    })
    game.addAlien({ code: 15, level: 0, crystal_drop: 150, x: Math.cos(angle3) * radius3, y: Math.sin(angle3) * radius3 }); //5 Yellow Hirsutes
  }

  if (game.step >= 3900 + delay && game.step < 7500 + delay && (game.step - delay) % 180 == 120) {
    var angle4 = Math.random() * Math.PI * 2;
    var radius4 = 210 - Math.random() * 120;
    game.addAlien({ code: 16, level: 2, crystal_drop: 60, x: Math.cos(angle4) * radius4, y: Math.sin(angle4) * radius4 }); //20 Red Piranhas
  }

  if (game.step >= 3900 + delay && game.step < 6300 + delay && (game.step - delay) % 60 === 0) {
    var angle5 = Math.random() * Math.PI * 2;
    var radius5 = 210 - Math.random() * 120;
    game.addAsteroid({ x: Math.cos(angle5) * radius5, y: Math.sin(angle5) * radius5, vx: Math.random() * 0.2 - 0.1, vy: -0.6, size: 20 }); //80 Small Asteroids
    var angle6 = Math.random() * Math.PI * 2;
    var radius6 = 210 - Math.random() * 120;
    game.addAsteroid({ x: Math.cos(angle6) * radius6, y: Math.sin(angle6) * radius6, vx: Math.random() * 0.2 - 0.1, vy: -0.6, size: 20 });
  }

  if (game.step == 7500 + delay) {
    var angle7 = Math.random() * Math.PI * 2;
    var radius7 = 210 - Math.random() * 120;

    game.addAlien({ code: 20, level: 1, crystal_drop: 2000, x: Math.cos(angle7) * radius7, y: Math.sin(angle7) * radius7 }); //1 Final Boss
  }
};

this.event = function (event, game) {
  switch (event.name) {
    case "ui_component_clicked":
      var ship = event.ship;
      var component = event.id;
      if (component == "reset")
        event.ship.set({ type: 605, shield: 800, crystals: 720, stats: 88888888, x: 150, y: 150, vx: 0, vy: 0 });
      break;

    case "alien_destroyed":
      if (event.alien.code == 11 && event.alien.level == 2) //spawns 4 Yellow Crabs per Red Crab
      {
        game.addAlien({ code: 11, level: 1, x: event.alien.x + event.alien.vx * 3, y: event.alien.y + event.alien.vy * 3, vx: event.alien.vx, vy: event.alien.vy, crystal_drop: 0 });
        game.addAlien({ code: 11, level: 1, x: event.alien.x - event.alien.vy * 3, y: event.alien.y + event.alien.vx * 3, vx: -1 * event.alien.vy, vy: event.alien.vx, crystal_drop: 0 });
        game.addAlien({ code: 11, level: 1, x: event.alien.x - event.alien.vx * 3, y: event.alien.y - event.alien.vy * 3, vx: -1 * event.alien.vx, vy: -1 * event.alien.vy, crystal_drop: 0 });
        game.addAlien({ code: 11, level: 1, x: event.alien.x + event.alien.vy * 3, y: event.alien.y - event.alien.vx * 3, vx: event.alien.vy, vy: -1 * event.alien.vx, crystal_drop: 0 });
      }
      else if (event.alien.code == 16 && event.alien.level == 2) //spawns 2 Yellow Piranhas per Red Piranha
      {
        game.addAlien({ code: 16, level: 1, x: event.alien.x - event.alien.vy * 3, y: event.alien.y + event.alien.vx * 3, vx: -1 * event.alien.vy, vy: event.alien.vx, crystal_drop: 0 });
        game.addAlien({ code: 16, level: 1, x: event.alien.x + event.alien.vy * 3, y: event.alien.y - event.alien.vx * 3, vx: event.alien.vy, vy: -1 * event.alien.vx, crystal_drop: 0 });
      }
      break;

    case "asteroid_destroyed":
      var collectibleArray = [10, 11, 12, 20, 21, 40, 41, 42];
      if (event.asteroid.size == 40) //deals with secondary drops in wave 10
      {
        var rand = Math.floor(Math.random() * 8);
        var cod = collectibleArray[rand];
        game.addCollectible({ code: cod, x: event.asteroid.x, y: event.asteroid.y });
      }
  }
};

killAllAliens = function (game) {
  for (var i = 0; i < game.aliens.length; i++) {
    game.aliens[i].set({ kill: true });
  }
};

killStationaryAsteroids = function (game) {
  for (var i = 0; i < game.asteroids.length; i++) {
    if (game.asteroids[i].vx === 0 && game.asteroids[i].vy === 0) {
      game.asteroids[i].set({ size: 1, kill: true });
    }
  }
};

ReduceAllAsteroids = function (game) {
  for (var i = 0; i < game.asteroids.length; i++) {
    game.asteroids[i].set({ size: 2 });
  }
};

killAllChickens = function (game) {
  for (var i = 0; i < game.aliens.length; i++) {
    if (game.aliens[i].code == 10) {
      game.aliens[i].set({ kill: true });
    }
  }
};