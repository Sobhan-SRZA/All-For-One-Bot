const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: 'pbdsm',
    aliases: ['pbdsm'],
    category: 'Nsfw 🔞',
    utilisation: '{prefix}pbdsm',


  async execute(client, message, args) { 
    
  if (message.channel.nsfw === true) {
 const akaneko = require("akaneko")
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.lewdk())
            .setColor('RANDOM')   
      message.channel.send(embed);
  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
  }
}
}