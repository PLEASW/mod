function shipCode(ships, name) {
  const keys = Object.keys(ships ?? {});
  return {
    id: name,
    ships() {
      return this.codes = Array(keys.length).fill(0)
        .map((i, r) => JSON.parse(ships[keys[r]]).typespec.code).sort((a, b) => a - b);
    },
    event(ship = { type: 0 }) {
      this.codes || this.ships();
      const type = this.codes[this.codes.indexOf(ship.type) + 1] ?? this.codes[0];
      ship.set({ type, stats: type < 700 ? 88888888 : 0 });
    }
  }
}
