// show all ships
const teamColors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 255, 1)'];
const lightRadar = (ships, teamColors, width) => ships.map(ship => {
  return {
    type: 'box',
    position: [ship.x, -ship.y].map((i, b) =>
      (i + options.map_size * 5 - b) / options.map_size * 10 - width * 0.5).concat([width, width]),
    fill: teamColors[ship.team]
  };
});

// radar vision
const teamColors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 255, 1)'];
const radarRadius = (options.map_size * 10) / options.radar_zoom;
const radarWidth = radarRadius * 10 / options.map_size;
const MedRadar = function (ships, teamColors, width, team) {
  function ComponentForShip(ship, width) {
    return {
      type: 'box', fill: teamColors[ship.team],
      position: [ship.x, -ship.y].map((i, b) =>
        (i + options.map_size * 5 - b) / options.map_size * 10 - width * 0.5).concat([width, width])
    };
  }
  let result = ships.filter(ship => ship.team === team).map(ship => ComponentForShip(ship, width));
  let radars = result.map(ship => {
    let result = [];
    let [x, y] = ship.position.slice(0, 2).map(i => i + width / 2 - radarWidth / 2);
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
  let enemies = ships.filter(ship => ship.team !== team).map(ship => ComponentForShip(ship, width));
  for (let enemy of enemies) for (let radar of radars) {
    let [x, y, w] = radar, [X, Y] = enemy.position.slice(0, 2);
    if (x < X && X < x + w && y < Y && Y < y + w) {
      result.push(enemy);
      break;
    }
  }
  return result;
};

