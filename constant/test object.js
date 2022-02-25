const game = {
  options: {
    "max_players": 40,
    "crystal_value": 1,
    "crystal_drop": 1,
    "map_size": 60,
    "map_density": null,
    "lives": 3,
    "max_level": 7,
    "friendly_colors": 0,
    "close_time": 30,
    "close_number": 30,
    "map_name": null,
    "unlisted": true,
    "survival_time": 0,
    "survival_level": 8,
    "starting_ship": 101,
    "starting_ship_maxed": false,
    "asteroids_strength": 1,
    "friction_ratio": 1,
    "speed_mod": 1,
    "rcs_toggle": true,
    "weapon_drop": 0,
    "mines_self_destroy": true,
    "mines_destroy_delay": 18000,
    "healing_enabled": false,
    "healing_ratio": 1,
    "shield_regen_factor": 1,
    "power_regen_factor": 1,
    "auto_refill": false,
    "projectile_speed": 1,
    "strafe": 0,
    "release_crystal": false,
    "large_grid": false,
    "bouncing_lasers": 0,
    "max_tier_lives": 3,
    "id": "modding"
  }, aliens: [], asteroids: [],
  ships: [], collectibles: [], custom: {},
  step: 0, modding: {}
}
const ship = {
  id: 0,
  name: "STEPHEN FRANKLIN",
  alive: true,
  idle: false,
  last_updated: 0,
  healing: false,
  shield: 0,
  generator: 0,
  x: -145,
  y: 115,
  vx: 0,
  vy: 0,
  r: 1.3788101090755198,
  type: 101,
  score: 0,
  healing: 0,
  team: 0,
  stats: 0,
  crystals: 0,
  custom: {},
  emptyWeapons(a) { console.log(a); },
  gameover(a) { console.log(a); },
  intermission(a) { console.log(a); },
  setUIComponent(a) { console.log(a); },
  showInstructor(a) { console.log(a); },
  set(a) { console.log(a); }
}
class TEST {
  constructor() {
    this.uis = [];
  }
  addUIs(...uis) { this.uis.push(...uis.map(ui => Object.values(ui.position ?? ui))) }
  removeUIs(...uis) {
    uis.forEach(ui => {
      const index = this.uis.findIndex(a => a.every((value, index) => value === ui[index]));
      if (index > -1) this.uis.splice(index, 1);
    })
  }
  display(ship) { this.uis.forEach((position, id) => ship.setUIComponent({ id, position, components: [{ type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255,255,255,0.1)', stroke: 'rgb(255,255,255)', width: 5 }] })) }
  hide(ship) { for (let id = 0; id < 1000; id++) ship.setUIComponent({ id, position: [0, 0, 0, 0], components: [], visible: false }) }
}