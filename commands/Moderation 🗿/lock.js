module.exports = {
    name: "lock",
    cooldown: 5,
    aliases: ["lo"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}lock',
    description: "Lock a member from the server",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const Discord = require('discord.js');
		if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("<a:no:784463793366761532> **You can not use this command | Permission: MANAGE_CHANNELS**")
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')
		
		let msg = await message.channel.send("**Please wait**")
	
		try {
			message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false
			})
			msg.edit("<a:yes:784463701305458708> **Successfully Locked the channel**")
		}catch(e) {
			console.log(e)
			
		}
  }
}