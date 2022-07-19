module.exports = {
    name: 'adoujin',
    aliases: ['adoujin', 'anime-doujin'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn images type of anime about doujin.',
    utilisation: '{prefix}adoujin',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const akaneko = require("akaneko")

  if (message.channel.nsfw === true) {

        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.doujin())
            .setColor('RANDOM')  
        message.channel.send(embed)

  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
