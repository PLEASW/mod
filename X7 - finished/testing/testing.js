

this.options = {
  // see documentation for options reference
  root_mode: "survival",
  map_size: 30
};

class Grids {
  constructor(layout) {
    this.layout = layout;
    this.grids = {};
  }
  #generatePos(data) {
    return { ...data, get position() { return Object.values(data) } }
  }
  createGrids(rows, cols) {
    const layout = this.layout;
    return this.grids[`${rows}x${cols}`] = Array(rows).fill(0).map((a, x) => Array(cols).fill(0).map((b, y) =>
      this.#generatePos({ x: layout.x + x * layout.width / rows, y: layout.y + y * layout.height / cols, width: layout.width / rows, height: layout.height / cols })))
  }
  mergeCell(type, pos) {
    const [x0, y0, numX, numY] = pos;
    let [x, y, width, height] = this.grids[type][x0][y0].position;
    width *= numX; height *= numY;
    return this.#generatePos({ x, y, width, height });
  }
  addMargin(horizontal = 0, vertical = 0, layout) {
    let [x, y, width, height] = Object.values(layout);
    x += horizontal / 200 * width; y += vertical / 200 * height;
    width *= 1 - horizontal / 100; height *= 1 - vertical / 100;
    return this.#generatePos({ x, y, width, height });
  }
  getGrids(type, vertical = false) {
    return this.grids[type]?.flat().sort((a, b) => a.position[Number(vertical)] - b.position[Number(vertical)]).map(pos => pos.position);
  }
}

class UIs {
  constructor() {
    this.uis = {}
  }
  setFontSize = size => [0, 50 - size / 2, 100, size];
  initUI({ id, position, visible = true, clickable = false, fontSize }, layout = this.simpleLayout) {
    return this.uis[id] = { id, position, visible, clickable, components: layout(id, fontSize) };
  }
  simpleLayout = (id, fontSize = 40) => [
    { type: 'box', position: [0, 0, 100, 100], stroke: 'rgb(255,255,255)', width: 5 },
    { type: 'text', position: this.setFontSize(fontSize), value: (id ?? '').toUpperCase(), color: 'rgb(255,255,255)' }
  ]
  hideUIs(...ids) {
    return ids.map(id => { return { id: this.uis[id]?.id ?? id, position: [0, 0, 0, 0], visible: false, shortcut: undefined } })
  }
  resetUI(id, change, layout = this.simpleLayout) {
    const ui = this.uis[id]; ui.components = layout(id);
    Object.assign(ui, Object.assign(change, { id }));
  }
}

const menuSections = new Grids({ x: 4, y: 29, width: 30, height: 5 })
menuSections.createGrids(5, 2);
menuSections.createGrids(4, 2);
menuSections.createGrids(4, 1);
// console.log(menuSections.getGrids('4x2', true));
const pos = menuSections.getGrids('4x1')
const menuSectionsFunc = new UIs();
for (let [i, id] of ['a', 'b', 'c', 'd'].entries()) {
  menuSectionsFunc.initUI({ id, position: menuSections.addMargin(5, 1, pos[i]).position, fontSize: 50 })
}
console.log(menuSectionsFunc.uis);
this.tick = function (game) {
  // do mod stuff here ; see documentation
  if (game.step % 60 === 0) {
    Object.values(menuSectionsFunc.uis).forEach(ui => game.ships[0].setUIComponent(ui))
  }
}