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