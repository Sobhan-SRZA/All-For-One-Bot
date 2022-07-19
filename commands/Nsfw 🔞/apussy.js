module.exports = {
    name: 'apussy',
    aliases: ['apussy', 'anime-pussy'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn images type of anime about pussy.',
    utilisation: '{prefix}apussy',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const akaneko = require("akaneko")

  if (message.channel.nsfw === true) {

        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.pussy())
            .setColor('RANDOM')   
        message.channel.send(embed)

  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
