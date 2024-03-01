const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
  name: 'ppussy',
  aliases: ['ppussy'],
  category: 'Nsfw 🔞 | Porn',
  description: "sending a random porn images about pussyes",
  utilisation: '{prefix}ppussy',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    if (message.channel.nsfw === true) {
      superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'pussy' })
        .auth("015445535454455354D6")
        .end((err, response) => {
          message.channel.send(new Discord.MessageAttachment(encodeURI(response.body.message), "sizar-team|pussy.png"));
        });
    } else {
      message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/")
    }
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