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
  if (game.step % 60 === 0) {
    for (let ship of game.ships) {
      if (!ship.custom.init) {
        ship.custom.init = true;
        ship.setUIComponent(Players_List);
        ship.custom.deaths = 0;
        ship.custom.frags = 0;
        ship.custom.view_players = false;
      }
    }
  }
  // do mod stuff here ; see documentation
};
function make_list(arrays, num) {
  let result = [], sub = [];
  for (let item of arrays) {
    sub.push(item);
    if (sub.length == num || arrays.indexOf(item) == arrays.length - 1) {
      result.push(sub);
      sub = [];
    }
  }
  return result;
}
this.event = function (event, game) {
  switch (event.id) {
    case 'players list':
      if (!event.ship.custom.view_players) {
        event.ship.custom.page = make_list(game.ships.sort((a, b) => b.score - a.score), 5)[0];
        let i = 0;
        for (let ship of event.ship.custom.page) {
          event.ship.setUIComponent({
            id: i,
            position: [25, 20.1 + i * 10, 40.1, 10],
            components: [
              { type: 'box', position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
              { type: 'text', position: [0, 0, 50, 50], value: `${ship.name}:`, color: '#fff' },
              { type: 'text', position: [50, 0, 50, 50], value: ship.score, color: '#fff' },
              { type: 'text', position: [0, 50, 50, 50], value: `KILLS: ${ship.custom.frags}`, align: 'center', color: '#fff' },
              { type: 'text', position: [50, 50, 50, 50], value: `DEATHS: ${ship.custom.deaths}`, align: 'center', color: '#fff' },
            ]
          });
          i++;
        }
      } else
        for (let i = 0; i < event.ship.custom.page.length; i++)
          event.ship.setUIComponent({ id: i, visible: false });


      event.ship.custom.view_players = !event.ship.custom.view_players;
      break;
  }
  switch (event.name) {
    case 'ship_destroyed':
      event.ship.custom.deaths++;
      event.killer.custom.frags++;

  }
};