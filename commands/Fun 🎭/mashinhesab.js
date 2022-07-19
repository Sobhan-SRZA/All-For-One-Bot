const Discord = require("discord.js");
const math = require("mathjs");
const disbut = require("discord-buttons");

module.exports = {
    name: 'mashinhesab',
    aliases: ["calculator","calc","hesab"],
    category: 'Fun 🎭',
    utilisation: '{prefix}mashinhesab',
    description: "mashinhesab baraie shoma",
  async execute(client, message, args) { 
let button = new Array([], [], [], [], []);// [] = 5
let row = [];
let text = ["clear", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", ".", "0", "00", "="];
let current = 0;
let time = 60000;

for(let i = 0; i < text.length; i++){
  if(button[current].length === 4) current++;
  button[current].push(createButton(text[i]));
  if(i === text.length - 1){
    for(let btn of button) row.push(addRow(btn));
  }
}

//embed message
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(`Darkhast Shode Tavasote ${message.author.tag}`,message.author.displayAvatarURL())
.setDescription("```0```")

message.channel.send({
  embed: embed,
  components: row
}).then((msg) => {
  let isWrong = false;
  let value = "";
  let embed1 = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setAuthor(`Darkhast Shode Tavasote ${message.author.tag}`,message.author.displayAvatarURL())
  
function createCollector(val, result = false){
  let filter = (buttons1) => buttons1.clicker.user.id === message.author.id && buttons1.id === "cal" + val;
  let collect = msg.createButtonCollector(filter, { time: time });// 1 minutes/60 secends , 1 secends = 1000 ms

collect.on("collect", async x => {
//  x.defer();
  if (result === "new") value = "0"
  else if (isWrong){
    value = val
    isWrong = false;
  }
  else if(value === "0") value = val;
  else if(result){
    isWrong = true;
    value = mathEval(value);
  }
  else value += val
  embed1.setDescription("```" + value + "```")
  msg.edit({
    embed: embed1,
    components: row
  })
})
}
for(let txt of text){
  let result;
  if(txt === "clear") result = "new";
  else if(txt === "=") result = true;
  createCollector(txt, result)
}setTimeout(() => {
  embed1.setDescription("zamane shoma baraie estefade az mashinhesab be payan reside ast :)")
  embed1.setColor("RED")
  msg.edit({
    embed: embed1
  })
}, time)
})

//function 
function addRow(btns){
  let row1 = new disbut.MessageActionRow()
  for(let btn of btns){
    row1.addComponent(btn);
  }
  return row1;
}
function createButton(label,style = "grey"){
  if (label === "clear") style = "red"
//  else if (label === ".") style = "grey"
  else if (label === "=") style = "green"
  else if (isNaN(label)) style = "blurple" 

const btn = new disbut.MessageButton()
.setLabel(label)
.setStyle(style)
.setID("cal" + label)

return btn;
}

function mathEval(input) {
  try {
    let res = math.evaluate(input)
    return res
  } catch {
    return "⛔| darkhaste namotabar!";
  }
}



  }
}