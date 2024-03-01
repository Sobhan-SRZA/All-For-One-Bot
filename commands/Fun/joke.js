module.exports = {
  name: 'joke',
  aliases: ['jo'],
  category: 'Fun 🎭',
  utilisation: '{prefix}joke',


  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const Discord = require('discord.js')
    const axios = require('axios');
    let getInfo3 = async () => {

      let response3 = await axios.get('https://api.codebazan.ir/jok/');
      let info3 = response3.data;
      return info3;
    };
    let infoValue3 = await getInfo3();

    const embed1 = new Discord.MessageEmbed()
      .setColor('#33908b')
      .setTitle("🤣 خنده دار بود؟ ")
      .setDescription(`**${infoValue3}**`)
    await message.channel.send(embed1)
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