module.exports = {
    name: 'azettairyouiki',
    aliases: ['azettairyouiki', 'anime-zettairyouiki'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn images type of anime about zettair youiki.',
    utilisation: '{prefix}azettairyouiki',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const akaneko = require("akaneko")

  if (message.channel.nsfw === true) {

       const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.zettaiRyouiki())
            .setColor('RANDOM') 
        message.channel.send(embed)


  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
