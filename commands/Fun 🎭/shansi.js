
module.exports = {
    name: 'shansi',
    aliases: ['shans','chance'],
    category: 'Fun 🎭',
    utilisation: '{prefix}covid-19',
  async execute(client, message, args) { 
var doc = ['مهندس','دکتر','خر','بچه مایه دار','خوش شانس','خر شانس','پلیس','شهردار'];
const shansi= doc[Math.floor(Math.random () * doc.length)];
message.channel.send(shansi);
  }
}