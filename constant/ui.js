class Grids {
  constructor(layout, prefix = 'x') {
    this.layout = layout;
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
      let [x, y, width, height] = this.grids[type][x0][y0].position;
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
  getGrids(rows, cols, vertical = false) {
    try {
      const type = rows + this.prefix + cols
      this.grids[type] ?? this.#createGrids(rows, cols);
      return this.grids[type].flat().flatMap(pos => [pos.position]).sort((a, b) => a[Number(vertical)] - b[Number(vertical)]);
    } catch (error) { console.log(error); }
  }
}
class UI {
  constructor({ id = '', position = [], visible = true, shortcut, clickable = false, components }) {
    this.variety = {};
    this.ui = (function () {
      this.variety['default'] = components ?? this.simpleDesign(id || '');
      return { id, position, visible, clickable, shortcut };
    }).call(this);
  }
  get id() { return this.ui.id }
  get position() { return this.ui.position }
  get visible() { return this.ui.visible }
  get clickable() { return this.ui.clickable }
  set visible(value) { return this.ui.visible = !!value }
  set clickable(value) { return this.ui.clickable = !!value }
  colors = {
    white: 'rgb(255,255,255)', black: 'rgb(0,0,0)',
    red: 'rgb(255,0,0)', green: 'rgb(0,255,0)', blue: 'rgb(0,0,255)',
    cyan: 'rgb(0,255,255)'
  }
  customDesigns = {};
  simpleDesign(text, fontSize = 60) {
    fontSize = Number(fontSize) || 60;
    return [
      { type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255,255,255,0.1)', stroke: this.colors.white, width: 5 },
      { type: 'text', position: [0, 50 - fontSize / 2, 100, fontSize], value: text, color: this.colors.white }
    ];
  }
  addDesign(name, callback) {
    if (typeof callback !== 'function') return;
    return this.customDesigns[name.toLowerCase()] = callback.bind(this);
  }
  setDesign(name, design, ...param) {
    name = name.toLowerCase();
    if (typeof design === 'function') return this.addDesign(design.name, design), this.variety[name] = design.call(this, ...param);
    if (typeof design === 'object') return this.variety[name] = design;
    this.variety[name] = { components: this.customDesigns[design](...param) };
  }
  hide = (ship, ...ids) => ids.forEach(id => ship.setUIComponent({ id, position: [0, 0, 0, 0], shortcut: undefined, visible: false, clickable: false }))
  display(ship, version) {
    const ui = Object.assign({ ...this.ui }, this.variety[version]);
    return ship.setUIComponent(ui), ui;
  }
}
class LIST_UI {
  constructor(list = '', [x, y, width, height]) {
    this.list = typeof list === 'string' ? list.toLowerCase() : String(Math.trunc(Math.random() * 1000));
    this.grids = new Grids({ x, y, width, height });
    this.layouts = {};
  }
  addUI([rows, cols, vertical = false], name, ...uis) {
    const layout = this.layouts[name.toLowerCase()] ??= [], length = layout.length;
    const grids = this.grids.getGrids(rows, cols, vertical);
    uis.forEach((ui, index) => !!grids.at(index + length) && layout.push((ui.position = grids.at(index + length), ui)))
  }
  hideAll(ship, type) { this.layouts[type].forEach(ui => ship.setUIComponent({ id: ui.id, position: [0, 0, 0, 0], shortcut: undefined, visible: false, clickable: false })) }
  displayAll(ship, type) { this.layouts[type].forEach(ui => ship.setUIComponent(ui)); }
  setUI(ship, type, filter, design) {
    if (typeof design !== 'function' || typeof filter !== 'function' || !!ship) return;
    const uis = this.layouts[type.toLowerCase()].filter(filter);
    uis.forEach(ui => ship.setUIComponent(ui));
  }
  hideUI(ship, type, filter) {
    if (typeof filter !== 'function') return;
    ship.setUIComponent({ ...this.layouts[type].find(filter), position: [0, 0, 0, 0], shortcut: undefined, visible: false, clickable: false })
  }
}