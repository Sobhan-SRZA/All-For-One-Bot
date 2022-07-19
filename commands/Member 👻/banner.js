module.exports = {
    name: 'banner',
    description: "sending a target user banner url.",
    aliases: ['bar'],
    category: 'Member 👻',
    cooldown: 5,
    utilisation: '{prefix}banner [name | nickname | mention | ID]',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
const axios = require("axios")
const { MessageButton, MessageActionRow } = require("discord-buttons");
    
if(!Member) return message.reply("Lotfan Kasio Mention Konid");

axios.get(`https://discord.com/api/users/${Member.id}`,{
   headers: {
     Authorization: `Bot ${process.env.TOKEN}`
   }
  }).then((res)=> {
    let { banner, accent_color } = res.data;
    if(banner){
      let extention = banner.startsWith("a_") ? ".gif" : ".png";
      let url = `https://cdn.discordapp.com/banners/${Member.id}/${banner}${extention}?size=4096`;
 let embed = new Discord.MessageEmbed()
    .setImage(url)
    .setTimestamp()
    .setTitle(`**Banner Of ${Member.user.tag}**`)
    .setColor("#2F3136")
    .setURL(Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setThumbnail(Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setAuthor(`Rquired By ${message.author.tag}`, message.author.displayAvatarURL( { size:4096 , dynamic: true } ))
    .setFooter(`Banner Of ${Member.user.tag} |`, Member.user.displayAvatarURL( { size:4096 , dynamic: true } ))

    message.channel.send(embed,{ components:[buttons()] })
    } else {
    if(accent_color){

      let embed = new Discord.MessageEmbed()
       .setDescription(`ishon ${Member} banner nadare vali rang dare :)`)
       .setTimestamp()
       .setColor(accent_color)
    message.channel.send(embed)

    } else return message.reply(`${Member} Banner va rang dar profile kod nadarad`)
  }
function buttons() {
  const btn1 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Format PNG')
  .setURL(`https://cdn.discordapp.com/banners/${Member.id}/${banner}.png?size=4096`)

  const btn2 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Format WEBP')
  .setURL(`https://cdn.discordapp.com/banners/${Member.id}/${banner}.webp?size=4096`)

  const btn3 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Format JPEG')
  .setURL(`https://cdn.discordapp.com/banners/${Member.id}/${banner}.jpeg?size=4096`)

    const btn4 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Format GIF')
  .setURL(`https://cdn.discordapp.com/banners/${Member.id}/${banner}.gif?size=4096`)

    const btn5 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Format JPG')
  .setURL(`https://cdn.discordapp.com/banners/${Member.id}/${banner}.jpg?size=4096`)

  const row = new MessageActionRow()
  .addComponents(btn1,btn2,btn3,btn4,btn5)

  return row;
      }
  })
 }
}
