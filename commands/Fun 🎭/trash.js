const { 
  MessageEmbed, 
  MessageAttachment 
} = require("discord.js");
const { 
  errorEmbed 
} = require("../../functions/functions");
module.exports = {
  name: "trash",
  aliases: ["tra","ashgal"],
  category: 'Fun 🎭 | Minigame',
  description: "set user avatar to trash.",
  usage: "[name | nickname | mention | ID]",

  async execute(client, message, args) { 

    var tempmsg = await message.reply({
                          content: client.emotes.loading + "| **loading image please wait.**"
                        })

    var user = message.mentions.users.first() || message.author;
    if(user.bot){
      return message.reply({
                  embeds: [errorEmbed(
                    message,
                    "you can't use this command for robots.\n(used only humans)",
                    client
                  )]
             })
    }        
    var avatar = user.displayAvatarURL({ format: "png" });
    client.memer.trash(avatar).then(image => {
      var attachment = new MessageAttachment(image, "trash.png");      
      const embed = new MessageEmbed()
      .setColor(client.colors.none)
      .setImage("attachment://trash.png")
      .setFooter({
        tetx: message.author.tag, 
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
      
      return tempmsg.edit({
        embeds: [embed],
        files: [{
          attachment: [attachment]
        }]
     }).catch()
      
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