let options = {
  map_size: 100,
  radar_zoom: 5,
  friendly_colors: 2
};
const teamColors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 255, 1)'];
const lightRadar = (ships, teamColors, width) => ships.map(ship => {
  return {
    type: 'box',
    position: [ship.x, -ship.y].map((i, b) =>
      (i + options.map_size * 5 - b) / options.map_size * 10 - width * 0.5).concat([width, width]),
    fill: teamColors[ship.team]
  };
});
let radar = {
  id: 'radar',
  position: [25, 5, 85 * 0.5625, 85],
  components: []
};
function tick(game) {
  if (game.step % 60 === 0) {
    game.ships.forEach((ship, index) => {
      radar.components = [
        { type: 'box', position: [0, 0, 100, 100], fill: 'rgba(100, 100, 100, 0.2)', stroke: "#cde", width: 1 }
      ].concat(lightRadar(game.ships, teamColors, 0.75));
      ship.setUIComponent(radar);
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

Object.assign(this, { options, tick, event });