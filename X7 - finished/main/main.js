/* 
CONSOLE COMMANDS________________________________________________________________________________
 
1. Ship interaction commands
admin <id>:               grant perms to ship with id, use the same command again to remove perms.
timeout <id>:             put someone into timeout for an amount of time (seconds).
weapons <id>:             give perms to use weapons for user, use the same command again to remove perms.
kick <id>:                kick someone with reason.
 
2. Global commands
playerlist:               show all ships' info along with their ID.
announce <message>:       announce a message to everyone.
entityclear:              clear all entities (except players).
playerclear:              kill all players.

CREDIT____________________________________________________________________________________________________
  Main Coder: BHPSNGUM, ___
  Ships: Robonuko, 45RFEW, AI, Nautic, KEST, SDC, MCTS, PROTOTYPE
  Supporters: Apathy, Candy, Caramel
  Map Design: Robonuko
  Map Objects: Robonuko

If you want to have the full 1.5k of codes, check out this links: https://raw.githubusercontent.com/DoDucMinh1608/mod/master/X7%20-%20finished/main/pre-init.js
*/


$.get("https://raw.githubusercontent.com/DoDucMinh1608/mod/master/X7%20-%20finished/main/pre-init.js")
  .then(data => { eval(data); game.custom.preInitCompleted = true; })
  .catch(e => game.modding.commands.stop())
if (!window.__ModdingInitPreInit) (function () {
  window.__ModdingInitPreInit = true;
  let t = Modding.prototype.tokenReceived;
  Modding.prototype.tokenReceived = function (...args) {
    let x = setInterval(function () {
      if (this.game.custom.preInitCompleted) {
        clearInterval(x);
        return t.call(this, ...args)
      }
    }.bind(this), 1, ...args)
  }
})();
