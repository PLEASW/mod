function shipCode(ships, name) {
  const keys = Object.keys(ships ?? {});
  return {
    id: name,
    ships() {
      const shipCodes = Array(keys.length).fill(0)
        .map((i, r) => JSON.parse(ships[keys[r]]).typespec.code).sort((a, b) => (a - b))
      this.codes = [shipCodes, [...shipCodes].reverse()];
    },
    event(ship, reverse = false) {
      this.codes ?? this.ships();
      const side = this.codes[reverse ? 1 : 0];
      const type = side[side.indexOf(ship?.type) + 1];
      ship.set({ type, stats: type < 700 ? 88888888 : 0 });
    }
  }
}