const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
  name: "cry",
  aliases: [],
  category: "Fun 🎭",
  description: "IMAGE CMD",
  usage: "cry [ Text ]",


  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {


    if (!args.length) return message.channel.send(new MessageEmbed().setColor("#ff000")
      .setDescription("**❌ Please provide some Text!**"))

    var tempmsg = await message.channel.send("https://cdn.discordapp.com/emojis/914139097931583519.gif?size=1024")

    var text = args.join(" ")

    client.memer.cry(text).then(image => {

      var attachment = new MessageAttachment(image, "cry.png");

      tempmsg.delete()

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage("attachment://cry.png")
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