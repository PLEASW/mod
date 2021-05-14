const mapSize = 20;
var Mining_Pod_101 =
  '{"name":"Mining Pod","level":1,"model":1,"size":2,"zoom":0.5,"specs":{"shield":{"capacity":[75,100],"reload":[2,3]},"generator":{"capacity":[40,60],"reload":[10,15]},"ship":{"mass":60,"speed":[125,145],"rotation":[110,130],"acceleration":[100,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-43.30127018922194,-25.000000000000007,-3.061616997868383e-15,24.99999999999999,43.30127018922194,50,43.30127018922193,25.00000000000002,9.184850993605149e-15,-25.000000000000007],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,24.999999999999996,43.30127018922193,50,43.30127018922194,24.999999999999996,6.123233995736766e-15,-25.000000000000007,-43.301270189221924,-50,-43.30127018922193],"height":[0,24.999999999999996,43.30127018922193,50,43.30127018922194,24.999999999999996,6.123233995736766e-15,-25.000000000000007,-43.301270189221924,-50,-43.30127018922193],"propeller":false,"texture":[1,3,1,12,4]},"cannon":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-60,-30,0,30,55,60],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,10,15,10,15,10,0],"height":[0,10,15,10,15,10,0],"propeller":false,"texture":[4,63,1,1,1,4]}},"wings":{"main":{"length":[50,10],"width":[20,30,20],"angle":[45,45],"position":[0,0,0],"doubleside":true,"offset":{"x":0,"y":30,"z":0},"bump":{"position":30,"size":20},"texture":[63]},"main2":{"length":[50,10],"width":[20,30,15],"angle":[-45,-45],"position":[0,0,0],"doubleside":true,"offset":{"x":0,"y":30,"z":0},"bump":{"position":30,"size":20},"texture":[63]},"wing3":{"length":[20],"width":[50,30],"angle":[0,0],"position":[0,0],"doubleside":true,"offset":{"x":35,"y":0,"z":0},"bump":{"position":30,"size":40},"texture":[3]}},"typespec":{"name":"Mining Pod","level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[75,100],"reload":[2,3]},"generator":{"capacity":[40,60],"reload":[10,15]},"ship":{"mass":60,"speed":[125,145],"rotation":[110,130],"acceleration":[100,120]}},"shape":[2.405,2.433,2.273,1.962,2,1.978,1.94,1.955,2,2.04,2.28,2.271,2.217,2.217,2.271,2.28,2.04,2.097,2.327,2.332,2.293,2.074,1.962,2.179,2.331,2.4,2.331,2.179,1.962,2.074,2.293,2.332,2.327,2.097,2.04,2.28,2.271,2.217,2.217,2.271,2.28,2.04,2,1.955,1.94,1.978,2,1.962,2.273,2.433],"lasers":[],"radius":2.433}}';
var ships = [Mining_Pod_101];
const reset = function (size) {
  return Array(size).fill(0).map((i) => Array(size).fill(0));
};
var asteoidField = {
  a: reset(mapSize),
  b: (map) => {
    let result = "";
    for (let line of map) {
      let lines = "";
      for (let asteroid of line) lines += asteroid ? asteroid : " ";
      result += lines + "\n";
    }
    return result;
  },
};
this.options = {
  map_size: mapSize,
  custom_map: "",
  ships: ships,
  max_players: 1,
  reset_tree: 1,
  max_players: 10,
  radar_zoom: 10,
  invulnerable_ships: true,
};
let scoreboard = {
  id: "scoreboard",
  components: [, ,],
};
this.tick = function (game) {
  if (game.step % 60 === 0) {
    for (let ship of game.ships) {
      scoreboard.components[0] = {
        type: "text",
        position: [0, 0, 50, 10],
        value: `x : ${Math.trunc((mapSize * 5 + ship.x) / 10)}`,
        color: "#fff",
      };
      scoreboard.components[1] = {
        type: "text",
        position: [50, 0, 50, 10],
        value: `y : ${Math.trunc((mapSize * 5 - ship.y - 1) / 10)}`,
        color: "#fff",
      };
      ship.setUIComponent(scoreboard);
      !ship.custom.size && (ship.custom.size = 9);
      ship.setUIComponent({
        id: "reset",
        position: [70, 39, 10, 15],
        clickable: true,
        visible: true,
        components: [
          { type: "box", position: [0, 0, 100, 100], fill: "#2f3136" },
          {
            type: "text",
            position: [0, 0, 90, 100],
            value: "reset",
            color: "#c7d6de",
            align: "left",
          },
        ],
      });
      for (let i of ["Place", "Delete"])
        ship.setUIComponent({
          id: i + " asteroid",
          position: [87, 39 + ["Place", "Delete"].indexOf(i) * 7.5, 15, 7.5],
          clickable: true,
          visible: 1,
          components: [
            { type: "box", position: [0, 0, 100, 100], fill: "#2f3136" },
            {
              type: "text",
              position: [0, 0, 90, 100],
              value: i,
              color: "#c7d6de",
              align: "left",
            },
          ],
        });
      for (let i = 0; i < 10; i++)
        ship.setUIComponent({
          id: i,
          position: [0 + i * 8, 0, 8, 5],
          clickable: 1,
          visible: 1,
          components: [
            { type: "box", position: [0, 0, 100, 100], fill: "#2f3136" },
            {
              type: "text",
              position: [0, 0, 100, 100],
              value: !i ? "random" : i,
              color: "#c7d6de",
            },
          ],
        });
    }
  }
};
this.event = function (event, game) {
  switch (event.name) {
    case "ui_component_clicked":
      var [x, y] = [
        Math.trunc((mapSize * 5 + event.ship.x) / 10),
        Math.trunc((mapSize * 5 - event.ship.y - 1) / 10),
      ];
      if (event.id === "Place asteroid") {
        event.ship.custom.random &&
          (event.ship.custom.size = ~~(Math.random() * 9 + 1));
        asteoidField.a[y][x] = event.ship.custom.size;
      } else if (typeof event.id == "number") {
        event.ship.custom.random = !event.id;
        event.ship.custom.size = event.id;
      } else if (event.id == "Delete asteroid") asteoidField.a[y][x] = 0;
      else if (event.id == "reset") asteoidField.a = reset(mapSize);
      game.setCustomMap(asteoidField.b(asteoidField.a));
      break;
  }
};
