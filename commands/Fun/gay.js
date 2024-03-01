const Discord = require('discord.js');
module.exports = {
  name: 'gay',
  aliases: ['gay', 'gy'],
  category: 'Fun 🎭',
  utilisation: '{prefix}gay',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    //          message.channel.startTyping();
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let Data = new Discord.MessageEmbed()
      .setImage(`https://some-random-api.ml/canvas/gay?avatar=${Member.user.displayAvatarURL({ format: "png", size: 4096 })}`)
      .setColor("RANDOM")
      .setTitle("Why Are Gay?")
      .setAuthor(`This Human ${Member.user.tag} Is Gay 🏳️‍🌈`, Member.user.displayAvatarURL())
      .setFooter(`Requested  By ${message.author.tag} | Created By mr.sinre `, message.author.displayAvatarURL())
      .setTimestamp()
    if (client.user.id === Member.id) {
      return message.reply('Man Mesle To Asshul Gay Nistam😑 ?!')

    } else
      return message.channel.send(Data)/*.then(embedMessage => { 
    message.channel.stopTyping(); 
   }) */
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