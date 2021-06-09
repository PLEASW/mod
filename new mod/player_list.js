addBots = number => { for (let i = 0; i < number; i++) Bot.create(); };
this.options = {
  // see documentation for options reference
  root_mode: "survival",
  map_size: 30
};
const Players_List = {
  id: 'players list',
  position: [73, 4.1, 6.6, 4],
  clickable: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
    { type: "text", position: [0, 5, 100, 90], value: "Players", color: "#cde" },
  ]
};
this.tick = function (game) {
  for (let ship of game.ships) {
    if (!ship.custom.init) {
      ship.custom.init = true;
      ship.setUIComponent(Players_List);
      ship.custom.deaths = 0;
      ship.custom.frags = 0;

    }
  }
  // do mod stuff here ; see documentation
};
function make_list(arrays, num) {
  let result = [];
  let sub = []
  for (let item of arrays) {
    sub.push(item);
    if (sub.length == num || arrays.indexOf(item) == arrays.length - 1) result.push(sub);
  }
  return result;
}
this.event = function (event, game) {
  switch (event.id) {
    case 'players list':
      let ships = make_list(game.ships.sort((a, b) => a.score - b.score), 5);
      for (let ship of ships[0]) {
        console.log(ship)
      }
      break;
  }
  switch (event.name) {
    case 'ship_destroyed':
      event.ship.custom.deaths++;
      event.killer.custom.frags++;

  }
};