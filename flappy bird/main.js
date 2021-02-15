this.options = {
  map_size: 20,
  custom_map: "",
};
const square = 0.5625;
const g = 10;
function Bird(x, y, width) {
  this.x = x;
  this.y = y;
  this.shape = [];
  this.display = {
    id: "bird",
    position: [this.x, this.y, width * square, width],
    visible: true,
    components: [{ type: "box", position: [0, 0, 100, 100], fill: "#fff" }],
  };
}
this.tick = function (game) {};
this.event = function (event, game) {};
