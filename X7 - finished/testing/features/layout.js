this.options = {
  // see documentation for options reference
  root_mode: "survival",
  map_size: 30
};
// for (let i = 0; i < 1000; i++)   game.ships[0].setUIComponent({ id: i, position: [0, 0, 0, 0], visible: false })
function Grids(pos, rows, columns) {
  this.rows = rows; this.columns = columns; this.grids;
  this.init(pos);
  this.merges = [];
}
Grids.prototype.display = function (marginHorizontal = 0, marginVertical = 0) {
  this.displayUI = [...this.grids.flat().filter(i => i.length)].map(([x, y, width, height]) => {
    if (0 <= marginVertical && marginVertical <= 50 && 0 <= marginHorizontal && marginHorizontal <= 50) {
      return [x + width * marginHorizontal / 100, y + height * marginVertical / 100, width - 2 * width * marginHorizontal / 100, height - 2 * height * marginVertical / 100];
    }
    return [x, y, width, height];
  });
}
Grids.prototype.init = function (pos) {
  const [x, y, width, height] = pos;
  this.x = x; this.y = y;
  this.width = width / this.rows;
  this.height = height / this.columns;
  this.createCells();
}
Grids.prototype.createCells = function () {
  this.grids = Array(this.rows).fill(0).map(({ }, x) => Array(this.columns).fill(0).map(({ }, y) => [this.x + x * this.width, this.y + y * this.height, this.width, this.height]))
  this.display();
}
Grids.prototype.mergeCells = function ([x0, y0], [x, y]) {
  this.grids = this.grids.map((row, posX) => row.map((column, posY) => !(x0 <= posX && posX <= x && y0 <= posY && posY <= y) ? column : []));
  const cell = [this.x + x0 * this.width, this.y + y0 * this.height, this.width * (x - x0 + 1), this.height * (y - y0 + 1)];
  this.merges.push(cell);
  this.display();
  return cell;
}
const overlay = new Grids([5, 30, 30, 65], 1, 1);
const area = new Grids([5, 30, 30, 65], 1, 6);
const shipTreeSection = new Grids(area.mergeCells([0, 0], [0, 3]), 1, 3);

const shipTreeOptions = new Grids(shipTreeSection.mergeCells([0, 0], [0, 1]), 3, 4);
shipTreeOptions.display(5, 15);

const changeShip = new Grids(shipTreeSection.mergeCells([0, 2], [0, 2]), 5, 1);

const nextButton = new Grids(changeShip.mergeCells([0, 0], [1, 0]), 1, 1);
nextButton.display(5, 30);

const orders = new Grids(changeShip.mergeCells([2, 0], [2, 0]), 1, 1);
orders.display(0, 35);

const previousButton = new Grids(changeShip.mergeCells([3, 0], [4, 0]), 1, 1)
previousButton.display(5, 30);

const shipFunctionSection = new Grids(area.mergeCells([0, 4], [0, 5]), 4, 3);
shipFunctionSection.display(10, 10);

// console.log({ shipTreeSection, shipFunctionSection });

const aa = {
  overlay, shipFunctionSection, shipTreeOptions, changeShip, nextButton, previousButton, orders
}
console.log(aa);
const dd = Object.values(aa).map(i => i.displayUI).flat();
console.log(dd);
this.tick = function (game) {
  // do mod stuff here ; see documentation
  if (game.step % 60 === 0) {
    game.ships.forEach(ship => {
      dd.forEach((ui, i) => {
        ui && ship.setUIComponent({
          id: i,
          position: ui,
          visible: true,
          components: [{ type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255,255,255,0.2)', stroke: 'rgb(255,255,255)', width: 5 }]
        })
      })
    })
  }
}