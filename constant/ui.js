class Grids {
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
      let [x, y, width, height] = this.grids[type.join(this.prefix)][x0][y0].position;
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
    this.ui = (function () {
      this.variety['default'] = { components: components ?? this.simpleDesign(id || '') };
      return { id, position, visible, clickable, shortcut };
    }).call(this);
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
  hide = ship => {
    const uis = ship.custom.uis ??= [], id = this.id;
    if (!uis.includes(this.id)) return;
    uis.splice(uis.indexOf(id), 1);
    ship.setUIComponent({ id, position: [0, 0, 0, 0], shortcut: undefined, visible: false, clickable: false })
  }
  display(ship, version) {
    const uis = ship.custom.uis ??= [];
    const ui = Object.assign({ ...this.ui }, this.variety[version] ?? this.variety.default);
    !uis.includes(ui.id) && uis.push(ui.id);
    return ship.setUIComponent(ui), ui;
  }
}
class LIST_UI {
  constructor(list = '', position) {
    this.list = typeof list === 'string' ? list.toLowerCase() : String(Math.trunc(Math.random() * 1000));
    this.grids = new Grids(position);
    this.layouts = {};
  }
  addMargin(layout, horizontal = 0, vertical = 0) {
    this.layouts[layout].uis.forEach(ui => ui.position = this.grids.addMargin(horizontal, vertical, ui.position).position)
  }
  addUI([rows, cols, vertical = false], name, ...uis) {
    const layout = this.layouts[name.toLowerCase()] ??= { rows, cols, uis: [] }, length = layout.uis.length;
    const grids = this.grids.getGrids(rows, cols, vertical);
    uis.forEach((ui, index) => !!grids.at(index + length) && layout.uis.push((ui.position = grids.at(index + length), ui)))
  }
  hideAll(ship, type) {
    const uis = ship.custom.uis ??= [];
    this.layouts[type.toLowerCase()].uis.forEach(ui => {
      uis.includes(ui.id) && uis.splice(uis.indexOf(ui.id), 1);
      ship.setUIComponent({ id: ui.id, position: [0, 0, 0, 0], shortcut: undefined, visible: false, clickable: false })
    })
  }
  displayAll(ship, type, version) {
    ship.custom.uis.concat(this.layouts[type.toLowerCase()].uis.map(ui => {
      if (typeof ui.display === 'function') return ui.display(ship, version), ui;
      return ship.setUIComponent(ui), ui;
    }))
  }
  setUI(ship, type, filter, design) {
    if (typeof design !== 'function' || typeof filter !== 'function' || !!ship) return;
    this.layouts[type.toLowerCase()].uis.filter(filter.bind(this)).forEach(ui => ship.setUIComponent(ui));
  }
  hideUI(ship, type, filter) {
    if (typeof filter !== 'function') return;
    const id = this.layouts[type.toLowerCase()].uis.find(filter.bind(this)).id;
    const uis = ship.custom.uis ??= [];
    uis.splice(uis.indexOf(id), 1);
    ship.setUIComponent({ id, position: [0, 0, 0, 0], shortcut: undefined, visible: false, clickable: false })
  }
  test(ship, layout) {
    return this.grids.getGrids(...layout).map((position, id) => ({
      id: id + (ship.custom.uis?.length ?? 0), position,
      components: [{ type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255,255,255,0.1)', stroke: 'rgb(255,255,255)', width: 5 }]
    }))
  }

}