module.exports = {
    name: 'aass',
    aliases: ['aass', 'anime-ass'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn images about anime ass of girls.🍑',
    utilisation: '{prefix}aass',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const akaneko = require("akaneko")

  if (message.channel.nsfw === true) {
         const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.ass())
            .setColor('RANDOM')  
        message.channel.send(embed)

  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
