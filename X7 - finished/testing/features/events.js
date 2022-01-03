const event = {
  adminWarp: function (ship, ships) {
    ships.forEach(ship => ship.set({ x: ship.x, y: ship.y, type: 102, collider: false }));
  },
  warps: function (ship, ships) {
    const { custom } = ship;
    custom.warpIndex ??= ships.indexOf(ship);

    do ships[++custom.warpIndex] ?? (custom.warpIndex = 0);
    while (game.ships.length > 1 && ships[custom.warpIndex] === ship);

    const { x, y } = ships[custom.warpIndex];
    ship.set({ x, y, collider: false, type: 102, stats: 88888800 });
  },
  ship_destroyed: function (ship) {
    Object.assign(ship.custom, { last_x: ship.x, last_y: ship.y })
  },
  ship_spawned: function (ship) {
    const { last_x: x = 0, last_y: y = 0 } = ship.custom;
    ship.set({ x, y, invulnerable: 300, crystals: shipFunc.shipCargo(ship.type) });
  }
}