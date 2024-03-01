const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
  name: 'youtube',
  aliases: ['yt'],
  category: 'Fun 🎭',
  description: "IMAGE CMD",
  utilisation: '{prefix}youtube @User [ Text ]',



  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    try {
      if (!args[0]) return message.reply("لطفا متن مورد نظر خودتون رو بنویسید");

      let comment = args.slice().join(" ");

      return message.channel.send(new (require("discord.js")).MessageAttachment(encodeURI(`https://some-random-api.ml/canvas/youtube-comment?username=${message.author.username}&comment=${comment}&avatar=${message.author.displayAvatarURL({ format: "png" })}&dark=true%E2%80%8B`), "youtube-comment-SizarTeam.png"));
    } catch (_) {
      console.log(_);
      return message.channel.send("Nashod commente youtubet ro ok konam🙁");

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