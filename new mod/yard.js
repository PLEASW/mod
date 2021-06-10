var maxpoints = 60; // maximum points available
var minheight = 7; // minimum height of the boxes
var minwidth = 5; // minimum width of the boxes
var fillAll = false; // fill all blocks or not
var decorateBox = function (position) {
  return { type: "box", position: position, stroke: "#cde", width: 1, fill: "green" };
};
// do whatever you want with the box's position here
// `data` is an object stored all boxes' positions


var rand = function (num) {
  return Math.floor(Math.random() * num);
};
var addBox = function (pos) {
  (fillAll || rand(2)) && data.push(pos);
};
var yieldsh = Math.trunc(100 / minheight), yieldsw = Math.trunc(100 / minwidth);
var data = [];
var randoms = new Array(yieldsw).fill(0).map((i, x) => new Array(yieldsh).fill(0).map((j, y) => [x * minwidth, y * minheight])).flat();
randoms.splice(0, 1);
//create a random set of points on the 100x100 grid
maxpoints = Math.min(yieldsw * yieldsh - 1, maxpoints);
while (randoms.length > maxpoints) randoms.splice(rand(randoms.length), 1);
randoms.sort((a, b) => a[1] - b[1]);

var startx = 0, starty = 0;
while (randoms.length > 0) {
  let curpos = randoms[0], nextpos = randoms[1] || [];
  addBox([startx, starty, curpos[0] - startx, curpos[1] - starty]);
  startx = curpos[0];
  if (curpos[1] != nextpos[1]) {
    addBox([startx, starty, 100 - startx, curpos[1] - starty]);
    startx = 0;
    starty = curpos[1];
  }
  randoms.splice(0, 1);
}
if (starty < 100) addBox([0, starty, 100, 100 - starty]);
this.tick = function (game) {
  if (game.step % 60 === 0) {
    for (let t of [/*"map"*/, "radar_background"]) game.setUIComponent({
      id: t,
      visible: true,
      position: [25, 5, 85 * 0.5625, 85],
      components: data.map(decorateBox)
    })
    console.log(data);
  }
}