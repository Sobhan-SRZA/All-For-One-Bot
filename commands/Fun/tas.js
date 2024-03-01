const Discord = require('discord.js');
module.exports = {
  name: 'tas',
  aliases: ['tas'],
  category: 'Fun 🎭',
  utilisation: '{prefix}tas',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    var shirkhat = ['شیر', 'خط'];
    const seke = shirkhat[Math.floor(Math.random() * shirkhat.length)];
    const shkh = new Discord.MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
      .setThumbnail(`${message.author.displayAvatarURL()}`)
      .setTimestamp()
      .setColor('RANDOM')
      .addField(`سکه رو انداختم بزار ببینم <:smile_boy:914242070615556196>شیره یا خط`, `[${seke}](${client.config.discord.server_support || "https://dsc.gg/persian-caesar"})`)
    message.channel.send(shkh)
    message.react('🪙')
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