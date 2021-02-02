class ShipTree {
  constructor(ships) {
    this.export = function () {
      return this.list.flat().map((i) => JSON.stringify(i));
    };
    this.add = function (ship) {
      let t = ship;
      if (typeof t == "string")
        try {
          t = JSON.parse(t);
        } catch (e) {
          return;
        }
      if (t && typeof t == "object") {
        let u = t.level;
        if (typeof u == "number") {
          if (!Array.isArray(this.list[u])) this.list[u] = [];
          this.list[u].push(t);
        }
      }
    };
    (this.setIndex = function (ship, level, model, next) {
      if (
        typeof ship == "object" &&
        ship &&
        typeof level == "number" &&
        typeof model == "number" &&
        Array.isArray(next)
      ) {
        if (!ship.typespec || typeof ship.typespec != "object") return;
        let g = { level: level, model: model, next: next },
          x = level * 100 + model;
        Object.assign(ship, g);
        Object.assign(ship.typespec, g);
        ship.typespec.code = x;
        this.import(this.list.flat(), true);
        return x;
      }
    }),
      (this.getIndex = function (ship) {
        try {
          return (
            {
              level: ship.level,
              model: ship.model,
              code: ship.typespec.code,
            } || null
          );
        } catch (e) {
          return null;
        }
      }),
      (this.import = function (ships, isClear) {
        ships = Array.isArray(ships) ? ships : [];
        if (isClear) this.list = [];
        for (let ship of ships) this.add(ship);
      });
    this.randomize = function () {
      let ts = [];
      for (let i in this.list) ts.push(i);
      ts = ts
        .filter((t) => !isNaN(t))
        .map(Number)
        .sort((a, b) => a - b);
      let o = ts.map((i) =>
        Array(this.list[i].length)
          .fill(0)
          .map((j, i) => ({ i: i, c: 0, n: [] }))
      );
      for (let i = 0; i < o.length; i++) {
        let h = 0,
          x = o[i + 1],
          t = o[i];
        while (t.length > 0 && Array.isArray(x)) {
          let j = Math.max(...x.map((i) => i.c)),
            k = x.filter((u) => u.c < j);
          if (k.length == 0) k = x;
          let chs = k[Math.floor(Math.random() * k.length)];
          t[h].n.push(this.getIndex(this.list[ts[i + 1]][chs.i]).code);
          chs.c++;
          if (t[h].n.length >= 2) {
            let sk = this.list[ts[i]][t[h].i],
              si = this.getIndex(sk);
            this.setIndex(sk, si.level, si.model, t[h].n);
            t.splice(h, 1);
          }
          h = h < t.length - 1 ? h + 1 : 0;
        }
      }
      return this.list;
    };
    this.import(ships, true);
  }
}
