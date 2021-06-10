const square = screen_width / screen_height; // 1920 / 1080
const upgrades = [
  { id: "9", position: [25, 0, 20, 10], shortcut: "9", components: [{ type: "box", position: [0, 0, 100, 100] }] },
  { id: "0", position: [45, 0, 20, 10], shortcut: "0", components: [{ type: "box", position: [0, 0, 100, 100] }] }
];
const radar_radius = (map_size * 10) / radar_zoom;
game.modding.commands.command_name = function () { }
const posConvt = function (x, y) {
  return [x, -y].map((i, b) => (i + map_size * 5 - b) / map_size * 10 - width * 0.5);
};
const posConvt2 = function (x, y) {
  [x, y] = [x, y].map(i => i + width * 0.5);
  return [x - 50, 50 - y].map((i, b) => i * map_size / 10 - b);
};