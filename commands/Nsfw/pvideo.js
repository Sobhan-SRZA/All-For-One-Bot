const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
  name: "pvideo",
  description: "search in the web for porn video & sending a video url",
  aliases: ['pvid', 'pv'],
  category: 'Nsfw 🔞 | Porn',
  utilisation: '{prefix}pvideo',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    let loadingMessage = await message.reply(`**Loading a video….**`);
    const blacklist = ["loli", "shota", "cub", "young", "child", "baby", "guro", "gore", "vore"];

    if (args.length !== 0) {
      if (args.some(t => blacklist.includes(t.toLowerCase()))) return loadingMessage.edit(`${message.author} \`|📛|\` Blacklisted word found, aborting...`);
    } else {
      loadingMessage.edit(`Please put some porn star name or type`)
    }
    await axios.get(`https://www.eporner.com/api/v2/video/search/?query=${args.join(" ")}&per_page=10&page=1&thumbsize=big&format=json`, { headers: { Authorization: 'Basic MDE1NDQ1NTM1NDU0NDU1MzU0RDY6' } })
      .then(res => {
        const video = res.data.videos[0];
        let pornEmbed = new Discord.MessageEmbed()
          .setTitle(video.title)
          .setURL(video.url)
          .setColor("RANDOM")
          .setImage(video.default_thumb.src)
          .setFooter(`Length: ${video.length_min} | Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
        loadingMessage.edit(" ", pornEmbed);
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