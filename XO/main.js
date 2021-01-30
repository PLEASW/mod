this.options = {
  max_players: 2,
  custom_map: "",
  friendly_colors: 2,
};
function piece(pos, side) {
  this.pos = pos;
  this.side = side;
  this.display = {
    id: pos,
    position: [25.5 + pos[1] * 16.4, 5.7 + pos[0] * 26.3, 15.8, 25.5],
    clickable: true,
    visible: true,
    components: [{ type: "box", position: [0, 0, 100, 100], fill: "#4C4C4C" }],
  };
}
function setup() {
  let result = [];
  for (let i = 0; i < 3; i++)
    result.push([0, 0, 0].map((a, r) => new piece([i, r], undefined)));
  return result;
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
let round = {
  moves: 0,
  board: setup(),
  isWin: function () {
    let board = round.board.map((i) => i.map((j) => j.side));
    let checks = [
      board[0],
      board[1],
      board[2],
      board.map((i) => i[0]),
      board.map((i) => i[1]),
      board.map((i) => i[2]),
      [0, 1, 2].map((i) => board[i][i]),
      [0, 1, 2].map((i) => board[i][Math.abs(i - 2)]),
    ];
    for (let check of checks) {
      let a = false;
      for (let i of check) i !== undefined && (a = true);
      if (a && check[0] == check[1] && check[1] == check[2]) return true;
    }
  },
  winner: false,
};
this.tick = function (game) {
  for (let ship of game.ships) {
    round.board.flat().forEach((i) => {
      ship.setUIComponent(i.display);
    });
    if (!ship.custom.init) ship.setUIComponent(board);
    if (round.winner) ship.gameover({ "": "You lose!! :(" });
    else {
      ship.setUIComponent({
        id: "validMoves",
        position: [67, 40, 40, 5],
        clickable: false,
        visible: true,
        components: [
          {
            type: "text",
            position: [0, 0, 100, 100],
            color: "#fff",
            value:
              round.moves % 2 === ship.team ? "Your turn" : "Not your turn",
          },
        ],
      });
    }
  }
};
this.event = function (event, game) {
  switch (event.name) {
    case "ui_component_clicked":
      let box = round.board[event.id[0]][event.id[1]];
      let ship = event.ship;
      if (round.moves % 2 === ship.team) {
        round.moves++;
        box.display.clickable = false;
        box.side = ship.team;
        box.display.components.push({
          type: "text",
          position: [0, 0, 100, 100],
          value: ship.team ? "X" : "O",
          color: ship.team ? "#ff0" : "#0ff",
        });
        round.moves > 4 && (round.winner = round.isWin());
        if (round.winner) ship.gameover({ "": "You win!! :)" });
      }
      break;
  }
};
