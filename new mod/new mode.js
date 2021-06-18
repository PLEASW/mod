let options = {
  map_size: 100,
  radar_zoom: 5,
  friendly_colors: 2
};
const mapSize = options.map_size;
const radarZoom = options.radar_zoom;
const teamColors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 255, 1)'];

function RADAR(width, team) {
  this.width = width;
  this.team = team;
  this.components = [{ type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255, 255, 255, 0.1)' }];
  this.radar = { id: 'radar', position: [25, 5, 85 * 0.5625, 85], components: this.components };

  radarRadius = (mapSize * 10) / radarZoom, radarWidth = radarRadius * 10 / mapSize;
  this.posConvt = function (x, y) {
    return [x, -y].map((i, b) => (i + mapSize * 5 - b) / mapSize * 10 - this.width * 0.5);
  };
  this.ComponentForShip = function (ship) {
    let [x, y] = posConvt(ship.x, ship.y);
    return { type: 'box', position: [x, y, this.width, this.width], fill: teamColors[this.team] };
  };
  this.checkPos = function ([x, y, width], [X, Y]) {
    return x < X && X < x + width && y < Y && Y < y + width;
  };
  this.radarPosition = function (shipComponent) {
    let result = [];
    let [x, y] = shipComponent.position.slice(0, 2).map(i => i + this.width / 2 - this.radarWidth / 2);
    result.push([x, y, radarWidth]);
    let [xTest, yTest] = [
      [radarWidth + x > 100 ? x - 100 : x, x < 0 ? 100 + x : x],
      [radarWidth + y > 100 ? y - 100 : y, y < 0 ? 100 + y : y]
    ];
    for (let X of xTest) {
      if (X !== x) result.push([X, y]);
      for (let Y of yTest) {
        if (Y !== y) {
          result.push([x, Y]);
          if (X !== x) result.push([X, Y]);
        }
      }
    }
    return result.map(i => i.concat(radarWidth));
  };
  this.customComponent = function (position, color) {
    return { type: 'box', position: position, fill: color };
  };
  this.updateShipPosition = function (ships) {
    this.radar.components = this.components;
    let allies = ships.filter(value => value.team === this.team).map(ship => this.ComponentForShip(ship));
    let radars = allies.map(value => radarPosition(value));
    let enemies = ships.filter(value => value.team !== this.team).map(ship => this.ComponentForShip(ship));
    for (let enemy of enemies) for (let radar of radars)
      if (!this.checkPos(radar, enemy.position.slice(0, 2))) {
        enemies.filter(item => item !== enemy);
        break;
      }
    return [allies, enemies].flat();
  };
}
let radar1 = new RADAR(0.75, 0);
let radar2 = new RADAR(0.75, 1);
function tick(game) {
  if (game.step % 30 === 0) {
    radar1.radar.components.concat(radar1.updateShipPosition(game.ships));
    radar2.radar.components.concat(radar2.updateShipPosition(game.ships));
    game.ships.forEach((ship, index) => {
      if (game.step % 60 === 0) {
        if (!ship.custom.init) {
          ship.custom.init = true;
          ship.custom.view_radar = false;
          ship.setUIComponent({
            id: 'radar ui', position: [59.6, 0, 6.6, 4], clickable: true,
            components: [
              { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
              { type: "text", position: [0, 5, 100, 90], value: "Map", color: "#cde" },
            ]
          });
        }
      }
      if (ship.custom.view_radar) {
        console.log(ship.custom.view_radar);
        for (let radar of [radar2, radar1]) if (radar.team === ship.team)
          ship.setUIComponent(radar.radar);
        console.log(radar2, radar1);
      } else ship.setUIComponent({ id: 'radar', visible: false });
    });
  }
}
function event(event, game) {
  let ship = event.ship, id = event.id, name = event.name;
  switch (id) {
    case 'radar ui':
      ship.custom.view_radar = !ship.custom.view_radar;
  }
}

Object.assign(this, { options, tick, event })