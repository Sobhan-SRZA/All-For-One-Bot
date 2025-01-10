module.exports = {
    name: 'afeet',
    aliases: ['afeet', 'anime-feet'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn images about anime girl feet.🦶🏻👧🏻',
    utilisation: '{prefix}afeet',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const akaneko = require("akaneko")

  if (message.channel.nsfw === true) {

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')  
            .setImage(await akaneko.nsfw.feet())
        message.channel.send(embed)

  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
