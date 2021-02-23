// Starblast Dueling v2.1

kick = function (i, reason = "Unspecified.") {
  game.ships[i].gameover({
    "You were kicked for reason: ": reason,
    "Your name: ": game.ships[i].name,
    "Kicked by:": game.ships[0].name,
    "Score: ": game.ships[i].score,
  });
};
info = function () {
  game.modding.terminal.echo("Total amount of aliens:" + game.aliens.length);
  game.modding.terminal.echo(
    "Total amount of asteroids:" + game.asteroids.length
  );
  game.modding.terminal.echo("Total amount of players:" + game.ships.length);
  for (nn = 0; nn < game.ships.length; nn++) {
    game.modding.terminal.echo(
      nn +
        ": " +
        game.ships[nn].name +
        ", type: " +
        game.ships[nn].type +
        " X,Y: " +
        game.ships[nn].x +
        ", " +
        game.ships[nn].y
    );
  }
};

var sub1 = {
  id: "sub1",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/sub%20to%20lex2.png",
};
game.setObject({
  id: "sub1",
  type: sub1,
  position: { x: 0, y: 4, z: -10 },
  rotation: { x: Math.PI / 2, y: Math.PI, z: 0 },
  scale: { x: 5, y: 5, z: 5 },
});

var sub2 = {
  id: "sub2",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/sub%20to%20lex.png",
};
game.setObject({
  id: "sub2",
  type: sub2,
  position: { x: 78, y: 10, z: 0 },
  rotation: { x: Math.PI / 2, y: Math.PI / 2, z: 0 },
  scale: { x: 5, y: 5, z: 5 },
});

var arrow2 = {
  id: "arrow2",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/arrow.png",
};
game.setObject({
  id: "arrow2",
  type: arrow2,
  position: { x: 85, y: 15, z: 0 },
  rotation: { x: Math.PI / 2, y: (Math.PI / 2) * 3, z: 0 },
  scale: { x: 2, y: 2, z: 2 },
});

var arrow3 = {
  id: "arrow3",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/arrow.png",
};
game.setObject({
  id: "arrow3",
  type: arrow3,
  position: { x: 85, y: 5, z: 0 },
  rotation: { x: Math.PI / 2, y: (Math.PI / 2) * 3, z: 0 },
  scale: { x: 2, y: 2, z: 2 },
});

//LEFT SIDE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

var sub3 = {
  id: "sub3",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/sub%20to%20lex.png",
};
game.setObject({
  id: "sub3",
  type: sub3,
  position: { x: -78, y: 10, z: 0 },
  rotation: { x: Math.PI / 2, y: (Math.PI / 2) * 3, z: 0 },
  scale: { x: 5, y: 5, z: 5 },
});

var arrow4 = {
  id: "arrow4",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/arrow.png",
};
game.setObject({
  id: "arrow4",
  type: arrow4,
  position: { x: -85, y: 15, z: 0 },
  rotation: { x: Math.PI / 2, y: Math.PI / 2, z: 0 },
  scale: { x: 2, y: 2, z: 2 },
});

var arrow5 = {
  id: "arrow5",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/arrow.png",
};
game.setObject({
  id: "arrow5",
  type: arrow5,
  position: { x: -85, y: 5, z: 0 },
  rotation: { x: Math.PI / 2, y: Math.PI / 2, z: 0 },
  scale: { x: 2, y: 2, z: 2 },
});

//TOP SIDE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

var arrow6 = {
  id: "arrow6",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/arrow.png",
};
game.setObject({
  id: "arrow6",
  type: arrow6,
  position: { x: 5, y: 93, z: 0 },
  rotation: { x: Math.PI / 2, y: 0, z: 0 },
  scale: { x: 2, y: 2, z: 2 },
});

var arrow7 = {
  id: "arrow7",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/arrow.png",
};
game.setObject({
  id: "arrow7",
  type: arrow7,
  position: { x: -5, y: 93, z: 0 },
  rotation: { x: Math.PI / 2, y: 0, z: 0 },
  scale: { x: 2, y: 2, z: 2 },
});

var sub4 = {
  id: "sub4",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/sub%20to%20lex.png",
};
game.setObject({
  id: "sub4",
  type: sub4,
  position: { x: 0, y: 85, z: 0 },
  rotation: { x: Math.PI / 2, y: Math.PI, z: 0 },
  scale: { x: 5, y: 5, z: 5 },
});

//BOTTOM SIDE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

var arrow8 = {
  id: "arrow8",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/arrow.png",
};
game.setObject({
  id: "arrow8",
  type: arrow8,
  position: { x: 5, y: -75, z: 0 },
  rotation: { x: Math.PI / 2, y: Math.PI, z: 0 },
  scale: { x: 2, y: 2, z: 2 },
});

var arrow9 = {
  id: "arrow9",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/arrow.png",
};
game.setObject({
  id: "arrow9",
  type: arrow9,
  position: { x: -5, y: -75, z: 0 },
  rotation: { x: Math.PI / 2, y: Math.PI, z: 0 },
  scale: { x: 2, y: 2, z: 2 },
});

var sub5 = {
  id: "sub5",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/sub%20to%20lex.png",
};
game.setObject({
  id: "sub5",
  type: sub5,
  position: { x: 0, y: -67, z: 0 },
  rotation: { x: Math.PI / 2, y: Math.PI * 2, z: 0 },
  scale: { x: 5, y: 5, z: 5 },
});

var lex = {
  id: "lex",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/lex%20cropped.png",
};
game.setObject({
  id: "lex",
  type: lex,
  position: { x: 0, y: 13, z: -10 },
  rotation: { x: Math.PI / 2, y: Math.PI, z: 0 },
  scale: { x: 2, y: 2, z: 2 },
});

var circl = {
  id: "circl",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/circl.png",
};
game.setObject({
  id: "circl",
  type: circl,
  position: { x: -15, y: -35.2, z: 0 },
  rotation: { x: Math.PI / 2, y: Math.PI, z: 0 },
  scale: { x: 3.8, y: 3.8, z: 3.8 },
});

var circl2 = {
  id: "circl2",
  obj:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/plane.obj",
  shininess: 0,
  emissiveColor: "#FFFFFF",
  emissive:
    "https://raw.githubusercontent.com/LGamingOfficial/starblast/main/circl.png",
};
game.setObject({
  id: "circl2",
  type: circl2,
  position: { x: 5, y: 55, z: 0 },
  rotation: { x: Math.PI / 2, y: Math.PI, z: 0 },
  scale: { x: 3.8, y: 3.8, z: 3.8 },
});

var switch_button = {
  id: "switch",
  position: [66, 1, 2.5, 4],
  clickable: true,
  shortcut: "V",
  visible: true,
  components: [
    {
      type: "box",
      position: [0, 0, 100, 100],
      fill: "rgba(68, 85, 102, 0)",
      stroke: "rgba(204, 221, 238, 0.667)",
      width: 2,
    },
    {
      type: "text",
      position: [10, 23, 80, 30],
      value: "SWITCH",
      color: "rgba(204, 221, 238, 0.8)",
    },
    {
      type: "text",
      position: [10, 45, 80, 23],
      value: "SHIP",
      color: "rgba(204, 221, 238, 0.8)",
    },
    {
      type: "text",
      position: [20, 70, 60, 20],
      value: "[V]",
      color: "rgba(204, 221, 238, 0.8)",
    },
  ],
};

var stats_button = {
  id: "stats",
  position: [69, 1, 2.5, 4],
  clickable: true,
  shortcut: "B",
  visible: true,
  components: [
    {
      type: "box",
      position: [0, 0, 100, 100],
      fill: "rgba(68, 85, 102, 0)",
      stroke: "rgba(204, 221, 238, 0.667)",
      width: 2,
    },
    {
      type: "text",
      position: [10, 23, 80, 30],
      value: "TOGGLE",
      color: "rgba(204, 221, 238, 0.8)",
    },
    {
      type: "text",
      position: [10, 45, 80, 23],
      value: "STATS",
      color: "rgba(204, 221, 238, 0.8)",
    },
    {
      type: "text",
      position: [20, 70, 60, 20],
      value: "[B]",
      color: "rgba(204, 221, 238, 0.8)",
    },
  ],
};

var reset_button = {
  id: "reset",
  position: [72, 1, 2.5, 4],
  clickable: true,
  shortcut: "J",
  visible: true,
  components: [
    {
      type: "box",
      position: [0, 0, 100, 100],
      fill: "rgba(68, 85, 102, 0)",
      stroke: "rgba(204, 221, 238, 0.667)",
      width: 2,
    },
    {
      type: "text",
      position: [10, 34, 80, 25],
      value: "RESET",
      color: "rgba(204, 221, 238, 0.8)",
    },
    {
      type: "text",
      position: [20, 70, 60, 20],
      value: "[R]",
      color: "rgba(204, 221, 238, 0.8)",
    },
  ],
};

var crystals_button = {
  id: "crystals",
  position: [75, 1, 2.5, 4],
  clickable: true,
  shortcut: "M",
  visible: true,
  components: [
    {
      type: "box",
      position: [0, 0, 100, 100],
      fill: "rgba(68, 85, 102, 0)",
      stroke: "rgba(204, 221, 238, 0.667)",
      width: 2,
    },
    {
      type: "text",
      position: [10, 34, 80, 25],
      value: "CRYSTALS",
      color: "rgba(204, 221, 238, 0.8)",
    },
    {
      type: "text",
      position: [20, 70, 60, 20],
      value: "[M]",
      color: "rgba(204, 221, 238, 0.8)",
    },
  ],
};

var god_button = {
  id: "admin",
  position: [],
  clickable: true,
  shortcut: "Z",
  visible: true,
  components: [],
};

var buttons = [stats_button, reset_button, switch_button, crystals_button];

var AdminToolPrecision_791 =
  '{"name":"AdminToolPrecision","level":7.9,"model":1,"size":1,"zoom":0.7,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"bodies":{"object0":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-30,-30,0,0],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[4],"angle":0,"laser":{"damage":[1055,1055],"rate":10,"speed":[400,400],"number":1}}},"typespec":{"name":"AdminToolPrecision","level":7.9,"model":1,"code":791,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"shape":[0.601,0.604,0.373,0.227,0.166,0.129,0.11,0.097,0.085,0.079,0.075,0.073,0.071,0.071,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.071,0.073,0.075,0.079,0.085,0.097,0.11,0.129,0.166,0.227,0.373,0.604],"lasers":[{"x":0,"y":-0.6,"z":0,"angle":0,"damage":[1055,1055],"rate":10,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0}],"radius":0.604}}';
var AdminToolLocal_792 =
  '{"name":"AdminToolLocal","level":7.9,"model":2,"size":1,"zoom":0.7,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"bodies":{"object0":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":0,"texture":4,"laser":{"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"angle":324,"error":0,"recoil":0}},"object1":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":45,"texture":4,"laser":{"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"angle":324,"error":0,"recoil":0}},"object2":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":90,"texture":4,"laser":{"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"angle":324,"error":0,"recoil":0}},"object3":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":135,"texture":4,"laser":{"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"angle":324,"error":0,"recoil":0}},"object4":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":180,"texture":4,"laser":{"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"angle":324,"error":0,"recoil":0}},"object5":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":225,"texture":4,"laser":{"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"angle":324,"error":0,"recoil":0}},"object6":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":270,"texture":4,"laser":{"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"angle":324,"error":0,"recoil":0}},"object7":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":315,"texture":4,"laser":{"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"angle":324,"error":0,"recoil":0}}},"typespec":{"name":"AdminToolLocal","level":7.9,"model":2,"code":792,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"shape":[1,0.737,0.373,0.227,0.32,0.651,1,0.848,0.45,0.25,0.279,0.562,0.996,1,0.562,0.279,0.25,0.45,0.848,1,0.651,0.32,0.227,0.373,0.737,1,0.737,0.373,0.227,0.32,0.651,1,0.848,0.45,0.25,0.279,0.562,0.996,1,0.562,0.279,0.25,0.45,0.848,1,0.651,0.32,0.227,0.373,0.737],"lasers":[{"x":0,"y":-1,"z":0,"angle":0,"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"spread":324,"error":0,"recoil":0},{"x":-0.707,"y":-0.707,"z":0,"angle":45,"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"spread":324,"error":0,"recoil":0},{"x":-1,"y":0,"z":0,"angle":90,"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"spread":324,"error":0,"recoil":0},{"x":-0.707,"y":0.707,"z":0,"angle":135,"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"spread":324,"error":0,"recoil":0},{"x":0,"y":1,"z":0,"angle":180,"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"spread":324,"error":0,"recoil":0},{"x":0.707,"y":0.707,"z":0,"angle":225,"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"spread":324,"error":0,"recoil":0},{"x":1,"y":0,"z":0,"angle":270,"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"spread":324,"error":0,"recoil":0},{"x":0.707,"y":-0.707,"z":0,"angle":315,"damage":[1055,1055],"rate":10,"speed":[500,500],"number":10,"spread":324,"error":0,"recoil":0}],"radius":1}}';
var AdminToolGlobal_793 =
  '{"name":"AdminToolGlobal","level":7.9,"model":3,"size":1,"zoom":0.7,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"bodies":{"object0":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":0,"texture":17,"laser":{"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"angle":324,"error":0,"recoil":20000}},"object1":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":45,"texture":17,"laser":{"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"angle":324,"error":0,"recoil":20000}},"object2":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":90,"texture":17,"laser":{"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"angle":324,"error":0,"recoil":20000}},"object3":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":135,"texture":17,"laser":{"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"angle":324,"error":0,"recoil":20000}},"object4":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":180,"texture":17,"laser":{"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"angle":324,"error":0,"recoil":20000}},"object5":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":225,"texture":17,"laser":{"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"angle":324,"error":0,"recoil":20000}},"object6":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":270,"texture":17,"laser":{"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"angle":324,"error":0,"recoil":20000}},"object7":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0],"y":[-50,-30,0],"z":[0,0,0]},"width":[0,5,5],"height":[0,5,5],"angle":315,"texture":17,"laser":{"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"angle":324,"error":0,"recoil":20000}}},"typespec":{"name":"AdminToolGlobal","level":7.9,"model":3,"code":793,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"shape":[1,0.737,0.373,0.227,0.32,0.651,1,0.848,0.45,0.25,0.279,0.562,0.996,1,0.562,0.279,0.25,0.45,0.848,1,0.651,0.32,0.227,0.373,0.737,1,0.737,0.373,0.227,0.32,0.651,1,0.848,0.45,0.25,0.279,0.562,0.996,1,0.562,0.279,0.25,0.45,0.848,1,0.651,0.32,0.227,0.373,0.737],"lasers":[{"x":0,"y":-1,"z":0,"angle":0,"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"spread":324,"error":0,"recoil":20000},{"x":-0.707,"y":-0.707,"z":0,"angle":45,"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"spread":324,"error":0,"recoil":20000},{"x":-1,"y":0,"z":0,"angle":90,"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"spread":324,"error":0,"recoil":20000},{"x":-0.707,"y":0.707,"z":0,"angle":135,"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"spread":324,"error":0,"recoil":20000},{"x":0,"y":1,"z":0,"angle":180,"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"spread":324,"error":0,"recoil":20000},{"x":0.707,"y":0.707,"z":0,"angle":225,"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"spread":324,"error":0,"recoil":20000},{"x":1,"y":0,"z":0,"angle":270,"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"spread":324,"error":0,"recoil":20000},{"x":0.707,"y":-0.707,"z":0,"angle":315,"damage":[1055,1055],"rate":10,"speed":[1,1],"number":10,"spread":324,"error":0,"recoil":20000}],"radius":1}}';
var Shadow_X_3_702 =
  '{"name":"Shadow X-3","level":7,"model":2,"size":2.2,"specs":{"shield":{"capacity":[350,350],"reload":[10,10]},"generator":{"capacity":[250,250],"reload":[60,60]},"ship":{"mass":300,"speed":[140,140],"rotation":[40,40],"acceleration":[55,55]}},"bodies":{"main":{"section_segments":20,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-125,-123,-110,-65,-40,0,40,70,80,90],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,18,20,20,20,25,25,20,0],"height":[0,5,10,25,20,10,10,15,15,10,10],"texture":[12,63,15,4,63,63,4,63,5,17],"laser":{"damage":[225,225],"rate":1,"type":1,"speed":[200,200],"number":1,"error":0,"recoil":500}},"air":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,-80,-30,-10,10,30,50],"z":[0,0,0,0,0,0,0]},"width":[0,25,35,30,30,32,20],"height":[0,15,10,10,10,10,10,15,15,15,10,10],"texture":[4,3,2,2,2,3]},"back":{"section_segments":10,"offset":{"x":0,"y":-10,"z":0},"position":{"x":[0,0,0,0,0],"y":[90,95,100,105,90],"z":[0,0,0,0,0]},"width":[10,15,18,22,2],"height":[3,5,7,8,2],"texture":[63],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-30,"z":18},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-45,-25,0,25,60,90,100],"z":[0,0,0,0,-10,-8,-10]},"width":[0,5,10,12,15,10,10],"height":[0,10,15,10,15,10,10],"texture":[63,9,9,10,63,3]},"laser":{"section_segments":10,"offset":{"x":70,"y":10,"z":-19},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-25,0,10,20,25,30,40,70,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,10,0],"height":[0,10,15,15,15,10,10,15,5,0],"texture":[6,4,10,3,4,3,2],"propeller":true,"laser":{"damage":[4,4],"rate":3,"type":1,"speed":[150,150],"number":1}},"laser2":{"section_segments":10,"offset":{"x":40,"y":-20,"z":-20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-25,0,10,20,25,30,40,70,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,12,0],"height":[0,10,15,15,15,10,10,15,5,0],"texture":[6,4,10,3,4,3,2],"propeller":true,"laser":{"damage":[4,4],"rate":4,"type":1,"speed":[150,150],"number":1}}},"wings":{"wings":{"offset":{"x":10,"y":0,"z":0},"length":[30,10,25,20],"width":[100,50,60,40,35],"angle":[0,0,0,0],"position":[0,0,10,30,-10],"texture":[4,63,4,3],"bump":{"position":-20,"size":15}}},"typespec":{"name":"Shadow X-3","level":7,"model":2,"code":702,"specs":{"shield":{"capacity":[350,350],"reload":[10,10]},"generator":{"capacity":[250,250],"reload":[60,60]},"ship":{"mass":300,"speed":[140,140],"rotation":[40,40],"acceleration":[55,55]}},"shape":[5.5,5.148,3.672,3.494,2.869,2.826,2.926,2.944,2.773,2.638,4.352,4.315,4.212,4.192,4.125,3.991,4.111,4.493,4.84,4.963,4.568,2.606,3.558,4.28,4.255,4.188,4.255,4.28,3.558,2.606,4.568,4.963,4.84,4.493,4.111,3.991,4.125,4.192,4.212,4.315,4.352,2.638,2.773,2.944,2.926,2.826,2.869,3.494,3.672,5.148],"lasers":[{"x":0,"y":-5.5,"z":0,"angle":0,"damage":[225,225],"rate":1,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":500},{"x":3.08,"y":-0.88,"z":-0.836,"angle":0,"damage":[4,4],"rate":3,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.08,"y":-0.88,"z":-0.836,"angle":0,"damage":[4,4],"rate":3,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.76,"y":-2.2,"z":-0.88,"angle":0,"damage":[4,4],"rate":4,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.76,"y":-2.2,"z":-0.88,"angle":0,"damage":[4,4],"rate":4,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.5}}';
var A_Speedster_605 =
  '{"name":"A-Speedster","level":6,"model":5,"size":1.5,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[80,140],"reload":[30,45]},"ship":{"mass":175,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-100,-95,0,0,70,65],"z":[0,0,0,0,0,0]},"width":[0,10,40,20,20,0],"height":[0,5,30,30,15,0],"texture":[6,11,5,63,12],"propeller":true,"laser":{"damage":[38,84],"rate":1,"type":2,"speed":[175,230],"recoil":50,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,10,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":10,"offset":{"x":50,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,20,10,0],"height":[0,15,20,20,20,15,15,20,10,0],"propeller":true,"texture":[4,4,2,2,5,63,5,4,12]},"cannons":{"section_segments":12,"offset":{"x":30,"y":40,"z":45},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,10,3,5,0],"height":[0,5,7,8,3,5,0],"angle":-10,"laser":{"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"angle":-10,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}},"winglets":{"offset":{"x":0,"y":-40,"z":10},"doubleside":true,"length":[45,10],"width":[5,20,30],"angle":[50,-10],"position":[90,80,50],"texture":[4],"bump":{"position":10,"size":30}}},"typespec":{"name":"A-Speedster","level":6,"model":5,"code":605,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[80,140],"reload":[30,45]},"ship":{"mass":175,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"shape":[3,2.914,2.408,1.952,1.675,1.49,1.349,1.263,1.198,1.163,1.146,1.254,1.286,1.689,2.06,2.227,2.362,2.472,2.832,3.082,3.436,3.621,3.481,2.48,2.138,2.104,2.138,2.48,3.481,3.621,3.436,3.082,2.832,2.472,2.362,2.227,2.06,1.689,1.286,1.254,1.146,1.163,1.198,1.263,1.349,1.49,1.675,1.952,2.408,2.914],"lasers":[{"x":0,"y":-3,"z":0,"angle":0,"damage":[38,84],"rate":1,"type":2,"speed":[175,230],"number":1,"spread":0,"error":0,"recoil":50},{"x":1.16,"y":-0.277,"z":1.35,"angle":-10,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0},{"x":-1.16,"y":-0.277,"z":1.35,"angle":10,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0}],"radius":3.621}}';
var B_Speedster_606 =
  '{"name":"B-Speedster","level":6,"model":6,"size":1.6,"specs":{"shield":{"capacity":[250,350],"reload":[8,10]},"generator":{"capacity":[90,150],"reload":[25,40]},"ship":{"mass":210,"speed":[90,100],"rotation":[50,70],"acceleration":[100,130]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-100,-95,0,0,60,85,75],"z":[0,0,0,0,0,0,0]},"width":[0,10,40,20,22,15,0],"height":[0,5,30,30,20,15,0],"texture":[6,18,5,11,15,17],"propeller":true,"laser":{"damage":[48,94],"rate":1,"type":2,"speed":[185,240],"recoil":70,"number":1,"error":0}},"core":{"vertical":true,"angle":180,"section_segments":[30,90,150,210,270,330],"offset":{"x":0,"y":-5,"z":-40},"position":{"x":[0,0,0,0,0,0,0],"y":[-40,-40,-43,-40,-30,0,0],"z":[0,0,0,0,0,0,0]},"width":[1,13,18,23,30,30,0],"height":[1,13,18,23,30,30,0],"texture":[16.9,4.9,63,3.9,9.9,0.9,11.9]},"ye":{"vertical":true,"section_segments":12,"offset":{"x":0,"y":38,"z":-40},"position":{"x":[0,0,0],"y":[-10,-3,-1],"z":[0,0,0]},"width":[0,5,0],"height":[0,5,0],"texture":[5]},"shield":{"section_segments":12,"offset":{"x":30,"y":-40,"z":0},"position":{"x":[-6,0,0,0,0,-4],"y":[-70,-60,-10,15,30,40],"z":[0,0,0,0,0,0]},"width":[0,3,3,3,3,0],"height":[0,5,5,8,3,0],"texture":63,"angle":16},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,10,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":10,"offset":{"x":50,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,20,10,0],"height":[0,15,20,20,20,15,15,20,10,0],"propeller":true,"texture":[4,4,2,2,5,63,5,4,17]},"cannons":{"section_segments":12,"offset":{"x":30,"y":40,"z":30},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,10,3,5,0],"height":[0,5,7,8,3,5,0],"angle":0,"laser":{"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"angle":-10,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}}},"typespec":{"name":"B-Speedster","level":6,"model":6,"code":606,"specs":{"shield":{"capacity":[250,350],"reload":[8,10]},"generator":{"capacity":[90,150],"reload":[25,40]},"ship":{"mass":210,"speed":[90,100],"rotation":[50,70],"acceleration":[100,130]}},"shape":[3.384,3.353,3.037,2.443,2.076,1.832,1.659,1.541,1.458,1.406,1.378,1.341,1.248,1.801,2.197,2.375,2.52,2.637,3.021,3.288,3.665,3.862,3.713,2.623,2.758,2.725,2.758,2.623,3.713,3.862,3.665,3.288,3.021,2.637,2.52,2.375,2.197,1.801,1.248,1.341,1.378,1.406,1.458,1.541,1.659,1.832,2.076,2.443,3.037,3.353],"lasers":[{"x":0,"y":-3.2,"z":0,"angle":0,"damage":[48,94],"rate":1,"type":2,"speed":[185,240],"number":1,"spread":0,"error":0,"recoil":70},{"x":0.96,"y":-0.32,"z":0.96,"angle":0,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0},{"x":-0.96,"y":-0.32,"z":0.96,"angle":0,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0}],"radius":3.862}}';
var C_Speedster_607 =
  '{"name":"C-Speedster","level":6,"model":7,"size":1.4,"specs":{"shield":{"capacity":[150,250],"reload":[8,10]},"generator":{"capacity":[150,200],"reload":[20,35]},"ship":{"mass":155,"speed":[100,125],"rotation":[55,75],"acceleration":[95,145]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-85,-80,-50,0,0,70,65],"z":[0,0,0,0,0,0,0]},"width":[0,10,21,28,20,20,0],"height":[0,7,16,25,20,15,0],"texture":[63,4,11,5,18,12],"propeller":true,"laser":{"damage":[25,65],"rate":3,"type":1,"speed":[160,200],"number":1}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-50,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,8,10,10,0],"height":[0,10,12,12,0],"texture":[9]},"side_propulsors":{"section_segments":8,"offset":{"x":35,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,-4,6,15,20,35,40,50,85,75],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,18,18,10,0],"height":[0,15,20,20,20,15,15,18,16,10,0],"propeller":true,"texture":[4,4,63,3,5,8,5,63,4,17]},"tops":{"section_segments":12,"offset":{"x":15,"y":45,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-40,-25,0,15,40,35],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,13,11,6,0],"height":[0,5,9,8,6,5,0],"propeller":1,"angle":0,"texture":[5,4,10,63,4,17]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}},"join1":{"offset":{"x":0,"y":20,"z":0},"length":[37],"width":[20,70],"angle":[0],"position":[-95,-10],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}},"join2":{"offset":{"x":0,"y":50,"z":0},"length":[30],"width":[20,70],"angle":[0],"position":[-95,-10],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}}},"typespec":{"name":"C-Speedster","level":6,"model":7,"code":607,"specs":{"shield":{"capacity":[150,250],"reload":[8,10]},"generator":{"capacity":[150,200],"reload":[20,35]},"ship":{"mass":155,"speed":[100,125],"rotation":[55,75],"acceleration":[95,145]}},"shape":[2.38,2.312,2.007,1.668,1.485,1.388,1.314,1.274,1.253,1.179,1.113,1.066,1.042,1.043,1.487,1.656,1.757,1.903,1.92,2.239,2.689,3.102,3.328,3.238,2.423,1.964,2.423,3.238,3.328,3.102,2.689,2.239,1.92,1.903,1.757,1.656,1.487,1.043,1.042,1.066,1.113,1.179,1.253,1.274,1.314,1.388,1.485,1.668,2.007,2.312],"lasers":[{"x":0,"y":-2.38,"z":0,"angle":0,"damage":[25,65],"rate":3,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.328}}';
var Contraband_608 =
  '{"name":"Contraband","level":6,"model":8,"size":1.6,"zoom":0.85,"specs":{"shield":{"capacity":[190,275],"reload":[6,8]},"generator":{"capacity":[125,200],"reload":[30,42.5]},"ship":{"mass":150,"speed":[100,125],"rotation":[60,80],"acceleration":[70,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-75,-80,-20,0,15,20,60,65,80,100,90],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8,24,26,20,20,20,20,25,12,0],"height":[0,5,25,25,20,15,15,15,20,10,0],"texture":[1,2,4,63,5,10,5,63,4,17],"propeller":true,"laser":{"damage":[100,150],"rate":1,"type":2,"speed":[110,150],"recoil":250,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-55,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,5,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":8,"offset":{"x":35,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,-4,6,15,20,35,40,50,85,75],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,18,18,10,0],"height":[0,15,20,20,20,15,15,18,16,10,0],"propeller":true,"texture":[4,4,63,3,5,8,5,63,4,17]},"cannons":{"section_segments":12,"offset":{"x":18,"y":65,"z":20},"position":{"x":[0,0,0,0,0],"y":[-50,-45,-20,-5,5],"z":[0,0,0,0,0]},"width":[0,5,7,8,0],"height":[0,5,7,8,0],"angle":0,"laser":{"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"error":0},"propeller":false,"texture":[6,4,63,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":20,"z":0},"length":[37,0],"width":[20,70],"angle":[0],"position":[-95,0],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}},"join2":{"offset":{"x":25,"y":52,"z":0},"length":[35],"width":[10,10],"angle":[0],"position":[0,0,0,50],"texture":[8],"doubleside":1,"bump":{"position":0,"size":0}},"wing1":{"doubleside":true,"offset":{"x":50,"y":52,"z":-36},"length":[0,30,20,30],"width":[0,0,100,100,0],"angle":[110,70,90,110],"position":[0,0,0,0,0],"texture":[63],"bump":{"position":0,"size":5}}},"typespec":{"name":"Contraband","level":6,"model":8,"code":608,"specs":{"shield":{"capacity":[190,275],"reload":[6,8]},"generator":{"capacity":[125,200],"reload":[30,42.5]},"ship":{"mass":150,"speed":[100,125],"rotation":[60,80],"acceleration":[70,120]}},"shape":[2.72,2.573,2.079,1.758,1.578,1.455,1.368,1.312,1.283,1.278,1.269,1.222,1.193,1.961,2.033,2.148,2.313,2.561,2.818,3.145,3.625,3.791,3.803,3.701,3.223,3.206,3.223,3.701,3.803,3.791,3.625,3.145,2.818,2.561,2.313,2.148,2.033,1.961,1.193,1.222,1.269,1.278,1.283,1.312,1.368,1.455,1.578,1.758,2.079,2.573],"lasers":[{"x":0,"y":-2.56,"z":0,"angle":0,"damage":[100,150],"rate":1,"type":2,"speed":[110,150],"number":1,"spread":0,"error":0,"recoil":250},{"x":0.576,"y":0.48,"z":0.64,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.576,"y":0.48,"z":0.64,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.803}}';

var adminTools = [
  AdminToolPrecision_791,
  AdminToolLocal_792,
  AdminToolGlobal_793,
  Shadow_X_3_702,
  Contraband_608,
  A_Speedster_605,
  B_Speedster_606,
  C_Speedster_607,
];

var ship_list = [
  [101, 605, 606, 607, 608],
  [791, 792, 793],
];

var vocabulary = [
  { text: "You", icon: "\u004e", key: "O" },
  { text: "GG", icon: "\u00a3", key: "G" },
  { text: "Sorry", icon: "\u00a1", key: "S" },
  { text: "No Problem", icon: "\u0047", key: "P" },
  { text: "hmm?", icon: "\u004b", key: "Q" },
  { text: "Wait", icon: "\u0048", key: "T" },
  { text: "Yes", icon: "\u004c", key: "Y" },
  { text: "No", icon: "\u004d", key: "N" },
  { text: "Attack", icon: "\u00b4", key: "A" },
  { text: "Heal", icon: "\u0037", key: "H" },
  { text: "I'm Dueling", icon: "\u00be", key: "D" },
  { text: "Idiot", icon: "\u0079", key: "I" },
  { text: "Thanks", icon: "\u0041", key: "X" },
  { text: "Kill", icon: "\u005b", key: "K" },
  { text: "Follow", icon: "\u0050", key: "F" },
  { text: "Me", icon: "\u004f", key: "E" },
  { text: "Leave", icon: "\u00b3", key: "L" },
];

var map =
  ".............................||.............................\n" +
  "..9......9...........9.......||....9..........9.............\n" +
  ".............................||.............................\n" +
  ".............................||...................9.........\n" +
  "................9............||.............................\n" +
  ".........................9...||.......9......9..............\n" +
  ".......9.....................||.............................\n" +
  ".............................||.............................\n" +
  ".............................||.............................\n" +
  "..9.........9................||...................9.........\n" +
  "..................9..........||.............................\n" +
  "......9......................||....8........................\n" +
  ".............................||.............................\n" +
  "..........................9..||.............................\n" +
  ".............................||.............................\n" +
  ".........9...................||.................9...........\n" +
  ".............................||.............................\n" +
  ".............................||.............................\n" +
  ".....9....9..................9|....9...........9............\n" +
  "..................9..........||.............................\n" +
  ".............................||........................9....\n" +
  ".....9.......9.............99||99...........................\n" +
  ".........................9999||9999.........................\n" +
  "........................99...||...99.........1..............\n" +
  ".........9.............99....||....99.......................\n" +
  "......................99.....|9.....99......................\n" +
  "........7.............9......||......9......................\n" +
  ".....................99......||......99.....................\n" +
  "........2............99......||......99.....................\n" +
  "_______________8______________________________________9_____\n" +
  ".........1..................................................\n" +
  "...9..........7......99......||......99.....................\n" +
  ".....................99......||......99.....................\n" +
  "......................9......||......9......................\n" +
  "......................99....9||.....99......................\n" +
  "......9....9...........99....||....99..........1............\n" +
  "........................99...||...99..................9.....\n" +
  ".........................9999||9999.........................\n" +
  "...9.......................99||99...........................\n" +
  "..............9..............||.............................\n" +
  "........9....................||.......2.....................\n" +
  ".............................||.................9.....4.....\n" +
  ".....................4.......||.............................\n" +
  ".............................||.............................\n" +
  "............9................||....9................9.......\n" +
  "..6.................9........||.............................\n" +
  ".............................||.........2...................\n" +
  ".......9.....................||..................9..........\n" +
  "..............3..............||.............................\n" +
  "......................9......||.............................\n" +
  "......7......................||.............................\n" +
  ".............................||............9................\n" +
  "..................9..........||.....5...............6.......\n" +
  "...........9............9....||.............................\n" +
  "....9........................||.............................\n" +
  "..................5..........||.............................\n" +
  ".............................||..9.......7..................\n" +
  "......8.......9..............||.......................9.....\n" +
  "........................9....||......9.........9............\n" +
  ".............................||.............................\n";

this.options = {
  map_name: "Lexagon Dueling",
  root_mode: "",
  ships: adminTools,
  reset_tree: false,
  max_players: 60,
  vocabulary: vocabulary,
  lives: 5,
  map_size: 50,
  custom_map: map,
  weapons_store: false,
  crystal_value: 0,
  asteroids_strength: 300,
  survival_level: 8,
  starting_ship: 800, //infinit lives
  speed_mod: 1.2,
};

kick = function (i, reason = "Unspecified.") {
  game.ships[i].gameover({
    "You were kicked for reason: ": reason,
    "Your name: ": game.ships[i].name,
    "Kicked by:": game.ships[0].name,
    "Score: ": game.ships[i].score,
  });
};

info = function () {
  game.modding.terminal.echo("Total amount of aliens:" + game.aliens.length);
  game.modding.terminal.echo(
    "Total amount of asteroids:" + game.asteroids.length
  );
  game.modding.terminal.echo("Total amount of players:" + game.ships.length);
  for (nn = 0; nn < game.ships.length; nn++) {
    game.modding.terminal.echo(
      nn +
        ": " +
        game.ships[nn].name +
        ", type: " +
        game.ships[nn].type +
        " X,Y: " +
        game.ships[nn].x +
        ", " +
        game.ships[nn].y
    );
  }
};

log = function (s) {
  game.modding.terminal.echo(s);
};
playerList = function () {
  for (nn = 0; nn < game.ships.length; nn++)
    log(nn + " - " + game.ships[nn].name);
};

playerID = function () {
  for (ship of game.ships) echo(ship.id + " : " + ship.name);
};

setAll = function () {
  for (ship of game.ships) ship.set({ type: 101, shield: 50000 });
};

instructorSaysAll = function (saysWhat, instructor = "Zoltar") {
  for (ship of game.ships) ship.instructorSays(saysWhat, instructor);
};

hideInstructor = function () {
  for (ship of game.ships) ship.hideInstructor();
};

kick = function (ID, reason) {
  game.findShip(ID).gameover({ "kicked for": reason });
};
this.tick = function (game) {
  for (var ship in game.ships) {
    if (game.ships[ship].crystals > 719) {
      game.ships[ship].set({ crystals: 719 });
    }
  }
  if (game.step % 30 == 0) {
    for (let ship of game.ships) {
      if (!ship.custom.buttons_installed && ship.alive) {
        ship.custom.buttons_installed = true;
        for (b in buttons) {
          ship.setUIComponent(buttons[b]);
          ship.custom.tree = 0;
          for (let tree = 0; tree < ship_list.length; tree++) {
            if (ship_list[tree].indexOf(ship.type) >= 0) {
              ship.custom.tree = tree;
              break;
            }
          }
        }
      }
      var level = Math.trunc(ship.type / 100);
      if (level < 7) {
        var max_stats = 11111111 * level;
        if (ship.custom.keep_maxed) {
          if (ship.stats != max_stats) {
            ship.set({ stats: max_stats });
          }
        }
      } else if (ship.stats > 0) {
        ship.set({ stats: 0 });
      }
    }
    for (var a = 0; a < game.ships.length; a++) {
      var admin = game.ships[0];
      if (!admin.custom.god_button_installed) {
        admin.custom.god_button_installed = true;
        admin.setUIComponent(god_button);
      }
    }
  }
};

this.event = function (event, game) {
  switch (event.name) {
    case "ship_destroyed":
      if (event.killer != null) {
        event.killer.custom.kills = event.killer.custom.kills + 1 || 1;
      }
      break;
    case "ui_component_clicked":
      var ship = event.ship;
      var component = event.id;
      switch (component) {
        case "switch":
          var tree = ship.custom.tree;
          var index = -1;
          index = ship_list[tree].indexOf(ship.type);
          if (index >= 0) {
            var new_type;
            var new_stats = 0;
            index = (index + 1) % ship_list[tree].length;
            new_type = ship_list[tree][index];
            var level = Math.trunc(new_type / 100);
            if (level < 7 && ship.custom.keep_maxed) {
              var max = 11111111 * level;
              if (ship.stats != max) {
                new_stats = max;
              }
            }
            ship.set({ type: new_type, stats: new_stats, shield: 999 });
          }
          break;
        case "stats":
          var stats = ship.stats;
          var level = Math.trunc(ship.type / 100);
          var max = 11111111 * level;
          if (level < 7) {
            if (stats == max) {
              ship.custom.keep_maxed = false;
              ship.set({ stats: 0 });
            } else {
              ship.custom.keep_maxed = true;
              ship.set({ stats: max });
            }
          }
          break;
        case "reset":
          var new_stats = ship.custom.keep_maxed ? 11111111 : 0;
          ship.set({ type: 101, stats: new_stats });
          break;
        case "crystals":
          var level = Math.trunc(ship.type / 100);
          var cargo = 980;
          switch (level) {
            case 1:
              cargo = 20;
              break;
            case 2:
              cargo = 80;
              break;
            case 3:
              cargo = 180;
              break;
            case 4:
              cargo = 320;
              break;
            case 5:
              cargo = 500;
              break;
            case 6:
              cargo = 720;
              break;
            case 7:
              cargo = 980;
              break;
          }
          ship.set({ crystals: cargo, shield: 999 });
          break;
        case "admin":
          var new_type;
          if (ship.type == 791) {
            new_type = 792;
          } else if (ship.type == 792) {
            new_type = 793;
          } else if (ship.type == 793) {
            new_type = 791;
          } else {
            new_type = 791;
          }
          ship.set({ type: new_type });
          break;
      }
      break;
  }
};
