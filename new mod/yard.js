let decorateShownBox = function (position) {
  return { type: "box", position: position, stroke: "#cde", width: 1, fill: "green" };
}
let decorateHiddenBox = function (position) {
  return null;
}
let decorateBox = function (box) {
  return (box.shown ? decorateShownBox : decorateHiddenBox)(box.position);
}
function createYard(fillAll = true, maxWidth = 25, maxHeight = 25) {
  // do whatever you want with the box's position here
  // `data` is an object storing all boxes' positions
  let data = [];
  let rand = function (num) {
    return Math.floor(Math.random() * num);
  }
  let addBox = function (pos) {
    // push positions to data array
    data.push({ shown: (fillAll || rand(2)), position: pos });
  }
  let matrix = new Array(101).fill(0).map(i => new Array(101).fill(0));
  let isCorner = function (i, j) {
    // check if point [i,j] belongs to a corner or not
    if (isFilled(i, j)) return false // already filled?
    // we only check for the upper left corner types because the main checker iteration will go from the top to the bottom and from left to right
    return isFilled(i - 1, j) && isFilled(i - 1, j - 1) && isFilled(i, j - 1);
  }
  let fillRect = function (i, j, width, height) {
    // fill the specified rectangle and push data
    for (let ix = 0; ix < height; ix++) {
      for (let jx = 0; jx < width; jx++) {
        matrix[i + ix][j + jx] = 1;
      }
    }
    // remember that the vectors in 2d array dimension is actually swapped compared to the original 2D Eculid plane so we need to convert it
    addBox([j, i, width, height]);
  }
  let isFilled = function (i, j) {
    // returns true if the point is filled or out of bound, false otherwise
    return !((matrix[i] || [])[j] === 0);
  }
  let checkMatrix = function () {
    // returns position of the closet corner point or null if found none
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        if (isCorner(i, j)) return [i, j];
      }
    }
    return null;
  }
  let found = checkMatrix();
  while (found) {
    let [i, j] = found, width = 0, height = Math.min(maxHeight, 100 - i);
    while (!isFilled(i, j + width) && width < maxWidth) width++;
    width--;
    fillRect(i, j, rand(width) + 1, rand(height) + 1);
    // trigger the search again
    found = checkMatrix();
  }
  return data;
}


this.tick = function (game) {
  if (game.step % 60 === 0) {
    for (let t of ["map", "radar_background"]) game.setUIComponent({
      id: t,
      visible: true,
      position: [0, 0, 100, 100],
      components: data.map(decorateBox).filter(i => i)
    })
  }
}