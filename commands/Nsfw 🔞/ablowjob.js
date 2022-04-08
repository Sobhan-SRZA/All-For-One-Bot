module.exports = {
    name: 'abowjob',
    aliases: ['abowjob', 'anime-bowjob'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn images about anime blowjob.👅',
    utilisation: '{prefix}abowjob',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const akaneko = require("akaneko")

  if (message.channel.nsfw === true) {

        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.blowjob())
            .setColor('RANDOM')
        message.channel.send(embed)

  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
