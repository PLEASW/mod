//Credit to 45rfew/Money as well as ___ and Bhpsngum

/**
 * Add asteroid into box.
 * Add another button to warp players to the admin.
 * fix admin ships.
 * new button: vanilla, balance version and speedster. Seperate customs and speedster.
 * Spawn Alien random across the map.
 * Auto align buttons.
 * Add page to the list of button.
 */

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

function shipCargo(ship) { return Math.trunc(ship / 100) ** 2 * 20; }

const sendUI = function (ship, UI) {
  if (ship != null && typeof ship.setUIComponent == "function") {
    if (UI.visible || UI.visible == null) ship.setUIComponent(UI);
    else ship.setUIComponent({ id: UI.id, position: [0, 0, 0, 0], visible: false });
  }
};

function initialize(ship) {
  if (ship.custom.init) return;
  ship.custom.options = true;
  ship.custom.init = true;
  const options = `Options[${optionshortcut}]`;
  sendUI(ship, {
    id: "Options",
    position: [73.4, 0, 6.6, 4],
    clickable: true,
    visible: true,
    shortcut: optionshortcut,
    components: [
      { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: buttonColor, width: 5 },
      { type: "text", position: Center(options.length * 7, 100), value: options, color: buttonColor },
    ]
  });
  const restore = `Restore[${restoreshortcut}]`;
  sendUI(ship, {
    id: "Restore",
    position: [66.3, 0, 7.2, 4],
    clickable: true,
    visible: true,
    shortcut: restoreshortcut,
    components: [
      { type: "box", position: [0, 0, 100, 100], fill: "rgba(68, 85, 102, 0)", stroke: buttonColor, width: 5 },
      { type: "text", position: Center(restore.length * 7, 100), value: restore, color: buttonColor },
    ]
  });
  welcomeText(ship);
}
this.tick = function (game) {
  if (game.step % 15 === 0) {
    for (let ship of game.ships) !ship.custom.weapons && ship.emptyWeapons();
    if (game.step % 30 === 0) {
      for (let ship of game.ships) {
        if (!ship.custom.spectator && Math.abs(ship.vx) < 1 && Math.abs(ship.vy) < 1)
          ship.set({ collider: true });

        const shipCrystals = shipCargo(ship.type);
        if (old_gem_pickup && ship.crystals === shipCrystals) ship.set({ crystals: shipCrystals - 1 })

        if (game.custom.bans.indexOf(ship.name) != -1) {
          ship.gameover({ "You have been banned from the game!": " " });
          ship.set({ kill: true });
        }
        initialize(ship);
        if (game.step % 1800 === 0 && game.ships.length > 1 && autolist == true) playerData();
      }
      if (game.aliens.length < max_aliens && alien_portal === true)
        game.addAlien(alien_array[Math.trunc(Math.random() * alien_array.length)]);

      if (alien_portal === false) for (let alien of game.aliens) alien.set({ kill: true });

    }
  }
};

const welcomeText = function (ship, text) {
  clearTimeout(ship.custom.welcomeTextID);
  sendUI(ship, {
    id: "welcome",
    visible: true,
    position: [35, 85, 30, 10],
    components: [
      { type: "text", position: [0, 0, 100, 100], value: text || "Duel and chill, no toxic behaviours please.", color: "#cde" }
    ]
  });
  if (text) ship.custom.welcomeTextID = setTimeout(welcomeText, 2000, ship);
}

const boxes = {
  "Spawn": [0, 0],
  "AOW Pattern": [-855, -835],
  "Nexus Pattern": [-525, -855],
  "Light Pattern ": [-195, -855],
  "Zebra Pattern": [195, -855],
  "Rumble": [-845, 845],
  "Plinko": [-515, 855],
  "Standoff": [-195, 845],
  "Waffle": [195, 845],
  "Open Arena": [515, 845],
  "Maze": [515, -845],
  "Empty Circle": [845, 845],
  "Empty box": [845, -845],
};

function Center(width, height) {
  return [50 - width / 2, 50 - height / 2, width, height];
}

const ids = ["Next ship", "Previous ship", "Others", "Spectate", "Reset", "Stats", "Warp"];
const UIevents = {
  switch: function (input, ship) {
    const next = globalShips[globalShips.indexOf(ship.type) + input] || globalShips[0];
    ship.set({ type: next, shield: 999, crystals: shipCargo(next), stats: next >= 700 ? 0 : 88888888 });
    ship.custom.spectator = false;
  },
  next: function (ship) {
    if (ship.type === globalShips[globalShips.length - 1])
      return ship.set({ type: globalShips[0], crystals: 20, stats: 88888888 });
    this.switch(1, ship);
  },
  previous: function (ship) {
    if (ship.type === globalShips[0])
      return ship.set({ type: globalShips[globalShips.length - 1], shield: 999, crystals: 980 });
    this.switch(-1, ship);
  },
  spectate: function (ship) {
    ship.custom.spectator = true;
    ship.set({ crystals: 0, collider: false, type: ship.type === 102 && 103 || 102 });
  },
  reset: function (ship) {
    if (ship.type !== 101) ship.set({ type: 101, crystals: 20, stats: 11111111, shield: 100 });
    ship.custom.spectator = false;
  },
  others: function (ship) {
    const next = otherShips[otherShips.indexOf(ship.type) + 1] || otherShips[0];
    ship.set({ type: next, shield: 999, crystals: shipCargo(next), stats: next >= 700 ? 0 : 88888888 })
    ship.custom.spectator = false;
  },
  restore: function (ship) {
    ship.set({ shield: 999, crystals: shipCargo(ship.type) });
  },
  stats: function (ship) {
    if (Math.trunc(ship.type / 100) < 7) ship.set({ stats: 999999999 * !ship.stats })
  },
  admin: function (ship) {
    if (ship.custom.authorize === true) {
      const next = adminShipsCodes[adminShipsCodes.indexOf(ship.type) + 1] || adminShipsCodes[0];
      ship.set({ type: next, crystals: 20, generator: 10000, collider: true });
    }
  },
  yeet: function (ship) {
    if (ship.custom.authorize === true) {
      ship.set({ type: 101, crystals: 0, vx: 0, vy: 0, x: 985, y: -985 });
    }
  },
  gamer: function (ship) {
    if (ship.custom.authorize === true) ship.set({
      x: Math.cos(ship.r) * 10 + ship.x,
      y: Math.sin(ship.r) * 10 + ship.y,
      z: 15
    });
  },
  rotate: function (ship) {
    if (ship.custom.authorize === true) for (let ship of game.ships) if (ship.name == aimbotname) {
      ship.set({
        x: Math.cos(game.ships[aimbotplayer].r) * 20 + game.ships[aimbotplayer].x,
        y: Math.sin(game.ships[aimbotplayer].r) * 20 + game.ships[aimbotplayer].y
      });
    }
  },
  empty: function (ship) {
    ship.emptyWeapons();
  },
  warp: function (ship) {
    if (game.ships.length <= 1) return;

    ship.set({ crystals: 0, collider: false, type: 102 });
    ship.custom.spectator = true;

    let index = ship.custom.index || 0, target;
    do target = game.ships[++index] || game.ships[index = 0];
    while (target == ship);
    ship.set({ x: target.x, y: target.y });
    ship.custom.index = index;
  },
  options: function (ship) {
    if (ship.custom.options) {
      let x = 2, y = 1;
      ids.forEach(id => {
        if (x % 5 == 0) { x = 0; y++; }
        sendUI(ship, {
          id, position: [25 + x * 11, 11 + y * 11, 10, 10], visible: true, clickable: true,
          components: [
            { type: "box", position: [0, 0, 100, 100], fill: "rgba(0, 0, 0, 0.5)", stroke: buttonColor, width: 5 },
            { type: "text", position: Center(id.length * 7, 100), value: id, color: buttonColor }
          ]
        })
        x++;
      })
      x -= 2;
      Object.keys(boxes).forEach(id => {
        if (x % 5 == 0) { x = 0; y++; }
        sendUI(ship, {
          id, position: [25 + x * 11, 24 + y * 11, 10, 10], visible: true, clickable: true,
          components: [
            { type: "box", position: [0, 0, 100, 100], fill: "rgba(0, 0, 0, 0.5)", stroke: buttonColor, width: 5 },
            { type: "text", position: Center(id.length * 7, 100), value: id, color: buttonColor }
          ]
        })
        x++;
      })
      sendUI(ship, {
        id: 'board',
        position: Center(60, 60),
        visible: true,
        components: [
          { type: 'box', position: [0, 0, 100, 100 * 2 / 5], fill: `hsla(192, 100%, 50%, 0.5)` },
          { type: 'box', position: [0, 2 / 5 * 100, 100, 100 * 3 / 5], fill: `hsla(0, 100%, 50%, 0.5)` },
          { type: "text", position: [0, 0, 40, 20], value: 'Ships', color: buttonColor },
          { type: "text", position: [0, 40, 40, 20], value: 'Maps', color: buttonColor },
          { type: 'box', position: [0, 0, 100, 100], stroke: buttonColor, width: 5 },
          { type: 'box', position: [0, 39.5, 100, 1], fill: 'rgba(255, 255, 255, 0.2)', width: 5 },
        ]
      })
    } else { [...ids, ...Object.keys(boxes), 'board'].forEach(id => sendUI(ship, { id, visible: false })); }
    ship.custom.options = !ship.custom.options;
  }
};

this.event = function (event, game) {
  const { ship, id: component } = event;
  switch (component) {
    case "Spectate":
      UIevents.spectate(ship);
      break;
    case "Stats":
      UIevents.stats(ship);
      break;
    case "Options":
      UIevents.options(ship);
      break;
    case "Reset":
      UIevents.reset(ship);
      break;
    case "Warp":
      UIevents.warp(ship);
      break;
    default:
      for (let i in boxes) {
        const [x, y] = boxes[i];
        if (component === i) {
          return ship.set({ x, y });
        }
      }
  }
  if (!ship.custom.lastClickedStep || game.step - ship.custom.lastClickedStep > buttonDelay) {
    ship.custom.lastClickedStep = game.step;
    switch (component) {
      case "Next ship":
        UIevents.next(ship)
        break;
      case "Previous ship":
        UIevents.previous(ship);
        break;
      case "Others":
        UIevents.others(ship);
        break;
      case "Restore":
        UIevents.restore(ship);
        break;
      case "yeet":
        UIevents.yeet(ship);
        break;
      case "gamer":
        UIevents.gamer(ship);
        break;
      case "rotate":
        UIevents.rotate(ship);
        break;
      case "empty":
        UIevents.empty(ship);
        break;
      case "Admin ship":
        UIevents.admin(ship);
        break;
    }
  } else if (!['Spectate', 'Stats', 'Options', 'Reset', 'Warp'].includes(component)) welcomeText(ship, "Too fast, hold up for a bit");
  if (ship != null && !ship.custom.crashed && !ship.custom.timeout) switch (event.name) {
    case "ship_spawned":
      const [x, y] = [ship.custom.last_x ?? 0, ship.custom.last_y ?? 0];
      ship.set({ x, y, invulnerable: 300, crystals: shipCargo(ship.type) });
      break;
    case "ship_destroyed":
      Object.assign(ship.custom, { last_x: ship.x, last_y: ship.y })
      break;
  }
};