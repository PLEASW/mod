this.options = {
  max_players: 2,
  custom_map: "",
};
function piece(pos, ticked, side) {
  this.side = side;
  this.pos = pos;
  this.tick = ticked;
  this.display = {
    id: pos,
    position: [25 + pos[1] * 8, 5 + pos[0] * 14, 8, 14],
    clickable: !this.tick,
    visible: true,
    components: [
      { type: "box", position: [0, 0, 100, 100], fill: "#4C4C4C" },
      !this.tick || {
        type: "text",
        position: [0, 0, 100, 100],
        value: this.tick ? "X" : "O",
        color: this.side ? "#ff0" : "#0ff",
      },
    ],
  };
}
let board = {
  id: "board",
  position: [25, 5, 50, 80],
  visible: true,
  clickable: false,
  components: [
    {
      type: "box",
      position: [0, 0, 100, 100],
      fill: "#4C4C4C",
      stroke: "#25bdb1",
      width: 15,
    },
    { type: "box", position: [32.5, 0, 1, 100], fill: "#25bdb1" },
    { type: "box", position: [65.5, 0, 1, 100], fill: "#25bdb1" },
    { type: "box", position: [0, 32.5, 100, 1], fill: "#25bdb1" },
    { type: "box", position: [0, 65.5, 100, 1], fill: "#25bdb1" },
  ],
};
let game = {
  moves: 0,
  board: [],
};
this.tick = function (game) {
  for (let ship of game.ships) ship.setUIComponent(board);
};
this.event = function (event, game) {};
