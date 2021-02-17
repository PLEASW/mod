const upgrade = 800; //  gem upgrade for tier 3

let gem_upgrade = [upgrade];
for (let i = 1; i < 4; i++) gem_upgrade[i] = gem_upgrade[i - 1] * 2;
let ship_cargo = Array(7)
  .fill(0)
  .map((i, r) => r ** 2 * 20);
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
this.tick = function (game) {
  for (let ship of game.ships) {
    ship.setUIComponent(scoreboard);
  }
};
this.event = function (event, game) {};
console.log(gem_upgrade);
console.log(ship_cargo);
