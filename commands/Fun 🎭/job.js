
module.exports = {
    name: 'shansi',
    aliases: ['shans','chance'],
    category: 'Fun 🎭 | Minigame',
    description: "shows your next job.",
    usage: "",  
  async execute(client, message, args) { 
var doc = ['مهندس','دکتر','خر','بچه مایه دار','خوش شانس','خر شانس','پلیس','شهردار'];
const shansi= doc[Math.floor(Math.random () * doc.length)];
message.channel.send(shansi);
  }
}