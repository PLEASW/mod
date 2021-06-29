function t(t, e) {
  var i, s, l, n, a;
  for (this.size = null != t ? t : 1024, null == e && (e = !1),
    this.canvas = document.createElement("canvas"),
    this.canvas.width = this.size,
    this.canvas.height = this.size / 2,
    this.O11O0 = 8, this.blocksize = this.size / this.O11O0,
    s = this.canvas.getContext("2d"), s.fillStyle = "#000",
    s.fillRect(0, 0, this.size, this.size), this.index = 0,
    a = ["#000", "#000", "#000", "#000", "#000", "#000", "#000", "000"],
    l = 0, n = a.length; l < n; l++) i = a[l], this.createTexture(function (t) {
      var e, s, l, n, a, o;
      for (t.fillStyle = i, a = [.4, .55], o = [], n = 0, l = a.length; n < l; n += .05) e = a[n], o.push(function () {
        var i, l, n, a;
        for (n = [.4, .55], a = [], l = 0, i = n.length; l < i; l += .05) s = n[l], a.push(t.fillRect(e + .0125, s + .0125, .025, .025));
        return a
      }());
      return o
    });
  this.createTexture(function (t) {
    return function (e) {
      var i, s, l, n;
      for (l = new ll000(0), n = [], i = s = 0; s <= 8; i = s += 1) t.createLight(e, .16, .16 + .08 * i, .04, .04, l.next() > .1), t.createLight(e, .24, .16 + .08 * i, .04, .04, l.next() > .1), t.createLight(e, .76, .16 + .08 * i, .04, .04, l.next() > .1), n.push(t.createLight(e, .84, .16 + .08 * i, .04, .04, l.next() > .1));
      return n
    }
  }(this)), this.createTexture(function (t) {
    return function (e) {
      e.fillStyle = "#FFF", t.createLight(e, .5, .05, .1, .05), t.createLight(e, .9, .05, .1, .05), t.createLight(e, .1, .05, .1, .05), t.createLight(e, .5, .85, .1, .05), t.createLight(e, .9, .85, .1, .05), t.createLight(e, .1, .85, .1, .05)
    }
  }(this)), this.createTexture(function (t) { }), this.createTexture(function (t) { }), this.createTexture(function (t) { }), this.createTexture(function (t) { }), this.createTexture(function (t) {
    return function (e) {
      var i, s, l, n;
      for (e.fillStyle = "#FFF", s = [], l = i = 0; i <= 1; l = i += .1) s.push(function () {
        var t, i;
        for (i = [], n = t = 0; t <= 1; n = t += .1) Math.random() < .4 ? i.push(this.createLight(e, l - .025, n - .025, .06, .06, Math.random() > .3)) : i.push(void 0);
        return i
      }.call(t));
      return s
    }
  }(this)), this.createTexture(function (t) {
    return function (t) {
      var e, i, s, l;
      for (e = t.createLinearGradient(0, 0, 0, 1), e.addColorStop(0, "#000"), e.addColorStop(.6, "#FFF"), t.fillStyle = e, t.fillRect(-.1, -.1, 1.2, 1.2), t.fillStyle = "#FFF", l = [], i = s = 0; s <= 1; i = s += .2) t.fillRect(i - .05, .15, .1, .1), l.push(t.fillRect(i - .05, .35, .1, .1));
      return l
    }
  }()), this.createTexture(function (t) {
    return function (e) {
      e.fillStyle = "#FFF", t.createLight(e, .3, .05, .1, .05), t.createLight(e, .7, .05, .1, .05), t.createLight(e, .1, .05, .1, .05), t.createLight(e, .7, .85, .1, .05), t.createLight(e, .9, .85, .1, .05), t.createLight(e, .1, .85, .1, .05)
    }
  }(this)), e && (s = this.canvas.getContext("2d"), s.fillStyle = "#888", s.fillRect(this.size - this.blocksize, 3 * this.blocksize, this.blocksize, this.blocksize))
}
