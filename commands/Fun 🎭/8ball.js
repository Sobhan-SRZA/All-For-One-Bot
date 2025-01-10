const {
  MessageEmbed
} = require('discord.js');
const { 
  randomItem, 
  errorEmbed 
} = require('../../functions/functions');
module.exports = {
    name: '8ball',
    aliases: ['8b','ball'],
    category: 'Fun 🎭 | Minigame',
    usage: '[text]',
    describtion: 'asking a some question and bot will send some answers.',
  async execute(client, message, args) { 
      const replies = ["yes", "no", "probably", "actually"];
        let Embed = new MessageEmbed()
            .setAuthor({
              name: `Requested by ${message.author.username}`,
              iconURL: `${message.author.displayAvatarURL()}`
            })
            .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
            .setTitle(`${client.emotes.eiball}| 8Ball Q & A`)
            .setTimestamp()
            .setFooter({
              text: `${message.author.tag} | Created By Mr.SIN RE#1528 :) `,
              iconURL: `${message.author.displayAvatarURL()}`
            })
            .setColor(client.colors.none)
            .addField('Question', `*${args}*`)
            .addField('Answer', `**${replies[randomItem(replies)]}**`)  

    setTimeout(() => {
      message.channel.startTyping()
    }, 1000 * 1);
      if (!args){
        message.reply({
          embeds: [errorEmbed(
            message,
            "befor use command you have to write your question.",
            client
          )]
        })
      } else
      return message.reply({
                  embeds: [Embed]
             })
    setTimeout(() => {
      message.channel.stopTyping()
    }, 1000 * 5);
  }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */