this.options = {
  max_players: 2,
  custom_map: "",
  friendly_colors: 2,
  map_name: "XO",
};
function Pieces(side, pos) {
  this.display = {};
  this.pos = pos;
  this.side = side;
  this.isClick = Object.assign(this.display, {
    clickable: false,
    components: [{ type: "text", position: [0, 0, 100, 100], value: side }],
  });
}
let board = {
  id: "board",
  position: [10, 10, 30, 40],
  visible: true,
  clickable: false,
  components: [],
};
