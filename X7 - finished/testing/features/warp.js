this.options = {}
const sendUI = function (ship, UI) {
  if (ship != null && typeof ship.setUIComponent == "function") {
    if (UI.visible || UI.visible == null) ship.setUIComponent(UI);
    else ship.setUIComponent({ id: UI.id, position: [0, 0, 0, 0], visible: false });
  }
};

this.tick = function (game) {
  if (game.step % 60 === 0) {
    sendUI(ship, {
      id: 'admin_warp',
      position: [20, 0, 10, 10],
      clickable: true,
      visible: true,
      components: [
        { type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255,255,255,0.4)' },
        { type: 'text', position: [0, 0, 100, 100], value: 'WARP' }
      ]
    })
  }
}
this.event = function (event, game) {
  let { id: component, ship } = event;
  switch (component) {
    case 'admin_warp':
      const { x, y } = ship;
      game.ships.forEach(ship => ship.set({ x, y }));
      break;
  }
}