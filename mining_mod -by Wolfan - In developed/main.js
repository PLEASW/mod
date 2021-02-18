const upgrade = 800; //  gem upgrade for tier 3
let gem_upgrade = [upgrade];
for (let i = 1; i < 4; i++) gem_upgrade[i] = gem_upgrade[i - 1] * 2;
let ship_cargo = Array(7)
  .fill(0)
  .map((i, r) => (r + 1) ** 2 * 20);
this.options = {
  weapons_store: false,
  crystal_value: 10,
  map_size: 100,
  release_crystal: true,
};

let upgrades = [
  {
    id: "9",
    position: [25, 0, 20, 10],
    visible: true,
    clickable: true,
    shortcut: "9",
    components: [{ type: "box", position: [0, 0, 100, 100] }],
  },
  {
    id: "0",
    position: [50, 0, 20, 10],
    visible: true,
    clickable: true,
    shortcut: "0",
    components: [{ type: "box", position: [0, 0, 100, 100] }],
  },
];
let donate = {
  id: "donate",
  position: [92, 46.5, 8, 7],
  visible: true,
  clickable: true,
  shortcut: "W",
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "#18645b34" },
    { type: "text", position: [0, 0, 100, 100], value: "W", color: "#099" },
  ],
};
let scoreboard = {
  id: "scoreboard",
  components: [
    { type: "box", position: [0, 0, 7, 100], fill: "#242526" },
    { type: "box", position: [1, 0, 5, 0], fill: "#000" },
    { type: "text", position: [7, 0, 7, 7], value: 0, color: "#fff" },
    {
      type: "text",
      position: [7, 94, 8, 8],
      value: gem_upgrade[0],
      color: "#fff",
    },
    { type: "text", position: [1, 0, 5, 10], value: 0, color: "#fff" },
  ],
};
this.tick = function (game) {
  for (let ship of game.ships) {
    if (!ship.custom.init) {
      ship.custom.donated = false; // donate or not
      ship.custom.init = true;
      ship.custom.credit = 0; // credit
      ship.custom.donate = 0; // gem donated
      ship.custom.gem_donate = ~~(ship.type / 100); // amount of gem donate each tier
    }
    if (ship.custom.donated) {
      let [score, crystals] = Array(2).fill(
        ship.crystals > ship.custom.gem_donate
          ? ship.custom.gem_donate
          : ship.crystals
      );
      ship.custom.credit += crystals;
      ship.custom.donate += crystals;
      ship.set({
        idle: true,
        vx: 0,
        vy: 0,
        score: ship.score + score,
        crystals: ship.crystals - crystals,
      });
    } else ship.set({ idle: false });
    // scoreboard.components[1].position[3] = (ship.custom.donate / 800) * 100;
    // scoreboard.components[4].value = ship.custom.donate;
    // scoreboard.components[4].position[3] =
    //   scoreboard.components[1].position[3] - 10 > 0
    //     ? scoreboard.components[1].position[3] - 10
    //     : 0;
    ship.setUIComponent(scoreboard);
    for (let upgrade of upgrades) ship.setUIComponent(upgrade);
    ship.setUIComponent(donate);
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
