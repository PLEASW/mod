function shipCode(ships, name) {
  const keys = Object.keys(ships ?? {});
  return {
    id: name,
    ships(order = 1) {
      return this.codes = Array(keys.length).fill(0)
        .map((i, r) => JSON.parse(ships[keys[r]]).typespec.code).sort((a, b) => (a - b) * order);
    },
    event(ship) {
      this.codes ?? this.ships(-1);
      const type = this.codes[this.codes.indexOf(ship?.type) + 1] ?? this.codes[0];
      ship.set({ type, stats: type < 700 ? 88888888 : 0 });
    }
  }
}