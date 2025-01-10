const Discord = require("discord.js");

module.exports = {
  name: 'wasted',
  aliases: ['wtd'],
  category: 'Fun 🎭',
  utilisation: '{prefix}wasted',

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
      .setImage(`https://some-random-api.ml/canvas/wasted?avatar=${Member.user.displayAvatarURL({ format: "png", size: 4096 })}`)
      .setColor("RANDOM")
      .setTitle("You Are Dead💀")
      .setAuthor(`This Human ${Member.user.tag} Is Died ☠️`, Member.user.displayAvatarURL())
      .setFooter(`Requested  By ${message.author.tag} | Created By mr.sinre `, message.author.displayAvatarURL())
      .setTimestamp()

    if (client.user.id === Member.id) {
      return message.reply('Mano Mikhai Bokoshi😑 ?!')
    } else
      if (Member.id === message.author.id) {
        return message.reply('Hoi Mikhai Khodeto Bokoshi😳 ?!')
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