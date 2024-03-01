const Discord = require("discord.js");
module.exports = {
  name: 'zendani',
  aliases: ['jail', 'zendan'],
  category: 'Fun 🎭',
  utilisation: '{prefix}zendani',



  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let Data = new Discord.MessageEmbed()
      .setImage(`https://some-random-api.ml/canvas/jail?avatar=${Member.user.displayAvatarURL({ format: "png", size: 4096 })}`)
      .setColor("RANDOM")
      .setTitle(`Jailed ⚖`)
      .setAuthor(`This Human ${Member.user.tag} Is Jailed ⚖`, Member.user.displayAvatarURL())
      .setFooter(`Requested  By ${message.author.tag} | Created By mr.sinre `, message.author.displayAvatarURL())
      .setTimestamp()

    if (client.user.id === Member.id) {
      return message.reply('Mano Mikhai Zendani Koni😑 ?!')
    } else
      if (Member.id === message.author.id) {
        return message.reply('Hoi Mikhai Khodeto Zendani Koni😳 ?!')
      } else
        message.channel.send(Data);

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