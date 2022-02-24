class GRIDS {
  constructor([x = 0, y = 0, width = 100, height = 100], prefix = 'x') {
    this.layout = { x, y, width, height };
    this.prefix = prefix;
    this.grids = {};
  }
  #generatePos(data) { return { ...data, position: Object.values(data) } }
  #createGrids(rows = 1, cols = 1) {
    try {
      const layout = this.layout;
      return this.grids[rows + this.prefix + cols] = Array(rows).fill(0).map((a, x) => Array(cols).fill(0).map((b, y) => this.#generatePos({ x: layout.x + x * layout.width / rows, y: layout.y + y * layout.height / cols, width: layout.width / rows, height: layout.height / cols })));
    } catch (error) { console.log(error); }
  }
  mergeCell(type, pos) {
    try {
      const [x0, y0, numX, numY] = pos;
      let [x, y, width, height] = (this.grids[type.join(this.prefix)] ?? this.#createGrids(...type))[x0][y0].position;
      width *= numX; height *= numY;
      return this.#generatePos({ x, y, width, height });
    } catch (error) { console.log(error); }
  }
  addMargin(horizontal = 0, vertical = 0, layout) {
    try {
      let [x, y, width, height] = Object.values(layout);
      x += horizontal / 200 * width; y += vertical / 200 * height;
      width *= 1 - horizontal / 100; height *= 1 - vertical / 100;
      return this.#generatePos({ x, y, width, height });
    } catch (error) { console.log(error) };
  }
  getGrids(rows, cols, horizontal = false) {
    try {
      const type = rows + this.prefix + cols
      this.grids[type] ?? this.#createGrids(rows, cols);
      return this.grids[type].flat().flatMap(pos => [pos.position]).sort((a, b) => a[Number(!horizontal)] - b[Number(!horizontal)]);
    } catch (error) { console.log(error); }
  }
}
class UI {
  constructor({ id = '', position = [], visible = true, shortcut, clickable = false, components }) {
    this.variety = {};
    this.ui = function () {
      this.variety['default'] = { components: components ?? this.simpleDesign(id || '') };
      return { id, position, visible, clickable, shortcut };
    }.call(this);
  }
  get id() { return this.ui.id }
  get position() { return this.ui.position }
  get visible() { return this.ui.visible }
  get clickable() { return this.ui.clickable }
  set visible(value) { return this.ui.visible = !!value }
  set clickable(value) { return this.ui.clickable = !!value }
  set position(position = [0, 0, 100, 100]) { return this.ui.position = position }
  colors = {
    white: 'rgb(255,255,255)', black: 'rgb(0,0,0)',
    red: 'rgb(255,0,0)', green: 'rgb(0,255,0)', blue: 'rgb(0,0,255)',
    cyan: 'rgb(0,255,255)'
  }
  customDesigns = {};
  simpleDesign(text = '', fontSize = 60) {
    fontSize = Number(fontSize) || 60;
    const white = this.colors.white;
    return [
      { type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255,255,255,0.1)', stroke: white, width: 5 },
      { type: 'text', position: [0, 50 - fontSize / 2, 100, fontSize], value: text, color: white }
    ];
  }
  addDesign(name, callback) {
    if (typeof callback !== 'function') return;
    return this.customDesigns[name.toLowerCase()] = callback.bind(this);
  }
  setDesign(name, design, ...param) {
    name = name.toLowerCase(); let components = this.variety[name];
    if (typeof design === 'function') {
      this.addDesign(design.name, design);
      components = design.call(this, ...param);
    }
    if (typeof design === 'object') components = design;
    this.variety[name] = { components: components };
    return components;
  }
  hide(ship) {
    return ship.setUIComponent({
      id: this.id, position: [0, 0, 0, 0], shortcut: undefined, visible: false, clickable: false, components: []
    }), this.id;
  }
  display(ship, version = 'default') {
    return ship.setUIComponent(Object.assign({ ...this.ui }, this.variety[version])), this.id;
  }
}
class LIST_UI {
  constructor(position, list = '',) {
    this.list = typeof list === 'string' ? list.toLowerCase() : String(Math.trunc(Math.random() * 1000));
    this.grids = new GRIDS(Object.assign(position));
    this.layouts = {};
  }
  addMargin(layout, horizontal = 0, vertical = 0) {
    this.layouts[layout].uis.forEach(ui => ui.position = this.grids.addMargin(horizontal, vertical, ui.position).position)
  }
  addUI(name, [rows = 0, cols = 0, vertical = false], ...uis) {
    if (!rows || !cols) return this.layouts[name.toLowerCase()] = { uis };
    const layout = this.layouts[name.toLowerCase()] ??= { rows, cols, uis: [] }, length = layout.uis.length;
    const grids = this.grids.getGrids(rows, cols, vertical);
    uis.forEach((ui, index) => !!grids.at(index + length) && layout.uis.push((ui.position = grids.at(index + length), ui)))
  }
  hideAll(ship, type) {
    return this.layouts[type.toLowerCase()].uis.map(ui => (ship.setUIComponent({ id: ui.id, position: [0, 0, 0, 0], shortcut: undefined, visible: false, clickable: false, components: [] }), ui.id))
  }
  displayAll(ship, type, version = (ui, index, arr) => 'default') {
    return this.layouts[type.toLowerCase()].uis.map((ui, index, arr) => (typeof ui.display === 'function' ? ui.display(ship, version(ui, index, arr)) : ship.setUIComponent(ui), ui.id))
  }
  getUI(type, filter) {
    if (typeof filter !== 'function') return;
    return this.layouts[type.toLowerCase()].uis.find(filter.bind(this));
  }
}
class UI_TRACKER {
  constructor() { this._uis = new Set() }
  add(...uis) { uis.forEach(this.uis.add) }
  delete(...uis) { uis.forEach(this.uis.delete) }
  get uis() { return Array(this._uis); }
  clear() { this.uis.clear(); }
}