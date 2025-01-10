const {
 MessageEmbed,
 MessageActionRow,
 MessageButton,
 MessageSelectMenu
} = require("discord.js");
const { 
  fun_help_menu,
  commandsData, 
  NeedHelpButtons 
} = require("../../functions/help_functions");
module.exports = {
 name: 'fhelp',
 aliases: ['fun', 'funhelp', 'fh'],
 category: 'Fun 🎭',
 description: 'shows command of "Fun 🎭" category.',
 usage: '',
async execute(client, message, args, prefix) { 

     const fhelpEmbed = new MessageEmbed()
         .setColor(client.colors.none)
         .setDescription(`**Baraie Estefade Kardan Az Command Ha Matn Zir Ra Negah Konid.\n  \n${commandsData(client.commands.filter(c => c.category === 'Nsfw 🔞 | Anime'),prefix)}**`)
         .setTitle("Fun 🎭 \n Commands:")
         .setTimestamp()
         .setFooter({ text: `Fun Help | more info ${prefix}help | Made by Mr.SIN RE#1528 `, iconURL: message.author.displayAvatarURL({ dynamic: true })})
         .addFields([	
          {
           name: 'Economy', 
           value: `${commandsData(client.commands.filter(c => c.category === 'Fun 🎭 | Economy'), prefix)}`, 
           inline: false 
          },
          {
           name: 'Minigame', 
           value: `${commandsData(client.commands.filter(c => c.category === 'Fun 🎭 | Minigame'), prefix)}`, 
           inline: false 
          },
          {
           name: 'Image', 
           value: `${commandsData(client.commands.filter(c => c.category === 'Fun 🎭 | Image'), prefix)}`, 
           inline: false 
          },
          {
           name: 'Voice', 
           value: `${commandsData(client.commands.filter(c => c.category === 'Fun 🎭 | Voice'), prefix)}`, 
           inline: false 
          },
          {
           name: 'Nsfw', 
           value: `${commandsData(client.commands.filter(c => c.category === 'Fun 🎭 | Nsfw'), prefix)}`, 
           inline: false 
          }
        ])
      message.reply({
        embeds: [fhelpEmbed],
        components: [fun_help_menu(client)]
      })
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