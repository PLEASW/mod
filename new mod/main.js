const options = {
  map_size: 100,
  max_players: 20,
  crystal_value: 5,
  friendly_colors: 2,
  map_name: 'Test',
  starting_ship: 800,
  starting_ship_maxed: true,
  asteroids_strength: 0.8,
  speed_mod: 1.25,
  map_density: 2,
  crystal_drop: 0,
  release_crystal: true,
  mines_self_destroy: false,
  weapons_store: false,
  radar_zoom: 5,
};
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
const tick = function (game) {
  if (game.step % 30 === 0) {
    if (!!game.ships.length) game.ships[0].setUIComponent(game.MedRadar(['rgba(255, 0, 0, 1)', 'rgba(0, 255, 255, 1)', rgba(0, 255, 0, 1)], game.ships[0].team));
  }
};
//-----------------------------------------------------------------------------------------
const event = function (event, game) { }
//-----------------------------------------------------------------------------------------
Object.assign(this, { options, tick, event });
//-----------------------------------------------------------------------------------------
; (function () {
  game.radar = function (teamColors, team) {
    if (typeof teamColors !== "object") return [];
    const radarRadius = (game.options.map_size * 10) / game.options.radar_zoom;
    const radarWidth = radarRadius * 10 / game.options.map_size;
    function ComponentForShip(ship) {
      return {
        type: 'box', fill: teamColors[ship.team],
        position: [ship.x, -ship.y].map((i, b) =>
          (i + game.options.map_size * 5 - b) / game.options.map_size * 10 - 0.75 * 0.5).concat([0.75, 0.75])
      };
    }
    let result = [
      { type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255, 255, 255, 0.2)', stroke: "#cde", width: 2 }
    ].concat(game.ships.filter(ship => ship.team === team).map(ship => ComponentForShip(ship)));
    let radars = result.slice(1).map(ship => {
      let result = [];
      let [x, y] = ship.position.slice(0, 2).map(i => i + 0.75 / 2 - radarWidth / 2);
      result.push([x, y, radarWidth]);
      let [xTest, yTest] = [
        [radarWidth + x > 100 ? x - 100 : x, x < 0 ? 100 + x : x],
        [radarWidth + y > 100 ? y - 100 : y, y < 0 ? 100 + y : y]
      ];
      for (let X of xTest) {
        if (X !== x) result.push([X, y, radarWidth]);
        for (let Y of yTest) {
          if (Y !== y) {
            result.push([x, Y, radarWidth]);
            if (X !== x) result.push([X, Y, radarWidth]);
          }
        }
      }
      return result;
    }).flat();
    let enemies = game.ships.filter(ship => ship.team !== team).map(ship => ComponentForShip(ship));
    for (let enemy of enemies) for (let radar of radars) {
      let [x, y, w] = radar, [X, Y] = enemy.position.slice(0, 2);
      if (x < X && X < x + w && y < Y && Y < y + w) {
        result.push(enemy);
        break;
      }
    }
    return {
      id: 'radar',
      position: [25, 5, 85 * 0.5625, 85],
      components: result
    };
  };
})();