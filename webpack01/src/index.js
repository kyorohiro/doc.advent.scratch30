const n = require('./neko.js');
const i = require('./inu.js');


var chara = {};
chara = new n.Neko("Tama");
chara.move(1,2);
console.log(chara.hello());
console.log("x:"+chara.getX() + " ,y:" + chara.getY());

chara = new i.Inu("Tarou");
chara.move(2,3);
console.log(chara.hello());
console.log("x:"+chara.getX() + " ,y:" + chara.getY());