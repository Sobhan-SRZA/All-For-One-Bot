module.exports = {
    name: 'avatar',
    description: "sending a target user avatar url.",
    aliases: ['av','avatar'],
    category: 'Member 👻',
    cooldown: 5,
    utilisation: '{prefix}avatar [name | nickname | mention | ID]',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
const axios = require("axios")
const { MessageButton, MessageActionRow } = require("discord.js");
axios.get(`https://discord.com/api/users/${Member.id}`,{
   headers: {
     Authorization: `Bot ${client.config.discord.token}`
   }
  }).then((res)=> {
function buttons() {
      let { avatar } = res.data;
  const btn1 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Format PNG')
  .setURL(`https://cdn.discordapp.com/avatars/${Member.id}/${avatar}.png?size=4096`)

  const btn2 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Format WEBP')
  .setURL(`https://cdn.discordapp.com/avatars/${Member.id}/${avatar}.webp?size=4096`)

  const btn3 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Format JPEG')
  .setURL(`https://cdn.discordapp.com/avatars/${Member.id}/${avatar}.jpeg?size=4096`)

    const btn4 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Format GIF')
  .setURL(`https://cdn.discordapp.com/avatars/${Member.id}/${avatar}.gif?size=4096`)

    const btn5 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Format JPG')
  .setURL(`https://cdn.discordapp.com/avatars/${Member.id}/${avatar}.jpg?size=4096`)

  const row = new MessageActionRow()
  .addComponents(btn1,btn2,btn3,btn4,btn5)

  return row;
      }
      let { banner, accent_color } = res.data;
    if(banner){
      let extention = banner.startsWith("a_") ? ".gif" : ".png";
      let url = `https://cdn.discordapp.com/banners/${Member.id}/${banner}${extention}?size=4096`;
  let embed1 = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle(`**Avatar Of ${Member.user.tag}**`)
    .setColor("#2F3136")
    .setURL(Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setThumbnail(url)
    .setImage(Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setAuthor(`Requested By ${message.author.tag}`, message.author.displayAvatarURL( {dynamic: true }))
    .setFooter(`Avatar Of ${Member.user.tag} |`, Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setTimestamp()

   return message.channel.send(embed1,{components: [buttons()]});   
    }else {
    if(accent_color){
      
  let embed2 = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle(`**Avatar Of ${Member.user.tag}**`)
    .setURL(Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setColor(accent_color)
    .setImage(Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setAuthor(`Requested By ${message.author.tag}`, message.author.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setFooter(`Avatar Of ${Member.user.tag} |`, Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setTimestamp()
      
 return message.channel.send(embed2,{components: [buttons()]});

    } else {
  let embed3 = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle(`**Avatar Of ${Member.user.tag}**`)
    .setURL(Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setColor("#2F3136")
    .setImage(Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setAuthor(`Requested By ${message.author.tag}`, message.author.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setFooter(`Avatar Of ${Member.user.tag} |`, Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setTimestamp()
      return message.channel.send(embed3,{components: [buttons()]});
    }
  }
})
  
    }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */