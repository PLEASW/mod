function Grids(pos, rows, columns) {
  this.rows = rows;
  this.pos = { id: 'overlay', position: pos, visible: true, clickable: false, components: [] };
  this.columns = columns;
  this.grids;
  this.init(pos.map(Math.trunc));
}
Grids.prototype.displayUI = (margin = 0) => (0 <= margin && margin <= 1) && this.grids.flat().map(([x, y, width, height]) => [x + width * margin / 2, y + height * margin / 2, width * (1 - margin), height * (1 - margin)])
Grids.prototype.init = function (pos) {
  const [x, y, width, height] = pos;
  this.x = x; this.y = y;
  this.width = width / this.rows;
  this.height = height / this.columns;
  this.createCells();
}
Grids.prototype.createCells = () => this.grids = Array(this.rows).fill(0).map((i, cellX) => Array(this.columns).fill(0).map((j, cellY) => [this.x + this.width * cellX, this.y + this.height * cellY, this.width, this.height]))
Grids.prototype.createLine = function (x, y, num, vertical = false, style = { type: 'box', fill: 'rgba(255,255,255,1)' }) {
  const [width, height] = [100 / this.rows, 100 / this.width];
  let position;
  if (vertical) {
    const lineHeight = height * (num > this.columns ? this.columns : num);
    position = [x, y, 2, lineHeight];
  }
  else {
    const lineWidth = width * (num > this.rows ? this.rows : num)
    position = [x, y, lineWidth, 2];
  }
  this.pos.components.push({ ...style, position });
}
Grids.prototype.mergeCells = function (x, y, endX = this.rows, endY = this.columns) {
  if (endX > this.rows) endX = this.rows;
  if (endY > this.columns) endY = this.columns;
  const grids = this.grids.map((row, x0) => row.map((cell, y0) =>
    (x <= x0 && x0 <= endX && y <= y0 && y0 <= endY) ? [] : cell));
  grids[x][y] = [this.x + x * this.width, this.y + y * this.height, this.width * (endX - x), this.height * (endY - y)];
  return this.grids = grids.map(i => i.filter(j => !!j.length)).filter(i => !!i.length);
}
console.log(new Grids([0, 0, 100, 100], 4, 4).displayUI());


function Grids(pos, rows, columns) {
  [this.x, this.y, this.width, this.height] = [...pos]
  this.width /= rows;
  this.height /= columns;
  [this.rows, this.columns] = [rows, columns];
}