const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
  name: "trash",
  aliases: [],
  category: "Fun 🎭",
  description: "IMAGE CMD",
  usage: "trash @User",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    //var tempmsg = await message.channel.send("https://cdn.discordapp.com/emojis/914139097931583519.gif?size=1024")

    var user = message.mentions.users.first() || message.author;
    var avatar = user.displayAvatarURL({ format: "png" });

    message.client.memer.trash(avatar).then(image => {

      var attachment = new MessageAttachment(image, "trash.png");

      tempmsg.delete()

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(attachment)
        .attachFiles(attachment)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

      return message.channel.send(embed).catch()

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