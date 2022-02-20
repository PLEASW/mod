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
  getGrids([rows, cols], vertical = false) {
    const type = rows + this.prefix + cols
    try {
      this.grids[type] ?? this.#createGrids(rows, cols);
      return this.grids[type].flat().flatMap(pos => [pos.position]).sort((a, b) => a[Number(vertical)] - b[Number(vertical)]);
    }
    catch (error) { console.log(error); }
  }
}
class UI {
  constructor(ui) {
    this.ui = ui;
  }
  #customDesign = {};
  simpleDesign(...text) { };
  addDesign(name, callback) {
    if (typeof callback !== 'function') return;
    return this.customDesign[name.toLowerCase()] = callback.bind(this);
  }
  getDesign(name) { return this.customDesign[name] ?? this.simpleDesign; }
  setDesign(name, ...param) { return this.ui.components = (this.#customDesign[name] ?? this.simpleDesign)(...param) }
  display(ship, visible) {
    try {
      if (visible) return ship.setUIComponent(this.ui);
      ship.setUIComponent({ id: this.ui.id, position: [0, 0, 0, 0], shortcut: undefined, visible, clickable: false });
    } catch (error) { console.log(error); }
  }
}
class LIST_UI extends UI {
  constructor(uis, pos) {
    super(undefined);
    this.uis = uis ?? [];
    this.layout = new Grids(pos);
  }

}