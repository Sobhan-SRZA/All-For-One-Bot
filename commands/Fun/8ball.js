const Discord = require('discord.js');
module.exports = {
  name: '8ball',
  aliases: ['8b', 'ball'],
  category: 'Fun 🎭',
  utilisation: '{prefix}8ball',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    //      message.channel.startTyping();
    const replies = ["آره", "نه.", "اصلا", "حتما"];
    const answer = Math.floor((Math.random() * replies.length));
    const question = args;
    let Embed = new Discord.MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`8ball :)`)
      .setTimestamp()
      .setURL('https://dsc.gg/persian-caesar')
      .setFooter(`${message.author.tag} || Created By mr.sinre :) |`, `${message.author.displayAvatarURL()}`)
      .setColor("RANDOM")
      .addField('Question', `*${question}*`, true)
      .addField('Answer', `**${replies[answer]}**`, true)

    const choice = args[0];
    if (!choice) {
      message.channel.send("عزیزم برای استفاده از کامند باید سوال بپرسی ازم")
    } else
      return message.channel.send(Embed)/*.then(embedMessage => { 
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