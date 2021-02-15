this.options = {
  map_size: 20,
  custom_map: "",
};
const square = 0.5625;
const a = 10;
let bird = {
  x: 0,
  y: 0,
  shape: [x, y, x + 5, y + 5],
  //    x,y ______ x + 5
  //       |      |
  //       |      |
  // y + 5 |______|
  display: {
    id: "bird",
    position: [x, y, 5 * square, 5],
    visible: true,
    components: [{ type: "box", position: [0, 0, 100, 100], fill: "#fff" }],
  },
};
