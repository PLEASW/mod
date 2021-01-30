this.options = {
  max_players: 2,
  map_name: "chess",
  weapons_store: false,
  custom_map: [],
  friendly_colors: 2,
};
function Pieces(side, piece) {
  this.side = side;
  this.position = [];
  this.moved = false;
  this.captured = false;
  this.piece = piece;
  switch (this.piece) {
    case "♖":
    case "♜":
      this.hint = function (pos) {};
      this.castle = !this.moved;
      break;
    case "♘":
    case "♞":
      this.hint = function (pos) {};
      break;
    case "♗":
    case "♝":
      this.hint = function (pos) {};
      break;
    case "♕":
    case "♛":
      this.hint = function (pos) {};
      break;
    case "♔":
    case "♚":
      this.hint = function (pos) {};
      this.checkmate = false;
      this.castle = !this.moved;
      break;
    case "♙":
    case "♟︎":
      this.hint = function (pos) {};
      this.enPassant = false;
      break;
  }
}
let board = {
  moves: 0,
  setup: function () {
    let lines = [
      ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
      ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ];
    let board = [];
    board.push(lines[0].map((i) => new Pieces(0, i)));
    board.push(new Array(8).fill(new Pieces(0, "♙")));
    for (let i = 0; i < 4; i++)
      board.push(new Array(8).fill(new Pieces(0.5, "")));
    board.push(new Array(8).fill(new Pieces(1, "♟︎")));
    board.push(lines[1].map((i) => new Pieces(1, i)));
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++)
        board[i][j] && (board[i][j].position = [i, j]);
    console.log(board);
    return board;
  },
  display: function (board, side) {
    let [a, b] = [side ? board : board.reverse(), !side];
    a = board.map((row, x) => row.map((piece, y) => [x, y, piece])).flat();
    let display = {
      id: "board",
      position: [20, 7, 80, 100],
      clickble: false,
      visible: true,
      components: [],
    };
    let buttons = [];
    for (let piece of a) {
      display.components.push({
        type: "box",
        position: [piece[1] * 7, piece[0] * 10, 7, 10],
        fill:
          (piece[1] + piece[0]) % 2 === 0
            ? "rgb(70 82 94)"
            : "rgb(227 227 227)",
      });
      if (piece[2].side === side) {
        !piece[2].captured &&
          buttons.push({
            id: piece[2].position,
            position: [20 + piece[1] * 5.6, 7 + piece[0] * 10, 5.6, 10],
            visible: true,
            clickable: true,
            components: [
              {
                type: "text",
                position: [0, 0, 100, 100],
                value: piece[2].piece,
                color: "#fff",
              },
            ],
          });
      } else {
        !piece[2].captured &&
          display.components.push({
            type: "text",
            position: [piece[1] * 7, piece[0] * 10, 7, 10],
            value: piece[2].piece,
            color: "#000",
          });
      }
    }
    b && board.reverse();
    return [buttons].flat();
  },
};
let chessMap = board.setup();
console.log(chessMap);
let print = true;
this.tick = function (game) {
  if (game.step % 10 === 0) {
    if (game.ships.length && game.ships.length < 2) {
      game.ships[0].setUIComponent({
        id: "starting",
        position: [25, 0, 50, 20],
        visible: true,
        components: [
          {
            type: "text",
            position: [0, 0, 100, 100],
            value: "Wait for 2nd player...",
            color: "#fff",
          },
        ],
      });
      game.ships[0].custom.first = true;
    } else if (game.ships.length === 2) {
      for (let ship of game.ships) {
        if (ship.custom.first) {
          ship.custom.first = false;
          ship.setUIComponent({
            id: "starting",
            visible: false,
          });
        }
        board
          .display(chessMap, ship.team)
          .forEach((i) => ship.setUIComponent(i));
        ship.set({ idle: true, x: 0, y: 0 });
      }
    }
  }
};
this.event = function (event, game) {
  switch (event.name) {
    case "ui_component_clicked":
      let piece = event.id;
      console.log(piece);
      break;
  }
};
