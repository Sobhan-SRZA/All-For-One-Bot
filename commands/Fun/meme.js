module.exports = {
  name: 'meme',
  aliases: ['mm'],
  category: 'Fun 🎭',
  utilisation: '{prefix}meme',


  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    const { MessageEmbed } = require('discord.js')
    const randomPuppy = require('random-puppy')
    // In this array, 
    // you can put the subreddits you want to grab memes from
    const subReddits = ["dankmeme", "meme"];
    // Grab a random property from the array
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    // Get a random image from the subreddit page
    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setImage(img)
      .setTitle("Reddit Memes URL")
      .setURL(`https://reddit.com/r/${random}/`)
      .setFooter(`Request By ${message.author.tag} |`, message.author.displayAvatarURL())
      .setTimestamp(Date.now())
    message.channel.send(embed);

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