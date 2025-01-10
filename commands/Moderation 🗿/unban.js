module.exports = {
    name: "unban",
    cooldown: 5,
    aliases: ["ubn"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}unban',
    description: "Unban a member from the server",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const {MessageEmbed,Permissions} = require('discord.js');
const db = require('quick.db')
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send(client.emotes.badage + '| **You can not use this command | Permission: BAN_MEMBERS**')
        if(!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send(client.emotes.entry + '| **I do not have the correct permissions | Permission : BAN_MEMBERS**')
		  
		  let userID = args[0]
		  if (isNaN(userID)) return message.reply(client.emotes.error + `| **Please specify an ID**`);
			message.guild.fetchBans().then(bans=> {
			if(bans.size == 0) return message.channel.send(client.emotes.badage +'| **No one is banned in this server**')
			let bUser = bans.find(b => b.user.id == userID)
			if(!bUser) return message.channel.send(client.emotes.error +'|  **User not found**')
			message.guild.members.unban(bUser.user)
			message.react(client.emotes.success)

      function epoch (date) {
        return Date.parse(date)
      }
      const dateToday =  new Date(); 
      const TimeStampDate = epoch(dateToday) / 1000;
          let embed = new MessageEmbed()
           .setAuthor({name:message.guild.id + '|'+ message.guild.name, iconURL:message.guild.iconURL({ dynamic: true })})
           .setTitle(`${client.emotes.error} | User has been unbaned`)
           .setColor("#2F3136")
           .setTimestamp()
           .setFooter({text:"Created By Mr.SIN RE#1528 :) | Unban time", iconURL:`https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
           .addField('Reason :', `**${reason}**`,true)
           .addField(`Unbanned By : `, message.author,true)
           .addField('Username :', `**<@${userID}>**`,true)
           .addField("UserID :", `**${userID}**`,true)
           .addField(`Date :`, `**<t:${TimeStampDate}:R>**` , true)

                let logChannel = db.fetch(`modlog_${message.guild.id}`)
                if(logChannel) return logChannel.send(embed)

message.channel.send(e)




			})
	}
}