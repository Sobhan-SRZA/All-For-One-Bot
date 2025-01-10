const {
   MessageSelectMenu,
   MessageButton,
   MessageActionRow,
   MessageEmbed,
   Permissions
} = require("discord.js")
const db = require("quick.db")
const { epochDateNow, logsEmbed } = require('../../functions/functions')
module.exports = {
    name: "selectrole",
    cooldown: 5,
    aliases: ["slr","sr","role"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}selectrole',
    description: "send selection role in channel forVgive role",
  async execute(client, message, args, logsChannel, prefix) {
   if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("**You Dont Have Permmissions To Role Give Someone! - [ADMINISTRATOR]**");

   if (!message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("**I Don't Have Permissions To Role Someone! - [ADMINISTRATOR]**")
   let time = 4000;
   var prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||client.prefix;

 let selection = new MessageActionRow()
 .addComponents(new MessageSelectMenu()
 .setCustomId("role_menu")
 .setMaxValues(1)
 .setMinValues(1)
 .setPlaceholder("🎪|Baraie Gereftan Role Click Konid !!")
 .addOptions([
     {
       label: 'Color Roles',
       value: 'cor',
       description: 'Dadane Role Haie Rang',
       emoji: {
         name: '🎨',
       },
   },
   {
     label: 'Game Roles',
     value: 'gar',
     description: 'Dadane Role Haie Game',
     emoji: {
       name: '🎮',
     },
   },
   {
     label: 'Biography Roles',
     value: 'bior',
     description: 'Dadane Role Haie Biography',
     emoji: {
       name: '🎭',
     },
   },
  ]))
    let help = new MessageEmbed()
      .setAuthor({name:`Requested by ${message.author.username}`, iconURL:`${message.author.displayAvatarURL()}`})
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Select Roles :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter({text:"Created By Mr.SIN RE#1528 :)", iconURL:`https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
      .setColor(client.colors.none)
      .addField('**Select Roles**', `\`select onder this message\``)
 let btn2 = new MessageButton()
    .setStyle('LINK') 
    .setLabel('🤖Invite Bot') 
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=1644972474359&scope=bot%20applications.commands`)
     let btn1 = new MessageButton()
    .setStyle('LINK') 
    .setLabel('🦾Server Support') 
    .setURL(`https://discord.gg/5GYNec4urW`)
   let menumsg = await message.channel.send({
                         embeds:[help],
                         buttons: [btn1,btn2],
                         components:[selection]
                       })

            if(logsChannel) return logsChannel.send({
                                                embeds: [logsEmbed(
                                                    message,
                                                    "Somone used select menu",
                                                    "this menu for chose user customize his roles in guild and this menu setup the rolse in guild and select menu.",
                                                    client.emotes.role,
                                                    client,message.channel,
                                                    "setup role select menu"
                                                )]
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