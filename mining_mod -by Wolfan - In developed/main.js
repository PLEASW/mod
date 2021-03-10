// setup
let base_cargo = 100; //  gem upgrade for tier 3
const ship_cargo = Array(7).fill(0).map((i, r) => (r + 1) ** 2 * 20);

this.options = {
  weapons_store: false,
  crystal_value: 10,
  map_size: 100,
  release_crystal: true,
  asteroids_strength: 0.1
};
let upgrades = [
  { id: "9", position: [25, 0, 40, 10], visible: true, clickable: true, shortcut: "9", components: [{ type: "box", position: [0, 0, 100, 100] }] },
  { id: "0", position: [25, 0, 40, 10], visible: true, clickable: true, shortcut: "0", components: [{ type: "box", position: [0, 0, 100, 100] }] }
];
const donate = {
  id: "donate", position: [92, 46.5, 8, 7], visible: true, clickable: true, shortcut: "W",
  components: [{ type: "box", position: [0, 0, 100, 100], fill: "#18645b34" }, { type: "text", position: [0, 0, 100, 100], value: "W", color: "#099" }]
};
let scoreboard = {
  id: "scoreboard", components: [
    { type: "box", position: [0, 0, 7, 100], fill: "#242526" }, // full bar
    { type: "box", position: [1, 0, 5, 0], fill: "#000" }, // progress bar
    { type: "text", position: [7, 0, 7, 7], value: 0, color: "#fff" }, // starter value
    { type: "text", position: [7, 93, 100, 8], value: base_cargo, color: "#fff", align: 'left' } // max value
  ],
};
this.tick = function (game) {
  if (game.step % 10 === 0) {
    game.ships.forEach((ship, i) => {
      if (!ship.custom.init) {
        ship.custom.donated = false; // donate or not
        ship.custom.credit = 0; // credit
        ship.custom.donate = 0; // gem donated
        ship.custom.tier_allow = 3;
        ship.custom.gem_donate = 1;
        ship.custom.init = true;
      }
      if (ship.type > ship.custom.gem_donate * 100) ship.custom.gem_donate = Math.trunc(ship.type / 100); // amount of gem donate each tier
      if (ship.custom.donated) {
        if (ship.custom.donate > base_cargo) { // check if the gem donate reach the highest value
          ship.custom.tier_allow++;
          if (ship.custom.tier_allow < 6)
            (ship.custom.donate -= base_cargo, base_cargo *= 2, scoreboard.components[3].value = base_cargo);
        }
        let crystals = ship.crystals > ship.custom.gem_donate ? ship.custom.gem_donate : ship.crystals;
        ship.custom.credit += crystals; ship.custom.donate += crystals;
        ship.set({ idle: true, vx: 0, vy: 0, score: ship.score + crystals, crystals: ship.crystals - crystals });
      } else ship.set({ idle: false });
      scoreboard.components[1].position[3] = (ship.custom.donate / base_cargo) * 100;
      ship.setUIComponent(scoreboard);
      if (ship.type > ship.custom.tier_allow * 100 && ship.crystals == ship_cargo[Math.trunc(ship.type / 100) - 1])
        upgrades.forEach(i => ship.setUIComponent(i));
      else upgrades.forEach(i => ship.setUIComponent({ id: i.id, visible: false }));
      ship.setUIComponent(donate);
    });
  }
};
this.event = function (event, game) {
  let ship = event.ship;
  switch (event.id) {
    case "donate":
      ship.custom.donated = !ship.custom.donated;
      break;
  }
};
