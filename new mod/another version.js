addBots = number => { for (let i = 0; i < number; i++) Bot.create() };

this.options = {
  auto_assign_teams: true,
  max_players: 30,
  crystal_value: 2,
  radar_zoom: 5,
  asteroids_strength: .5,
  speed_mod: 1.25,
  release_crystal: true,
  mines_self_destroy: false,
  projectile_speed: 1.2,
  hues: [180, 360],
  station_size: 1,
  station_crystal_capacity: 0.5,
  friendly_colors: 2,
  map_size: 80,
  map_density: 2,
  weapons_store: false
};

const map_size = this.options.map_size;
const radar_zoom = this.options.radar_zoom;

const colors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 255, 1)'];
const colors_radar = ['rgba(255, 0, 0, 0.1)', 'rgba(0, 255, 255, 0.1)'];
const radar_radius = (map_size * 10) / radar_zoom;

const width = 1;
const radar_width = radar_radius * 10 / map_size;
const radar_pos = (radar_width - width) / 2;

const friendly_colors = this.options.friendly_colors;

const upgrades = [
  { id: "9", position: [25, 0, 20, 10], visible: true, clickable: true, shortcut: "9", components: [{ type: "box", position: [0, 0, 100, 100] }] },
  { id: "0", position: [45, 0, 20, 10], visible: true, clickable: true, shortcut: "0", components: [{ type: "box", position: [0, 0, 100, 100] }] }
];
function radar(number) {
  let result = [];
  const width = 100 / number;
  for (let i = 0; i < number; i++) {
    result.push({ type: 'box', position: [i * width, 0, width / 50, 100], fill: '#CDE' });
    result.push({ type: 'box', position: [0, i * width, 100, width / 50], fill: '#CDE' });
  }
  return result;
}
const radar_background = {
  id: 'radar_background',
  components: radar(20)
};
this.tick = function (game) {
  if (game.step % 60 === 0) {
    for (let ship of game.ships) {
      if (!ship.custom.init) {
        ship.setUIComponent(radar_background);
      }
    }
  }
}
this.event = function (game) {

}
