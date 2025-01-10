const {
    MessageActionRow,
    MessageButton,
    MessageCollector,
    MessageEmbed
} = require("discord.js");
const math = require("mathjs");
module.exports = {
    name: 'mashinhesab',
    aliases: ["calculator","calc","hesab"],
    category: 'Fun 🎭 | School',
    usage: '',
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
const embed = new MessageEmbed()
.setColor(client.colors.none)
.setAuthor({
  name:`Requested by ${message.author.tag}`,
  iconURL:message.author.displayAvatarURL({ dynamic: true })
})
.setDescription("```js\n0\n```")

message.reply({
  embeds: [embed],
  components: [row]
}).then((msg) => {
  let isWrong = false;
  let value = "";
  let embed1 = new MessageEmbed()
  .setColor(client.colors.none)
  .setAuthor({
    name:`Requested by ${message.author.tag}`,
    iconURL:message.author.displayAvatarURL({ dynamic: true })
  })  
function createCollector(val, result = false){
  let filter = (buttons1) => buttons1.member.id === message.author.id && buttons1.id === "cal" + val;
  let collect = msg.createButtonCollector(filter, { time: time });// 1 minutes/60 secends , 1 secends = 1000 ms

collect.on("collect", async x => {
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
  embed1.setDescription("```js\n" + value + "\n```")
  msg.edit({
    embed: embed1,
    components: [row]
  })
})
}
for(let txt of text){
  let result;
  if(txt === "clear") result = "new";
  else if(txt === "=") result = true;
  createCollector(txt, result)
}setTimeout(() => {
  for(let i = 0; i < text.length; i++){
    if(button[current].length === 4) current++;
    button[current].push(deleteButton(text[i]));
    if(i === text.length - 1){
      for(let btn of button) row.push(addRow(btn));
    }
  }
  embed1.setDescription("zamane shoma baraie estefade az mashinhesab be payan reside ast :)")
  embed1.setColor(client.colors.none)
  msg.edit({
    embeds: [embed1],
    components: [new MessageActionRow().addComponents([new MessageButton().setCustomId("end").setStyle("DANGER").setEmoji(client.emotes.entry).setLabel("Ended").setDisabled(true)])]
  })
}, time)
})

//function 
function addRow(btns){
  let row1 = new MessageActionRow()
  for(let btn of btns){
    row1.addComponents(btn);
  }
  return row1;
}
function createButton(label, style = "SECONDARY"){
  if (label === "clear") style = "DANGER"//DANGER => a red button;
//  else if (label === ".") style = "SECONDARY"//SECONDARY => a grey button
  else if (label === "=") style = "SUCCESS"//SUCCESS => a green button
  else if (isNaN(label)) style = "PRIMARY"//PRIMARY => a blurple button

const btn = new MessageButton()
.setLabel(label)
.setStyle(style)
.setCustomId("cal" + label)

return btn;
}
function deleteButton(label, style = "SECONDARY"){
  if (label === "clear") style = "DANGER"//DANGER => a red button;
//  else if (label === ".") style = "SECONDARY"//SECONDARY => a grey button
  else if (label === "=") style = "SUCCESS"//SUCCESS => a green button
  else if (isNaN(label)) style = "PRIMARY"//PRIMARY => a blurple button

const btn = new MessageButton()
.setLabel(label)
.setStyle(style)
.setCustomId("cal" + label)
.setDisabled(true)

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