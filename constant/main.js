// const square = screen_width / screen_height; // 1080 / 1920
const upgrades = [
  { id: "9", position: [25, 0, 20, 10], shortcut: "9", components: [{ type: "box", position: [0, 0, 100, 100] }] },
  { id: "0", position: [45, 0, 20, 10], shortcut: "0", components: [{ type: "box", position: [0, 0, 100, 100] }] }
];
const radarRadius = (mapSize * 10) / radarZoom;
game.modding.commands.command_name = function () { }
let mapSize = 200;
let width = 1;
const mapToComponent = function (x, y) {
  return [x, -y].map((i, b) => (i + mapSize * 5 - b) / mapSize * 10 - width * 0.5);
};
const componentToMap = function (x, y) {
  [x, y] = [x, y].map(i => i + width * 0.5);
  return [x - 50, 50 - y].map((i, b) => i * mapSize / 10 - b);
};
; (function (params) { })(); // custom command for use in mod development
$.get("path/to/file.js").then(data => eval(data)).catch(e => echo("Failed wtf"))