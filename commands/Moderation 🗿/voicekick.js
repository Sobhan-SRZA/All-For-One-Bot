module.exports = {
    name: "voicekick",
    cooldown: 5,
    aliases: ["vki"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}voicekick',
    description: "Kicks a member from the voice",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const Discord = require('discord.js');
      if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
        return message.channel.send(
          "Man Permission Nadaram 😥😓"
        );
  
      if (!message.mentions.members.first())
        return message.channel.send(
          `Lotfan Member Ke Mikhahid Az Voice Kik Konid Ra Mention Konid `
        );
  
      let { channel } = message.mentions.members.first().voice;
  
      if (!channel)
        return message.channel.send(`Member Morede Nazar Dar Voice Join Nistesh ❌`);
  
      message.mentions.members.first().voice.kick();
      
      message.channel.send(`Member Morede Nazar Az Voice Kick Shod ✅`)
    }
}