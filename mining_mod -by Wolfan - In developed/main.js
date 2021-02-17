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
let scoreboard = {
  id: "scoreboard",
  components: [],
};
let upgrades = [
  {
    id: "9",
    position: [25, 0, 20, 10],
    visible: true,
    clickable: true,
    components: [{ type: "box", position: [0, 0, 100, 100] }],
  },
  {
    id: "0",
    position: [50, 0, 20, 10],
    visible: true,
    clickable: true,
    components: [{ type: "box", position: [0, 0, 100, 100] }],
  },
];
this.tick = function (game) {
  for (let ship of game.ships) {
    ship.setUIComponent(scoreboard);
    for (let upgrade of upgrades) ship.setUIComponent(upgrade);
  }
};
this.event = function (event, game) {};
