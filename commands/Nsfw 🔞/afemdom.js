module.exports = {
    name: 'afemdom',
    aliases: ['afemdom', 'anime-femdom'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn images type of anime about femdom.',
    utilisation: '{prefix}afemdom',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const akaneko = require("akaneko")

  if (message.channel.nsfw === true) {

        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.femdom())
            .setColor('RANDOM')  
        message.channel.send(embed)

  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
