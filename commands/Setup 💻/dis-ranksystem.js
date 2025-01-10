const { 
    Permissions,
    MessageEmbed
} = require('discord.js')
const db = require('quick.db')
const { 
  successEmbed, 
  errorEmbed 
} = require('../../functions/functions')
module.exports = {
 name: "disranksystem",
 cooldown: 5,
 aliases: ["dis-rank", "drs", "dis-ranksystem", "disableranksystem"],
 category: 'Setup 💻',
 usage: '',
 description: "Disabled Server XP Messages.(remove rank system in guild.)",

async execute(client, message, args) { 
 if (!message.member.permission.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply(client.emotes.error+"| **You Do Not Have The Required Permissions! - [MANAGE_GUILD]**")

 try {
     let guild_messages = await db.fetch(`guildMessages_${message.guild.id}`)
     if (!guild_messages) {
         return message.reply({
                    embeds: [errorEmbed(
                     message,
                     "**XP Messages Are Already Disabled In The Server!**",
                     client
                    )]
                })
     } else {
         db.delete(`guildMessages_${message.guild.id}`)
         message.reply({
          embeds: [successEmbed(
            message,
            "**XP Messages Are Disabled Successfully!**",
            client
          )]
         })
     }
     return;
 } catch (e) {
     console.log(e)
     return message.reply({
             embeds: [errorEmbed(
              message,
              "**Something Went Wrong!**\n```js\n"+e+"\n```",
              client
             )]
            }) 
  }
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