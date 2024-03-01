const Discord = require('discord.js');
const error = require('../../functions/error');
module.exports = {
  name: 'petpat',
  aliases: ['pep', 'petpat', 'pet'],
  category: 'Fun 🎭',
  utilisation: '{prefix}petpat',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    try {
      if (client.user.id === Member.id) {
        return message.reply('Hoi Man Petet Nistam😡')

      } else
        if (message.author.id === Member.id) {
          return message.reply('Mikhai Khodeto Pet Koni?! 😂')

        } else
          return message.reply(new (require("discord.js")).MessageAttachment(encodeURI(`https://api.monkedev.com/canvas/petpet?imgUrl=${Member.user.displayAvatarURL({ format: "png" })}`), "Petpat.gif"));
    } catch (e) {
      error(e);
      return message.reply("Unable To Generate Petpat Or Something Went Wrong!", { reply: message });

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