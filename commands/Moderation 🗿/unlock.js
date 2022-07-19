module.exports = {
    name: "unlock",
    cooldown: 5,
    aliases: ["ulo"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}unlock',
    description: "Unlock a member from the server",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const Discord = require('discord.js');
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("<a:no:784463793366761532> **You can not use this command | Permission: MANAGE_CHANNELS**")
		if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')
		
		let msg = await message.channel.send("**Please wait**")
    function epoch (date) {
      return Date.parse(date)
    }
    const dateToday =  new Date(); 
    const TimeStampDate = epoch(dateToday) / 1000;
		try {
			message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
				SEND_MESSAGES: true,
				ADD_REACTIONS: true
			})
			msg.edit(`${client.emotes.success} **Successfully unlocked the channel**`)
    let embed = new Discord.MessageEmbed()
     .setAuthor(message.guild.id + '|'+ message.guild.name, message.guild.iconURL({ dynamic: true }))
     .setTitle(`${client.emotes.error} | Yek Channel Unlock Shod`)
     .setColor("#2F3136")
     .setTimestamp()
     .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
     .addField(`Channele Zir Unlock Shod: `, message.channel, true)
     .addField(`Tavasote : `, message.author, true)
     .addField(`Dar Tarikhe : `, `<t:${TimeStampDate}:R>`, true);
     let logChannel = db.fetch(`modlog_${message.guild.id}`)
     let logsChannel = message.guild.channels.cache.get(logChannel)
     if(!logsChannel) return;
     logsChannel.send(embed)
    		}catch(e) {
			console.log(e)
		}
  }
}