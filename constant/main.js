const square = screen_width / screen_height; // 1920 / 1080
const upgrades = [
  { id: "9", position: [25, 0, 20, 10], shortcut: "9", components: [{ type: "box", position: [0, 0, 100, 100] }] },
  { id: "0", position: [45, 0, 20, 10], shortcut: "0", components: [{ type: "box", position: [0, 0, 100, 100] }] }
];
const radar_radius = (map_size * 10) / radar_zoom;
game.modding.commands.command_name = function () { }
const posConvt = function (x, y) {
  return [map_size * 5 + x, map_size * 5 - y - 1];
};
const posConvt2 = function (x, y) {
  return [x - map_size * 5, map_size * 5 - y - 1];
}