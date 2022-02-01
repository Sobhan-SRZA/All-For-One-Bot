const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: 'phelp',
    aliases: ['ph'],
    category: 'Nsfw 🔞',
    utilisation: '{prefix}phelp',


  async execute(client, message, args) { 

const db = require("quick.db");
    var prefix = await db.fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
  const image = new Discord.MessageEmbed()
     .setTitle("Commands:")
     .addField(`${prefix}phelp`,"This embed.")
     .addField(`${prefix}pass`,"Send ass image.")
     .addField(`${prefix}ppussy`,"Send pussy image.")
     .addField(`${prefix}anime`,"Send anime command help.")
     .addField(`${prefix}pboob`,"Send boob image.")
     .addField(`${prefix}plewd`,"Send lewd image.")
     .addField(`${prefix}pthigh`,"Send thigh image.")
     .addField(`${prefix}pgif`,"Send porn gif.")
     .addField(`${prefix}p4k`,"Send 4k porn image.")
     .addField(`${prefix}panal`,"Send anal image.")
     .setTimestamp()
     .setFooter(`Nsfw Help || more info ${prefix}help || Made by Mr.SIN RE#1528 |`,message.author.displayAvatarURL())
      if (message.channel.nsfw === true) {
   message.channel.send(image);
  }else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/") 
  }

}
}