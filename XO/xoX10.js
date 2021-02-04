this.options = {
  max_players: 2,
  custom_map: "",
  friendly_colors: 2,
  map_name: "XO",
};

const square = 0.5625;
// board
const numberBoxes = 10;
const boardWidth = 90;
// pixel
const PieceSize = 8;

function Pieces(pos, side) {
  this.display = {
    id: pos,
    position: [
      25.5 + pos[1] * (PieceSize + 1) * square,
      5.95 + pos[0] * (PieceSize + 1),
      PieceSize * square,
      PieceSize,
    ],
    clickable: true,
    visible: true,
    components: [{ type: "box", position: [0, 0, 100, 100], fill: "#4C4C4C" }],
  };
  this.pos = pos;
  this.side = side;
  this.isClick = function () {
    Object.assign(this.display, {
      clickable: false,
      components: [{ type: "text", position: [0, 0, 100, 100], value: side }],
    });
  };
}

let board = {
  id: "board",
  position: [25, 5, boardWidth * square, boardWidth],
  visible: true,
  clickable: false,
  components: [
    {
      type: "box",
      position: [0, 0, 100, 100],
      fill: "#4C4C4C",
      width: 100 / numberBoxes,
      stroke: "#25bdb1",
    },
  ],
};
for (let i = 1; i <= numberBoxes - 1; i++) {
  board.components.push({
    type: "box",
    position: [0, 0 + i * (100 / numberBoxes), 100, 1],
    fill: "#25bdb1",
  });
  board.components.push({
    type: "box",
    position: [0 + i * (100 / numberBoxes), 0, 1, 100],
    fill: "#25bdb1",
  });
}
function setup(boxes) {
  let result = [];
  for (let i = 0; i < boxes; i++)
    result.push(
      Array(boxes)
        .fill(i)
        .map((i, r) => new Pieces([i, r], undefined))
    );
  return result;
}
let round = {
  moves: 0,
  rounds: 0,
  board: setup(widthBox),
};
this.tick = function (game) {
  for (let ship of game.ships) {
    for (let box of round.board.flat()) ship.setUIComponent(box.display);
    if (!ship.custom.init) {
      ship.setUIComponent(board);
      ship.custom.init = true;
    }
  }
};
