function createYard(maxpoints, minheight, minwidth, fillAll) {
  var data = { uis: [], game: [] };
  var rand = function (num) { return Math.floor(Math.random() * num); };
  var addBox = function (pos) { (fillAll || rand(2)) && data.uis.push(pos); };
  var yieldsh = Math.trunc(100 / minheight), yieldsw = Math.trunc(100 / minwidth);
  var randoms = new Array(yieldsw).fill(0).map((i, x) => new Array(yieldsh).fill(0).map((j, y) => [x * minwidth, y * minheight])).flat();
  randoms.splice(0, 1);
  //create a random set of points on the 100x100 grid
  maxpoints = Math.min(yieldsw * yieldsh - 1, maxpoints);
  while (randoms.length > maxpoints) randoms.splice(rand(randoms.length), 1);
  randoms.sort((a, b) => a[1] - b[1]);

  var startx = 0, starty = 0;
  while (randoms.length > 0) {
    let curpos = randoms[0], nextpos = randoms[1] || [];
    addBox([startx, starty, curpos[0] - startx, curpos[1] - starty]);
    startx = curpos[0];
    if (curpos[1] != nextpos[1]) {
      addBox([startx, starty, 100 - startx, curpos[1] - starty]);
      startx = 0; starty = curpos[1];
    }
    randoms.splice(0, 1);
  }
  if (starty < 100) addBox([0, starty, 100, 100 - starty]);
  const posConvt2 = function (x, y) {
    [x, y] = [x, y].map(i => i + width * 0.5);
    return [x - 50, 50 - y].map((i, b) => i * map_size / 10 - b + width * 0.5);
  };
  for (let ui of data.uis) data.game.push(posConvt2(...ui).concat([ui[2], ui[3]].map(i => i / 10 * map_size)))

  return data;
}