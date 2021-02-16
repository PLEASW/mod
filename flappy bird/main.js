this.options = {
  map_size: 20,
  custom_map: "",
  weapons_store: false,
};
const square = 0.5625;
const g = 2000;
const tick = 1 / 60;
function Bird(width = 5) {
  this.x = 35;
  this.y = 100 / 2 + width;
  this.vy = 0;
  this.ay = 0;
  this.width = width;
  this.shape = [];
  this.display = {
    id: "bird",
    position: [this.x, this.y, this.width * square, this.width],
    visible: true,
    components: [{ type: "box", position: [0, 0, 100, 100], fill: "#51a5c7" }],
  };
}
function Pipe(id, width = 5) {
  this.x = 100;
  this.y = 30 + ~~(Math.random() * 41);
  this.vy = 20;
  this.width = width;
  this.display = {
    id: id,
    position: [this.x, 0, this.width, 100],
    visible: true,
    components: [
      { type: "box", position: [0, 0, 100, this.y - 17], fill: "#36393f" },
      {
        type: "box",
        position: [0, this.y + 17, 100, 100 - this.y + 20],
        fill: "#36393f",
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
      ship.custom.pipes = [new Pipe()];
      ship.custom.pipes.y = 70;
      ship.custom.bird = new Bird();
      ship.setUIComponent(button);
      ship.setUIComponent({
        id: "starting",
        position: [0, 70, 100, 20],
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
    if (ship.custom.start) {
      let bird = ship.custom.bird;
      let pipes = ship.custom.pipes;
      if (game.step % 60 === 0 && game.step > ship.custom.start + 5 * 60) {
        pipes.push(new Pipe(~~(game.step / 60)));
      }
      if (!(bird.y > 100 - bird.width) || bird.vy + bird.ay * tick < 0) {
        bird.y += bird.vy * tick;
        bird.vy += bird.ay * tick;
        bird.ay += g * tick;
      } else {
        bird.y = 100 - bird.width;
        [bird.ay, bird.vy] = [0, 0];
      }
      bird.display.position[0] = bird.x;
      bird.display.position[1] = bird.y;
      for (let pipe of pipes) {
        pipe.x -= 40 * tick;
        if (pipe.x <= -pipe.width) {
          pipes.shift();
          pipe.display.visible = false;
        }
        pipe.display.position[0] = pipe.x;
        ship.setUIComponent(pipe.display);
      }
      ship.setUIComponent(bird.display);
    }
  }
};

this.event = function (event, game) {
  let ship = event.ship;
  switch (event.id) {
    case "button":
      ship.setUIComponent({ id: "starting", visible: false });
      ship.custom.bird.ay = -500;
      ship.custom.bird.vy = 0;
      if (!ship.custom.start) ship.custom.start = game.step;
      break;
  }
};
