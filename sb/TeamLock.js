this.TeamMode.prototype.updateStation = function (t) {
  var e, i, s, l, n, a, o, r, h, u, d, c, p, I, O;
  for (i = 1, u = this.teams, s = 0, a = u.length; s < a; s++)
    for (I = u[s], p = I.station_model, i += 1, p.setLevel(t.getUint8(i), this.l11lI), i += 1, p.IIlII = t.getUint32(i, !0), i += 4, p.crystals_max = this.options.crystal_capacity[p.level], i += 1, d = p.modules, l = 0, o = d.length; l < o; l++) h = d[l], O = t.getUint8(i), i += 1, h.setAlive(O > 0, this.l11lI), h.setShield(Math.max(0, O - 1) / 254, this.l11lI);
  if (null != this.team && this.teams.length > 1) {
    for (e = 0, c = this.teams, n = 0, r = c.length; n < r; n++)(I = c[n]) !== this.team && I.station_model.alive && e++;
    0 !== e || this.gameover || (this.gameover = !0, this.killed(-1, !0, 1))
  }
}
