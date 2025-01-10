const Discord = require('discord.js');
module.exports = {
  name: 'pedaret',
  aliases: ['pedar'],
  category: 'Fun 🎭',
  utilisation: '{prefix}pedaret',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    var pedar = ["پدرت", "دک خر تو پوسی  بابات", 'خفه شو و بزار از خوردن بابات لذت ببریم', 'پوسی بابات', 'اسب دریایی دارم باباتو میخورم خفه شو و گریه کن', 'پدرت قبل خورده شدن میگفت پسرم مرده😱', 'دک سیاه بره تو پوسی بابات', 'دک شدی حالا بیا دکمو بخور😋', 'پدرت یام یام شد😋'];
    const shotor = pedar[Math.floor(Math.random() * pedar.length)];
    message.channel.send(shotor);
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