this.options = {
  // see documentation for options reference
  root_mode: "survival",
  map_size: 80
};
removeObject = function (array) {
  for (let id of array) game.removeObject(id);
};
const map_size = this.options.map_size;
let decorateShownBox = function (position) {
  return { type: 'box', position: position, fill: 'rgba(255, 255, 255, 0.2)', width: 0.7, stroke: 'rgba(255, 255, 255, 1)' };
};
let decorateHiddenBox = function (position) {
  return;
};
let decorateBox = function (box) {
  return (box.shown ? decorateShownBox : decorateHiddenBox)(box.position);
};
function CreateYard2rd(fillAll = false, maxWidth = 25, maxHeight = 25, minHeight = 1 + Math.random() / 100, minWidth = 1 + Math.random() / 100) {
  let data = { uis: [], game: [] };
  let rand = function (num) {
    return Math.floor(Math.random() * num);
  };
  let addBox = function (pos) {
    // push positions to data array
    data.uis.push({ shown: (fillAll || rand(2)), position: pos });
  };

  let matrix = new Array(101).fill(0).map(i => new Array(101).fill(0));

  let isCorner = function (i, j) {
    // check if point [i,j] belongs to a corner or not
    if (isFilled(i, j)) return false; // already filled?
    // we only check for the upper left corner types because the main checker iteration will go from the top to the bottom and from left to right
    return isFilled(i - 1, j) && isFilled(i - 1, j - 1) && isFilled(i, j - 1);
  };
  let fillRect = function (i, j, width, height) {
    // fill the specified rectangle and push data
    for (let ix = 0; ix < height; ix++) {
      for (let jx = 0; jx < width; jx++) {
        matrix[i + ix][j + jx] = 1;
      }
    }
    // remember that the vectors in 2d array dimension is actually swapped compared to the original 2D Eculid plane so we need to convert it
    addBox([j, i, width, height]);
  };

  let isFilled = function (i, j) {
    // returns true if the point is filled or out of bound, false otherwise
    return !((matrix[i] || [])[j] === 0);
  };
  let checkMatrix = function () {
    // returns position of the closet corner point or null if found none
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        if (isCorner(i, j)) return [i, j];
      }
    }
    return null;
  };

  let found = checkMatrix();

  while (found) {
    let [i, j] = found, width = 0, height = Math.min(maxHeight, 100 - i);
    while (!isFilled(i, j + width) && width < maxWidth) width++;
    width--;
    fillRect(i, j, rand(width) + minWidth, rand(height) + minHeight);
    // trigger the search again
    found = checkMatrix();
  }
  const posConvt2 = function (x, y, width, height) {
    [x, y] = [x + width * 0.5, y + height * 0.5];
    return [x - 50, 50 - y].map((i, b) => i * map_size / 10 - b).concat([width, height].map(i => i - 0.25));
  };
  for (let ui of data.uis) ui.shown && data.game.push(posConvt2(...ui.position));
  return data;
}
// do whatever you want with the box's position here
// `data` is an object storing all boxes' positions

this.tick = function (game) {
  if (game.step % 60 === 0) {
    for (let t of ["map", "radar_background"]) game.setUIComponent({
      id: t,
      visible: true,
      position: [25, 5, 85 * 0.5625, 85],
      components: data.uis.map(decorateBox).filter(i => i)
    });
  }
};