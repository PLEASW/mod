function shipCode(ships, name) {
  const values = Object.values(ships ?? {});
  return {
    id: name,
    ships() {
      const shipCodes = Array(values.length).fill(0)
        .map((i, r) => JSON.parse(values[r]).typespec.code).sort((a, b) => (a - b))
      this.codes = [shipCodes, [...shipCodes].reverse()];
    },
    event(ship, reverse = false) {
      this.codes ?? this.ships();
      const side = this.codes[reverse ? 1 : 0];
      const type = side[side.indexOf(ship.type) + 1] || side[0];
      ship.set({ type, stats: shipFunc.stats(type), shield: 1000, crystals: shipFunc.shipCargo(type) });
    },
    reset(ship) {
      const type = this.codes[0][0];
      ship.set({ type, shield: 1000, stats: shipFunc.stats(type) })
    }
  }
}
const shipFunc = {
  shipCargo(ship) {
    const type = typeof ship === 'object' ? ship.type : ship;
    return Math.trunc(type / 100) ** 2 * 20;
  },
  stats(ship) {
    const type = typeof ship === 'object' ? ship.type : ship;
    return type < 700 ? 88888888 : 0;
  }
}

