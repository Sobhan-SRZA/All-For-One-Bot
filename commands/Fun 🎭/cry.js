const { 
  MessageEmbed, 
  MessageAttachment 
} = require("discord.js");
const { errorEmbed } = require("../../functions/functions");
module.exports = {
  name: "cry",
  aliases: ['cr','memecry','gerye'],
  category: 'Fun 🎭 | Image',
  description: "sending meme image with your text.",
  usage: "[text]",

   async execute(client, message, args) {
    if (!args.length) return message.reply({
                                    embeds: [errorEmbed(
                                      message,
                                      "**❌ Please provide some Text!**",
                                      client
                                    )]
                             })
    var tempmsg = await message.reply({
                          content: client.emotes.loading + "| **loading image please wait.**"
                        })
    var text = args.join(" ")
    client.memer.cry(text).then(image => {
      var attachment = new MessageAttachment(image, "cry.png");
      tempmsg.delete()
      const embed = new MessageEmbed()
      .setColor(client.colors.none)
      .setImage("attachment://cry.png")
      .setFooter({
        text: message.author.tag, 
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