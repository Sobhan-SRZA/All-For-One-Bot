module.exports = {
  name: 'apanties',
  aliases: ['apanties', 'anime-panties'],
  category: 'Nsfw 🔞 | Anime',
  description: 'sending a random porn images type of anime about panties.',
  utilisation: '{prefix}apanties',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const Discord = require('discord.js');
    const akaneko = require("akaneko")

    if (message.channel.nsfw === true) {

      const embed = new Discord.MessageEmbed()
        .setImage(await akaneko.nsfw.panties())
        .setColor('RANDOM')
      message.channel.send(embed)

    } else {
      message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/")
    }
  }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */