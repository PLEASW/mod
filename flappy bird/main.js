this.options = {
  map_size: 20,
  custom_map: "",
};
const square = 0.5625;
const g = 10;
const tick = 1 / 60;
function Bird(width) {
  this.x = 35;
  this.y = 100 / 2 + width;
  this.vy = 0;
  this.shape = [];
  this.display = {
    id: "bird",
    position: [this.x, this.y, width * square, width],
    visible: true,
    components: [{ type: "box", position: [0, 0, 100, 100], fill: "#fff" }],
  };
}
function pipes(id) {
  this.x = 100;
  this.y = 20 + ~~(Math.random() * 41);
  this.display = {
    id: id,
    position: [this.x, 0, 5, 100],
    visible: true,
    components: [
      { type: "box", position: [0, 0, 100, this.y - 20], fill: "#fff" },
      {
        type: "box",
        position: [0, this.y + 20, 100, 100 - this.y + 20],
        fill: "#fff",
      },
    ],
  };
}
let button = {
  id: "button",
  position: [0, 0, 0, 0],
  visible: true,
  clickable: true,
  shortcut: "W",
};
this.tick = function (game) {
  for (let ship of game.ships) {
    if (!ship.custom.init) {
      ship.custom.init = true;
      ship.custom.pipe = [];
      ship.custom.bird = new Bird(5);
      ship.setUIComponent(button);
      ship.setUIComponent({
        id: "starting",
        position: [0, 80, 100, 20],
        visible: true,
        components: [
          {
            type: "text",
            position: [0, 0, 100, 100],
            value: "Press W to begin",
            color: "#fff",
          },
        ],
      });
    }
    ship.setUIComponent(ship.custom.bird.display);
  }
};
this.event = function (event, game) {
  let ship = event.ship;
  switch (event.id) {
    case "button":
      ship.setUIComponent({ id: "starting", visible: false });
      break;
  }
};
