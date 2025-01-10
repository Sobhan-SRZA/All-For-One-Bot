module.exports = {
    name: "lock",
    cooldown: 5,
    aliases: ["lo"],
    category: 'Moderation 🗿',
    description: "Lock a member from the server",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const {Permissions} = require('discord.js');
		if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply(client.emotes.x+"| **You can not use this command | Permission: \"MANAGE_CHANNELS\"**")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply(client.emotes.error+'| **I do not have the correct permissions | Permission : "MANAGE_CHANNELS"**')
		
		let msg = await message.reply(client.emotes.loading+"|	**Please wait**")
	
		try {
			message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false
			})
			msg.edit(client.emotes.success + "| **Successfully Locked the channel**")
		}catch(e) {
			console.log(e)
		}
  }
}