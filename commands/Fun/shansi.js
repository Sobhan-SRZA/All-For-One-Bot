
module.exports = {
  name: 'shansi',
  aliases: ['shans', 'chance'],
  category: 'Fun 🎭',
  utilisation: '{prefix}covid-19',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    var doc = ['مهندس', 'دکتر', 'خر', 'بچه مایه دار', 'خوش شانس', 'خر شانس', 'پلیس', 'شهردار'];
    const shansi = doc[Math.floor(Math.random() * doc.length)];
    message.channel.send(shansi);
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */