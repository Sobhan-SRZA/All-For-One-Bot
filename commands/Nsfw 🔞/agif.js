module.exports = {
    name: 'agif',
    aliases: ['agif', 'anime-gif'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn gifs type of anime.',
    utilisation: '{prefix}aass',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const akaneko = require("akaneko")

  if (message.channel.nsfw === true) {

        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.gifs())
            .setColor('RANDOM')
        message.channel.send(embed)

  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
