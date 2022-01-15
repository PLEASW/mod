if (!game.custom.bans) game.custom.bans = bans;
game.ships.forEach(ship => ship.custom.init = false);
const playerData = function () {
  echo("\nList of players and their data:");
  for (let ship of game.ships)
    echo(ship.id + ": Player name: " + ship.name + ", position:(" + Math.trunc(ship.x) + ", " + Math.trunc(ship.y) + "), shield:" + ship.shield + ", crystals: " + ship.crystals + ", ship code:" + ship.type);
  if (game.ships.length == 0) echo("No ships.")
};
const removeTimeout = function (ship) {
  ship.custom.timeout = false;
  ship.custom.init = false;
  sendUI(ship, { id: "timeout", visible: false })
}
const locateShip = function (req, handler) {
  let args = req.split(" "), id = Number(args[0] || "NaN");
  if (isNaN(id)) game.modding.terminal.error("Please specify a ship id to take action");
  else {
    let ship = game.findShip(id);
    if (!ship) game.modding.terminal.error("Requested ship not found!");
    else {
      try { typeof handler == "function" && handler(ship, id, args.slice(1).join(" ")) }
      catch (e) { game.modding.terminal.error("string" == typeof e ? e : "An error occured while taking action with the requested ship!") }
    }
  }
}
const identifierString = function (ship) {
  return ship.name + " (ID " + ship.id + ")"
}
const addCommand = function (name, resolver) {
  game.modding.commands[name] = function (req) {
    let args = req.replace(/^\s+/, "").replace(/\s+/, " ").split(" ");
    let text = resolver(args.slice(1).join(" "));
    if (text != null) echo(text)
  }
}
const addShipInteractionCommand = function (name, resolver) {
  addCommand(name, function (req) {
    let text;
    locateShip(req, function (ship, id, args) {
      let rstr = resolver(ship, id, args);
      if (rstr != null) text = identifierString(ship) + " " + rstr;
    })
    return text
  })
}
const kickShip = function (ship, isBanned, args) {
  if (isBanned) {
    game.custom.bans.push(ship.name);
    game.custom.bans = [...new Set(game.custom.bans)]
  }
  let text = isBanned ? "banned" : "kicked";
  ship.gameover({
    [`You've been ${text} by the map host`]: " ",
    "Reason": args || "No reason has been provided"
  });
  return "was " + text
}
addShipInteractionCommand('timeout', function (ship, id, args) {
  if (ship.custom.timeout) {
    clearTimeout(ship.custom.timeoutID);
    removeTimeout(ship);
    return `was removed from timeout`;
  }
  let duration = Number(args), permanent = Number.isNaN(duration) || duration <= 0;
  ship.custom.timeout = true;
  ship.set({ x: 980, y: -980, type: 102, vx: 0, vy: 0, crystals: 0, shield: 100, collider: true });
  for (let i = 0; i < ids.length; i++) sendUI(ship, { id: ids[i], visible: false });
  sendUI(ship, { id: "timeout", position: [25, 85, 50, 25], visible: true, components: [{ type: "text", position: [0, 0, 100, 20], value: "You are in timeout!", color: "#ffbbbb" }] });
  sendUI(ship, { id: "Options", visible: false });
  sendUI(ship, { id: "Restore", visible: false });
  sendUI(ship, { id: "Stats", visible: false });
  if (!permanent) ship.custom.timeoutID = setTimeout(removeTimeout, duration * 1000, ship);
  return `was timed out ${permanent ? "permanently" : ("for " + duration + " second(s)")}`
});
addShipInteractionCommand('weapons', function (ship, id, args) {
  ship.custom.weapons = !ship.custom.weapons;
  return `was ${ship.custom.weapons ? "allowed" : "denied"} to use secondaries!`;
});
addShipInteractionCommand('admin', function (ship, id, args) {
  let perms = (ship.custom.authorize = !ship.custom.authorize);
  sendUI(ship, { id: "Admin ship", position: [27, 0, 10, 4], clickable: perms, visible: perms, shortcut: "M", components: [{ type: "box", position: [0, 0, 200, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 }, { type: "text", position: [0, 30, 100, 60], value: "Admin ship [M]", color: "#cde" }] });
  sendUI(ship, { id: "gamer", position: [18, 0, 10, 4], clickable: perms, visible: perms, shortcut: "K", components: [{ type: "box", position: [0, 0, 200, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 }, { type: "text", position: [0, 30, 100, 60], value: "TELEPORT", color: "#cde" }] });
  sendUI(ship, { id: "rotate", position: [18, 0, 10, 4], clickable: perms, visible: perms, shortcut: "L", components: [{ type: "box", position: [0, 0, 200, 100], fill: "rgba(68, 85, 102, 0)", stroke: "#cde", width: 5 }, { type: "text", position: [0, 30, 100, 60], value: "Rotate", color: "#cde" }] });
  if (!ship.custom.authorize && ship.type > 790) ship.set({ type: 101, crystals: 20, collider: true });
  return `was ${ship.custom.authorize ? "granted" : "removed from"} admin permissions!`;
});
addShipInteractionCommand('mute', function (ship, id, args) {
  let keys = game.options.vocabulary.concat({ key: "C" });
  for (let i = 0; i < keys.length; i++)
    sendUI(ship, { id: "mute1" + i, clickable: true, shortcut: keys[i].key, position: [0, 0, 0, 0] });
  return 'was muted';
});
addShipInteractionCommand('crash', function (ship, id, args) {
  let crash = (ship.custom.crash = !ship.custom.crash);
  ship.set({ vx: 0, vy: 0, idle: crash });
  sendUI(ship, { id: "yeet", position: [0, 0, 500, 500], clickable: crash, visible: crash, components: [{ type: "box", position: [-50, -50, 100, 100], fill: "rgba(3, 247, 255, 100)", stroke: "#cde", width: 5 }, { type: "text", position: [0, 60, 10, 10], value: "Stop being an ass", color: "#cde" }] });
  sendUI(ship, { id: "click", position: [0, 0, 500, 500], clickable: crash, visible: crash, components: [{ type: "box", position: [-50, -50, 100, 100], fill: "rgba(3, 247, 255, 0)", stroke: "#cde", width: 5 }, { type: "text", position: [0, 60, 10, 10], value: "Stop being an ass", color: "#cde" }] });
  if (crash) sendUI(ship, { id: "Options", clickable: !crash });
  else ship.custom.init = false;
  sendUI(ship, { id: "Restore", visible: !crash });
  return `was ${crash ? "yeeted" : "forgiven"}`
});
addShipInteractionCommand('kick', function (ship, id, args) {
  return kickShip(ship, false, args)
});
addShipInteractionCommand('ban', function (ship, id, args) {
  return kickShip(ship, true, args)
});
addCommand('banlist', function () {
  echo("List of currently banned names (type `unban <index1> <index2> ...` to unban): ");
  game.custom.bans.forEach((name, i) => echo(i + 1 + ": " + name));
  if (game.custom.bans.length == 0) echo("No bans.");
});
addCommand('unban', function (args) {
  args.split(" ").forEach(v => {
    let name = game.custom.bans[--v];
    if (name != null) {
      game.custom.bans[v] = null;
      echo(`Removed the ban for '${name}'`)
    }
  })
  game.custom.bans = game.custom.bans.filter(v => v != null)
})
addCommand('announce', function (text) {
  sendUI(game, {
    id: "id", position: [25, 75, 50, 25], visible: true,
    components: [{ type: "text", position: [0, 0, 100, 20], value: text, color: "#ffbbbb" }]
  });
  setTimeout(function () { sendUI(game, { id: "id", visible: false }); }, 12500);
  return 'Announced the message to everyone'
});
addCommand('playerlist', playerData);
addCommand('count', function () {
  echo("List of entities and their numbers :")
  echo("Asteroids: " + game.asteroids.length)
  echo("Players: " + game.ships.length)
  echo("Aliens: " + game.aliens.length)
});
addCommand('clearmap', function () {
  game.setCustomMap("");
  return "Game map has been cleared"
})
addCommand("restoremap", function () {
  game.setCustomMap(map);
  return "Game map has been restored"
});
addCommand('entityclear', function () {
  for (let alien of game.aliens) alien.set({ kill: true });
  for (let asteroid of game.asteroids) asteroid.set({ kill: true });
  return "Entities have been cleared!"
});
addCommand('playerclear', function () {
  for (let ship of game.ships) ship.set({ kill: true });
  return "Players have been cleared!"
});