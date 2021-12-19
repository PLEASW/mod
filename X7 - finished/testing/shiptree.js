function shipCode(ships, name) {
  const keys = Object.keys(ships ?? {});
  return {
    id: name,
    ships() {
      return this.codes = Array(keys.length).fill(0)
        .map((i, r) => JSON.parse(ships[keys[r]]).typespec.code).sort((a, b) => a - b);
    },
    event(ship, index = this.codes.indexOf(ship?.type) || 0) {
      ship.set({ type: this.codes[index + 1] || this.codes[0] });
    }
  }
}
