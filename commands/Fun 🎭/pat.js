const superagent = require('superagent');
const {
 MessageAttachment,
 MessageEmbed
} = require('discord.js');
const { 
  errorEmbed 
} = require('../../functions/functions');
module.exports = {
 name: 'pat',
 aliases: ['pt','patting'],
 category: 'Fun 🎭 | Anime',
 description: "patting a user with anime images.",
 usage: "[name | nickname | mention | ID]",
async execute(client, message, args) {
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!target) return message.reply({
                          embeds: [errorEmbed(
                           message,
                           "**Please Mention A User**",
                           client
                          )]
                       });
    if(target.id === message.author.id) return message.reply({
                                                 embeds: [errorEmbed(
                                                  message,
                                                  "**You can not mention yourself -_-\nPlease Mention someone Else**",
                                                  client
                                                 )]
                                               });
    if(!target) return message.reply({
                          embeds: [errorEmbed(
                           message,
                           "**User not found, Please Mention someone Else**",
                           client
                          )]
                       });
    let { body } = await superagent.get("https://nekos.life/api/pat");
    let embed = new MessageEmbed()
     .setColor(client.colors.none)
     .setImage(body.url)
     .setFooter({
         text: `${message.author.username} pat ${target.user.username} `
      })
     .setTimestamp();
    message.reply({
          embeds: [embed]
    });

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