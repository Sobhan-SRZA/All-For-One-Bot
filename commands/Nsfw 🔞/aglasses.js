module.exports = {
    name: 'aglasses',
    aliases: ['aglasses', 'anime-glasses'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn images of glasses girls.👩‍🏫',

    utilisation: '{prefix} aglasses',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const akaneko = require("akaneko")

  if (message.channel.nsfw === true) {

        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.glasses())
            .setColor('RANDOM')  
        message.channel.send(embed)

  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
