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
}
// Game function
const posConvt2 = function (x, y) {
  [x, y] = [x, y].map(i => i + width * 0.5);
  return [x - 50, 50 - y].map((i, b) => i * mapSize / 10 - b);
};
// Radar
{
  const teamColors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 255, 1)'];
  const radarRadius = (options.map_size * 10) / options.radar_zoom;
  const radarWidth = radarRadius * 10 / options.map_size;
  const MedRadar = function (ships, width, team, tColors = teamColors) {
    function ComponentForShip(ship, width) {
      return {
        type: 'box', fill: tColors[ship.team],
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
}
// Yard
{
  var decorateShownBox = function (position) {
    return { type: "box", position: position, stroke: "#cde", width: 1, fill: "rgba(255, 255, 255, 0.4)" };
  };
  var decorateHiddenBox = function (position) {
    return null;
  };
  var decorateBox = function (box) {
    return (box.shown ? decorateShownBox : decorateHiddenBox)(box.position);
  };
  function createYard(fillAll = false, maxWidth = 25, maxHeight = 25) {
    // do whatever you want with the box's position here
    // `data` is an object storing all boxes' positions
    let data = [];
    let rand = function (num) {
      return Math.floor(Math.random() * num);
    };
    let addBox = function (pos) {
      // push positions to data array
      data.push({ shown: (fillAll || rand(2)), position: pos });
    };
    let matrix = new Array(101).fill(0).map(i => new Array(101).fill(0));
    let isCorner = function (i, j) {
      // check if point [i,j] belongs to a corner or not
      if (isFilled(i, j)) return false; // already filled?
      // we only check for the upper left corner types because the main checker iteration will go from the top to the bottom and from left to right
      return isFilled(i - 1, j) && isFilled(i - 1, j - 1) && isFilled(i, j - 1);
    };
    let fillRect = function (i, j, width, height) {
      // fill the specified rectangle and push data
      for (let ix = 0; ix < height; ix++) {
        for (let jx = 0; jx < width; jx++) {
          matrix[i + ix][j + jx] = 1;
        }
      }
      // remember that the vectors in 2d array dimension is actually swapped compared to the original 2D Eculid plane so we need to convert it
      addBox([j, i, width, height]);
    };
    let isFilled = function (i, j) {
      // returns true if the point is filled or out of bound, false otherwise
      return !((matrix[i] || [])[j] === 0);
    };
    let checkMatrix = function () {
      // returns position of the closet corner point or null if found none
      for (let i = 0; i < 100; i++) for (let j = 0; j < 100; j++)
        if (isCorner(i, j)) return [i, j];
      return null;
    };
    let found = checkMatrix();
    while (found) {
      let [i, j] = found, width = 0, height = Math.min(maxHeight, 100 - i);
      while (!isFilled(i, j + width) && width < maxWidth) width++;
      width--;
      fillRect(i, j, rand(width) + 1 + Math.random() / 200, rand(height) + 1 + Math.random() / 200);
      // trigger the search again
      found = checkMatrix();
    }
    return data;
  }
}
// game setup
const radar = {
  id: 'radar',
  position: [25, 5, 85 * 0.5625, 85],
  components: []
}
const cube = {
  id: 'cube',
  obj: 'https://raw.githubusercontent.com/DoDucMinh1608/mod/d4e661e938d16f801b92642bb963a4f0fc433574/objects/3d%20objects/starblast-1623317372448.obj',
  diffuse: 'https://raw.githubusercontent.com/DoDucMinh1608/mod/be3efd8867d733902d1ef607c30d0a1a0739999d/objects/ship_diffuse.png',
  specularColor: 0x000000
}
const cubeTeam1 = {
  id: 'cube',
  obj: 'https://raw.githubusercontent.com/DoDucMinh1608/mod/d4e661e938d16f801b92642bb963a4f0fc433574/objects/3d%20objects/starblast-1623317372448.obj',
  diffuse: 'https://raw.githubusercontent.com/DoDucMinh1608/mod/be3efd8867d733902d1ef607c30d0a1a0739999d/objects/ship_diffuse.png',
  specularColor: 0x00FFFF
}
const cubeTeam2 = {
  id: 'cube',
  obj: 'https://raw.githubusercontent.com/DoDucMinh1608/mod/d4e661e938d16f801b92642bb963a4f0fc433574/objects/3d%20objects/starblast-1623317372448.obj',
  diffuse: 'https://raw.githubusercontent.com/DoDucMinh1608/mod/be3efd8867d733902d1ef607c30d0a1a0739999d/objects/ship_diffuse.png',
  specularColor: 0xFF0000
}
game.custom.Yards = createYard().map((i, index) => {
  let [x, y] = posConvt2(...i.slice(0, 2)),
    [width, height] = [5893 * index[2] / 100, 5893 * index[3] / 100];
  return component = {
    position: i,
    ui: decorateBox(i),
    object: {
      id: index, type: cube,
      position: { x: x, y: y, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: width, y: height, z: 1 }
    },
    team: null,
    aliensSpawn: { x: x + width / 2, y: y + width / 2 },
  };
})

game.custom.data = [];
game.custom.team1Capture = [];
game.custom.team2Capture = [];

const tick = function (game) {
  if (game.step % 30 === 0) {
    // Update the radar for 2 team.
    var radar1 = Object.assign(radar, { components: MedRadar(game.ships, 0.75, 0).concat(game.custom.Yards) });
    var radar2 = Object.assign(radar, { components: MedRadar(game.ships, 0.75, 1) });
  }
}

const event = function (event, game) { }

Object.assign(this, { options, tick, event });