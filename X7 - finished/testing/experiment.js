this.options = {
  // see documentation for options reference
  root_mode: "survival",
  map_size: 30
};
class GRIDS {
  constructor([x = 0, y = 0, width = 100, height = 100], prefix = 'x') {
    this.layout = { x, y, width, height }; 9
    this.prefix = prefix;
    this.grids = {};
  }
  #createGrids(rows = 1, cols = 1) {
    const layout = this.layout;
    return this.grids[rows + this.prefix + cols] = Array(rows).fill(0).map((a, x) => Array(cols).fill(0).map((b, y) => [layout.x + x * layout.width / rows, layout.y + y * layout.height / cols, layout.width / rows, layout.height / cols]));
  }
  mergeCell(type, pos) {
    const [x0, y0, numX, numY] = pos;
    let [x, y, width, height] = (this.grids[type.join(this.prefix)] ?? this.#createGrids(...type))[x0][y0];
    width *= numX; height *= numY;
    return [x, y, width, height];
  }
  addMargin(horizontal = 0, vertical = 0, layout) {
    let [x, y, width, height] = Object.values(layout);
    x += horizontal / 200 * width; y += vertical / 200 * height;
    width *= 1 - horizontal / 100; height *= 1 - vertical / 100;
    return [x, y, width, height];
  }
  getGrids(rows, cols, horizontal = false) {
    if (!(rows || cols)) return;
    const type = rows + this.prefix + cols
    this.grids[type] ?? this.#createGrids(rows, cols);
    return this.grids[type].flat().sort((a, b) => a[Number(!horizontal)] - b[Number(!horizontal)]);
  }
};
class UI {
  constructor({ id = '', position = [0, 0, 100, 100], visible = true, shortcut, clickable = false, components }) {
    this.variety = components ? { default: components } : {};
    this.ui = { id, position, visible, shortcut, clickable }
    this.custom = {};
    this.isDisplay = false;
  }
  get id() { return this.ui.id }
  get position() { return this.ui.position }
  get visible() { return this.ui.visible }
  get clickable() { return this.ui.clickable }
  set visible(value) { return this.ui.visible = !!value }
  set clickable(value) { return this.ui.clickable = !!value }
  set position(position = [0, 0, 100, 100]) { return this.ui.position = position }
  simpleDesign = (text, fontSize) => [
    { type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255,255,255,0.1)', stroke: 'rgb(255,255,255)', width: 5 },
    text && { type: 'text', position: this.setFontSize(fontSize, []), value: text, color: 'rgb(255,255,255)' }
  ]
  setFontSize = (size = 60, [x = 0, y = 0, width = 100, height = 100]) => [x, y + (height - (size *= height / 100)) / 2, width, size];
  setDesign = (name, components) => this.variety[name.toLowerCase()] = components;
  hide = ship => (this.isDisplay = false, ship.setUIComponent({ id: this.id, position: [0, 0, 0, 0], shortcut: undefined, visible: false, clickable: false, components: [] }))
  display = (ship, version = 'default') => (this.isDisplay = true, ship.setUIComponent({ ...this.ui, components: this.variety[version] ?? this.simpleDesign() }))
}
class LIST_UI {
  constructor(position = [0, 0, 0, 0]) {
    this.grids = new GRIDS(position);
    this.layouts = {};
  }
  addMargin = (type, horizontal = 0, vertical = 0) => this.getLayout(type).forEach(ui => ui.position = this.grids.addMargin(horizontal, vertical, ui.position))
  addUI(name, [rows = 0, cols = 0, vertical], ...uis) {
    const _ = this.layouts[name.toLowerCase()] ??= {}, layout = _[rows + this.grids.prefix + cols] ??= [], length = layout.length, __ = this.grids.getGrids(rows, cols, vertical);
    if (!__) return uis.forEach(ui => layout.push(new UI(ui)));
    uis.forEach((ui, index) => __[index + length] && layout.push(new UI({ ...ui, position: __[index + length] })))
  }
  getLayout = type => Object.values(this.layouts[type]).flat();
  hideAll = (ship, type) => this.getLayout(type).map(ui => ui.hide(ship))
  displayAll = (ship, type, version) => this.getLayout(type).map((ui, index, arr) => ui.display(ship, version?.(ui, index, arr)))
  getUI = (type, id) => this.getLayout(type).find(ui => ui.id === id);
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
test = new TEST();
const grids = new GRIDS([5, 35, 30, 60]);
const shipname = grids.getGrids(1, 7)[0];
const section = new GRIDS(grids.mergeCell([1, 7], [0, 1, 1, 6]));
test.addUIs(shipname, ...section.getGrids(1, 1));

this.tick = function (game) {
  // do mod stuff here ; see documentation
  if (game.step % 30 === 0) game.ships.forEach(ship => test.display(ship));
}





const a = {
  id: 1, position: [5, 35, 30, 60], components: [
    { type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255,255,255,0.1)' },
    { type: 'text', position: [3, 2, 100, 8], color: 'rgb(255,255,255)', value: 'SHIP NAME', align: 'left' },
    { type: 'text', position: [3, 10, 50, 4], color: 'rgb(255,255,255)', value: 'TIER: 6', align: 'left' },
    { type: 'text', position: [53, 10, 50, 4], color: 'rgb(255,255,255)', value: 'SHIPTREE: VANILLA', align: 'left' },

    { type: 'text', position: [3, 15, 100, 5], color: 'rgb(255,255,255)', value: 'SHIELD', align: 'left' },

    { type: 'text', position: [5, 20, 20, 4], color: 'rgb(255,255,255)', value: 'CAPACITY', align: 'left' },
    { type: 'text', position: [25, 20, 25, 4], color: 'rgb(255,255,255)', value: '999 > 999', align: 'left' },

    { type: 'text', position: [5, 24, 20, 4], color: 'rgb(255,255,255)', value: 'REGEN', align: 'left' },
    { type: 'text', position: [25, 24, 25, 4], color: 'rgb(255,255,255)', value: '999 > 999', align: 'left' },

    { type: 'text', position: [53, 15, 100, 5], color: 'rgb(255,255,255)', value: 'ENERGY', align: 'left' },

    { type: 'text', position: [55, 20, 20, 4], color: 'rgb(255,255,255)', value: 'CAPACITY', align: 'left' },
    { type: 'text', position: [75, 20, 25, 4], color: 'rgb(255,255,255)', value: '999 > 999', align: 'left' },

    { type: 'text', position: [55, 24, 20, 4], color: 'rgb(255,255,255)', value: 'REGEN', align: 'left' },
    { type: 'text', position: [75, 24, 25, 4], color: 'rgb(255,255,255)', value: '999 > 999', align: 'left' },

    { type: 'text', position: [3, 30, 20, 5], color: 'rgb(255,255,255)', value: 'SPEED', align: 'left' },
    { type: 'text', position: [25, 30, 25, 5], color: 'rgb(255,255,255)', value: '999 > 999', align: 'left' },

    { type: 'text', position: [53, 30, 20, 5], color: 'rgb(255,255,255)', value: 'MASS', align: 'left' },
    { type: 'text', position: [75, 30, 25, 5], color: 'rgb(255,255,255)', value: '999 > 999', align: 'left' },

    { type: 'text', position: [3, 35, 20, 5], color: 'rgb(255,255,255)', value: 'ROTATE', align: 'left' },
    { type: 'text', position: [25, 35, 25, 5], color: 'rgb(255,255,255)', value: '999 > 999', align: 'left' },

    { type: 'text', position: [53, 35, 20, 5], color: 'rgb(255,255,255)', value: 'ACCE', align: 'left' },
    { type: 'text', position: [75, 35, 25, 5], color: 'rgb(255,255,255)', value: '999 > 999', align: 'left' },
  ]
}