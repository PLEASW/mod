// show all ships
; (function () {
  game.radar = (teamColors) => {
    return {
      id: 'radar',
      position: [25, 5, 85 * 0.5625, 85],
      components: [
        { type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255, 255, 255, 0.2)', stroke: "#cde", width: 2 }
      ].concat(game.ships.map(ship => {
        return {
          type: 'box', fill: teamColors[ship.team],
          position: [ship.x, -ship.y].map((i, b) =>
            (i + game.options.map_size * 5 - b) / game.options.map_size * 10 - 0.75 * 0.5).concat([0.75, 0.75])
        };
      }))
    };
  };
})();
const map = {
  id: 'Map',
  position: [0, 0, 100, 100],
  components: [{ type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255,255,255,0.2)', stroke: 'rgb(255,255,255', width: 5 }]
}
function mapToComponent(x, y, { map_size }, width) {
  return [x, -y].map((i, b) => (i + map_size * 5 - b) / map_size * 10 - width * 0.5);
};
function updateMap(ui, game, ship, width = 1, others = {}) {
  return {
    ...ui, components: ui.components.concat(game.ships.map(component => {
      return {
        type: 'box', position: [...mapToComponent(component.x, component.y, game.options, width), width, width],
        fill: ship === component ? 'rgb(255,255,255)' : others[component.custom] || 'rgb(200,200,200)',
      };
    }))
  }
}
// radar vision
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