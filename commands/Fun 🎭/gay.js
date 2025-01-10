const {
   MessageEmbed
} = require('discord.js');
const { 
    errorEmbed 
} = require('../../functions/functions');
module.exports = {
    name: 'gay',
    aliases: ['gay','gy'],
    category: 'Fun 🎭 | Image',
    usage: "[name | nickname | mention | ID]",
  async execute(client, message, args) { 
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let Data = new MessageEmbed()
      .setImage(`https://some-random-api.ml/canvas/gay?avatar=${Member.user.displayAvatarURL({ format: "png" , size: 4096 })}`)
      .setColor(client.colors.none)
      .setTitle("Why Are Gay?")
      .setAuthor({
              name: `This Human ${Member.user.tag} Is Gay 🏳️‍🌈`,
              iconURL: Member.user.displayAvatarURL({ dynamic: true })
      })
      .setFooter({
        text: `Requested By ${message.author.tag} | Created By Mr.SIN RE#1528 `,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp()
if(Member.user.bot){
  return message.reply({
              embeds: [errorEmbed(
                message,
                "you can't use this command for robots.\n(used only humans)",
                client
              )]
         })
}else
    return message.reply({
                embeds: [Data]
           })
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