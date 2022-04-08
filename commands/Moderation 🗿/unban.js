module.exports = {
    name: "unban",
    cooldown: 5,
    aliases: ["ubn"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}unban',
    description: "Unban a member from the server",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const Discord = require('discord.js');
const db = require('quick.db')
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: BAN_MEMBERS**')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : BAN_MEMBERS**')

		  
		  let userID = args[0]
		  if (isNaN(userID)) return message.reply(`<a:no:784463793366761532> **Please specify an ID**`);
			message.guild.fetchBans().then(bans=> {
			if(bans.size == 0) return message.channel.send('<a:no:784463793366761532> **No one is banned in this server**')
			let bUser = bans.find(b => b.user.id == userID)
			if(!bUser) return message.channel.send('<a:no:784463793366761532> **User not found**')
			message.guild.members.unban(bUser.user)
			message.react('<a:yes:784463701305458708>')

			const e = new Discord.MessageEmbed()
                .setAuthor(`User has been unbanned`, message.guild.iconURL())
                .setColor("RANDOM")
                .setFooter(message.guild.name, message.guild.iconURL())
				.addField("**Username**", `**<@${userID}>**`)
                .addField("**ID**", `**${userID}**`)
                .addField("**Unbanned By**", `**${message.author.username}**`)
                .setTimestamp();

                let logChannel = db.fetch(`modlog_${message.guild.id}`)
                let logsChannel = message.guild.channels.cache.get(logChannel)
                if(!logsChannel) return;
                logsChannel.send(embed)

message.channel.send(e)




			})
	}
}