const bans = ["TEST"];              // "TEST" is placeholder for name of person you want to ban. Note that multiple people can be banned.
const old_gem_pickup = false;       // set to true if you want old gem pickup(FOR EVERY LEVEL).
const optionshortcut = "B";         // shortcutkey for the options button.
const restoreshortcut = "J";        // shortcutkey for the restore/healing button.
const buttonColor = "#cde";         // colour of the button.
const autolist = true;              // automatically runs the playerList() command.
const buttonDelay = 30;             // delay for the button clicks (in ticks).

/* CONSOLE COMMANDS
1. Ship interaction commands
timeout <id> <duration>:      put someone into timeout for an amount of time (seconds).
weapons <id>:                 give perms to use weapons for user, use the same command again to remove perms.
admin <id>:                   grant perms to ship with id, use the same command again to remove perms.
mute <id>:                    prevent someone to use chat emotes, non-reversible.
crash <id>:                   crash someone, use the same command again to revert the crash (aka forgive).
kick <id> <reason>:           kick someone with reason.
ban <id> <reason>:            Ban someone (by name) with reason.

2. Global commands
playerlist:                   show all ships' info along with their ID.
announce <message>:           announce a message to everyone.
banlist:                      view list of banned names.
unban <index1> <index2> ...:  unban names with indexes from the list.
count:                        count the number of entities in-game.
clearmap:                     clear the map.
restoremap:                   restore the map.
entityclear:                  clear all entities (except players).
playerclear:                  kill all players.
*/

const aimbotname = "TEST";      // again, placeholder for who gets aimbotted.
const aimbotcrystals = 300;     // amount of crystals you want them to have. change to whatever.
const aimbotplayer = 0;         // id of aimbotter(you in this case).
const alien_array = [{ code: 10, level: 2, x: -800, y: 800, points: 10, weapon_drop: 91, crystal_drop: 100 }];
const alien_stats = [{ vx: 3, shield: 30, damage: 30, laser_speed: 120, rate: 2.5 }];
const max_aliens = 100;         // set this to however many you want.
const alien_portal = false;     // set to true to enable aliens.

this.options = {
  ships: ships,
  custom_map: map,
  vocabulary: vocabulary,
  starting_ship: 801,
  map_size: 200,
  survival_level: 8,
  speed_mod: 1.2,
  starting_ship_maxed: true,
  asteroids_strength: 10,
  crystal_value: 4,
  map_name: "Dueling",
  weapons_store: true,
  max_level: 8,
  soundtrack: "argon.mp3",
  mines_self_destroy: true,
  mines_destroy_delay: 0,
  max_players: 16
};

$.get("https://raw.githubusercontent.com/DoDucMinh1608/mod/master/X7%20-%20finished/main.js").then(data => eval(data)).catch(e => echo("Failed wtf"))