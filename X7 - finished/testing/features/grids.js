function Grids(pos, rows, columns) {
  this.rows = rows; this.columns = columns; this.grids;
  this.merges = [];
  this.init(pos);
}
Grids.prototype.display = function (marginHorizontal = this.marginHorizontal ?? 0, marginVertical = this.marginVertical ?? 0, vertical = false) {
  this.marginHorizontal = marginHorizontal;
  this.marginVertical = marginVertical;
  this.displayUI = [...this.grids.flat().filter(i => i.length)].map(([x, y, width, height]) => {
    if (0 <= marginVertical && marginVertical <= 50 && 0 <= marginHorizontal && marginHorizontal <= 50) {
      return [x + width * marginHorizontal / 100, y + height * marginVertical / 100, width - 2 * width * marginHorizontal / 100, height - 2 * height * marginVertical / 100];
    }
    return [x, y, width, height];
  }).sort((a, b) => vertical ? a[0] - b[0] : a[1] - b[1]);
}
Grids.prototype.init = function (pos) {
  const [x, y, width, height] = pos;
  this.x = x; this.y = y;
  this.width = width / this.rows;
  this.height = height / this.columns;
  this.createCells();
  this.display();
}
Grids.prototype.createCells = function () {
  this.grids = Array(this.rows).fill(0).map(({ }, x) => Array(this.columns).fill(0).map(({ }, y) => [this.x + x * this.width, this.y + y * this.height, this.width, this.height]))
}
Grids.prototype.mergeCells = function ([x0, y0], [x, y]) {
  this.grids = this.grids.map((row, posX) => row.map((column, posY) => !(x0 <= posX && posX <= x && y0 <= posY && posY <= y) ? column : []));
  const cell = [this.x + x0 * this.width, this.y + y0 * this.height, this.width * (x - x0 + 1), this.height * (y - y0 + 1)];
  this.merges.push(cell);
  this.display();
  return cell;
}
Grids.prototype.buttonLayoutGenerate = function (ids, style = {}, text = []) {
  this.displayUI ?? this.display(this.marginHorizontal, this.marginVertical);
  return ids.map((id, index) => {
    return {
      id, position: this.displayUI[index], clickable: true, components: [
        { type: 'box', position: [0, 0, 100, 100], fill: 'rgba(255,255,255,0.2)', stroke: 'rgba(255,255,255,1)', width: 5 },
        { type: 'text', position: [0, 0, 100, 100], color: 'rgb(255,255,255)', value: text[index] || '' }
      ], ...style
    }
  })
}