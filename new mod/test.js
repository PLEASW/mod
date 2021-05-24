addBots = number => { for (let i = 0; i < number; i++) Bot.create(); };

let Spectator_102 = '{"name":"Spectator","level":1,"model":2,"size":0.025,"zoom":0.075,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"bodies":{"face":{"section_segments":100,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-2,-2,2,2],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"vertical":true,"texture":[6]}},"typespec":{"name":"Spectator","level":1,"model":2,"code":102,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"shape":[0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001],"lasers":[],"radius":0.001}}';
let ships = [Spectator_102];

this.options = {
  // auto_assign_teams: true,
  ships: ships,
  // root_mode: 'team',
  max_players: 30,
  crystal_value: 3,
  radar_zoom: 5,
  starting_ship: 800,
  asteroids_strength: 3,
  speed_mod: 1.25,
  release_crystal: true,
  mines_self_destroy: false,
  projectile_speed: 1.2,
  hues: [180, 360],//[180, 120, 360],
  station_size: 1,
  station_crystal_capacity: 0.5,
  friendly_colors: 2,
  map_size: 80,
  map_density: 2
};
const Players_List = {
  id: 'players list',
  position: [73, 4.1, 6.6, 4],
  clickable: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
    { type: "text", position: [0, 5, 100, 90], value: "Players", color: "#cde" },
  ]
};
const disable_uis = (ids, ship) => { for (let id of ids) ship.setUIComponent({ id: id, visible: false }) };
const make_list = function (values, number) {
  let result = [], sub = [];
  for (let item of values) {
    sub.push(item);
    if (sub.length == number || values.indexOf(item) == values.length - 1) {
      result.push(sub);
      sub = [];
    }
  }
  return result;
};
const PLAYERS_LIST = {
  args: {
    players_list: Players_List,
    ships: [],
    view_players: false,
    page: 0
  },
  methods: {
    show_activate_button: ship => ship.setUIComponent(ship.custom.players_list),
    sortTeam: (ships) => {
      let result = {};
      for (let i = 0; i < friendly_colors; i++)
        result[i] = ships.filter(value => value.team == i).sort((a, b) => a.id - b.id);
      return result;
    },
    ship_component(ship, owner) {
      return {
        id: ship.id, position: [], clickable: true,
        components: [{ type: 'text', value: ship.name, position: [0, 0, 100, 100], color: owner.id == ship.id ? "#cde" : "#fff", align: 'left' }]
      };
    },
    add_buttons(components, ship) {
      components.forEach((component, index => {
        components.position = component.position = [30, 20 + index * 6, 30, 6];
        ship.setUIComponent(component);
      }));
    },
    button_clicked: (ship, custom) => {
      if (!custom.view_map) {
        custom.view_players = !custom.view_players;
        if (custom.view_players) {
          ship.setUIComponent({
            id: 'allies',
            position: [25, 15, 10, 5],
            clickable: true,
            components: [
              { type: 'box', position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
              { type: 'text', position: [17.5, 0, 65, 100], value: 'Allies', color: '#cde' }
            ]
          });
          ship.setUIComponent({
            id: 'enemies',
            position: [55.1, 15, 10, 5],
            clickable: true,
            components: [
              { type: 'box', position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 },
              { type: 'text', position: [0, 0, 100, 100], value: 'Enemies', color: '#cde' }
            ]
          });
          ship.setUIComponent({
            id: 'box',
            position: [25, 20.1, 40.1, 60],
            components: [{ type: 'box', position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 }]
          });
          ship.setUIComponent({
            id: 'next',
            position: [25, 45, 5, 10],
            clickable: true,
            components: [{ type: 'text', position: [0, 0, 100, 100], value: '<', color: '#cde' }]
          });
          ship.setUIComponent({
            id: 'back',
            position: [60.1, 45, 5, 10],
            clickable: true,
            components: [{ type: 'text', position: [0, 0, 100, 100], value: '>', color: '#cde' }]
          });
          custom.view_map = false;
        } else disable_uis(['enemies', 'allies', 'box', 'next', 'back'], ship);
      }
    },
  }
};
this.tick = function (game) {
  if (!game.ships[0].custom.init) {
    let ship = game.ships[0];
    ship.custom.init = true;
    Object.assign(ship.custom, PLAYERS_LIST.args);
  }
};
this.event = function (event, game) {
  let ship = event.ship, custom = event.ship.custom, ship_ids = game.ships.map(i => i.id);
  switch (event.id) {
    case 'players list':
      PLAYERS_LIST.methods.button_clicked(ship, custom);
      break;
    case 'back':
      break;
    case 'next':
      break;
    case 'allies':
      let ships = game.ships.filter(i => i.team === ship.team);
      break;
    case 'enemies':
      let ships = game.ships.filter(i => i.team !== ship.team);
      break;
  }
};