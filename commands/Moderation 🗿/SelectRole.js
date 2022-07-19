const { MessageEmbed } = require("discord.js")
const { MessageMenuOption, MessageMenu,MessageButton, MessageActionRow } = require("discord-buttons")
const db = require("quick.db")
module.exports = {
    name: "selectrole",
    cooldown: 5,
    aliases: ["slr","sr","role"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}selectrole',
    description: "send selection role in channel forVgive role",
  async execute(client, message, args) {
   if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Dont Have Permmissions To Role Give Someone! - [ADMINISTRATOR]**");

   if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send("**I Don't Have Permissions To Role Someone! - [ADMINISTRATOR]**")
   let time = 4000;
   var prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;


   let option1 = new MessageMenuOption()
    .setLabel("Color Roles")
    .setValue("cor")
    .setDescription("Dadane Role Haie Rang")
    .setDefault()
    .setEmoji("🎨")
    
   let option2 = new MessageMenuOption()
    .setLabel("Game Roles")
    .setValue("gar")
    .setDescription("Dadane Role Haie Game")
    .setDefault()
    .setEmoji("🎮")

   let option3 = new MessageMenuOption()
    .setLabel("Biography Roles")
    .setValue("bior")
    .setDescription("Dadane Role Haie Biography")
    .setDefault()
    .setEmoji("🎭")
    

   let selection = new MessageMenu()
    .setID("selection")
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder("🎪|Baraie Gereftan Role Click Konid !!")
    .addOption(option1)
    .addOption(option2)
    .addOption(option3)
  
    let help = new MessageEmbed()
      help.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      help.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      help.setTitle(`${client.user.username} Select Roles :)`)
      help.setDescription(``)
      help.setURL('https://discord.gg/vgnhGXabNw')
      help.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      help.setColor("RANDOM")
      help.addField('**Select Roles**', `\`select onder this message\``, false)
 let btn2 = new MessageButton()
    .setStyle('url') 
    .setLabel('🤖Invite Bot') 
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=1644972474359&scope=bot%20applications.commands`)
     let btn1 = new MessageButton()
    .setStyle('url') 
    .setLabel('🦾Server Support') 
    .setURL(`https://discord.gg/5GYNec4urW`)
   let menumsg = await message.channel.send(help,selection,{button: [btn1,btn2]} )


  }
}
