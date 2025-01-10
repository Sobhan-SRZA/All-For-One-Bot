const {
    MessageAttachment,
    MessageEmbed
} = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
 name: 'spank',
 aliases: ['spank','pank'],
 category: 'Fun 🎭 | Nsfw',
 description: "spank to user.",
 usage: "[name | nickname | mention | ID]",  
async execute(client, message, args) { 
   let user =  message.mentions.users.first() || message.guild.members.cache.get(args[0]);
   if(!member) return message.reply(client.emotes.error + `| **Please Mention A User**`);
   if(member.id === message.author.id) return message.reply(client.emotes.badage + '| **Please mention someone else**');
      let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
      let avatar1 = user.displayAvatarURL({ dynamic: false, format: 'png' });
      let image = await canvacord.Canvas.spank(avatar, avatar1);
      let attachment = new MessageAttachment(image, "spank.png");
      return message.reply({
                 files: [attachment]
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