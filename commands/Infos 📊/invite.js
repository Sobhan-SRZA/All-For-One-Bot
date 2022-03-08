module.exports = {
    name: "invite",
    cooldown: 6,
    aliases: ['in'],
    category: 'Infos 📊',

  async execute(client, message, args) { 
const { MessageButton } = require('discord-buttons');
const Discord = require('discord.js')
  let inviteEmbed = new Discord.MessageEmbed()
      inviteEmbed.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      inviteEmbed.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      inviteEmbed.setTitle(`Ba Invite Bot Be Servert Azash Hemaiat Kon☺ ${client.user.username}`)
      inviteEmbed.setDescription(`**Montazer chi hasti🤨? Bodo mano be servert add kon🙂😘 \n\n [Invite Link](${client.config.discord.invite})**`)
      inviteEmbed.setURL(client.config.discord.server_support)
      inviteEmbed.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      inviteEmbed.setColor("RANDOM")
 let btn2 = new MessageButton()
    .setStyle('url') 
    .setLabel('🤖Invite Bot') 
    .setURL(client.config.discord.invite)
     let btn = new MessageButton()
    .setStyle('url') 
    .setLabel('🦾Server Support') 
    .setURL(`${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`)
    message.channel.send( { button: [btn,btn2],embed: inviteEmbed });
    }
}