function RADAR(width, team) {
  this.width = width;
  this.team = team;
  this.components = [{ type: 'box', position: [0, 0, 100, 100], fill: 'rgba(100, 100, 100, 0.2)', stroke: "#cde", width: 1 }];
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