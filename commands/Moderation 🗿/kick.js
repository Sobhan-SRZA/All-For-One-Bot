module.exports = {
    name: "kick",
    cooldown: 5,
    aliases: ["ki"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}kick',
    description: "Kicks a member from the server",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const Discord = require('discord.js');
const db = require('quick.db')
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: KICK_MEMBERS**')
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : KICK_MEMBERS**')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('<a:no:784463793366761532> **Please specify a user**');

        if(!member) return message.channel.send('<a:no:784463793366761532> **User not found**');
        if(!member.kickable) return message.channel.send('<a:no:784463793366761532> **I can not kick this user. Either because they are the mod / admin, or their role is higher than mine**');

        if(member.id === message.author.id) return message.channel.send('**You can not kick yourself -_-**');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'not defined';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send(err)
        })

        message.react('<a:yes:784463701305458708>')

        const kickembed = new Discord.MessageEmbed()
        .setTitle('User has been kicked')
        .setThumbnail(member.user.displayAvatarURL())
        .setColor(client.colors.none)
        .addField('Username', `**${member}**`)
        .addField('Kicked by', `**${message.author}**`)
        .addField('Reason', `**${reason}**`)
        .setFooter('Kick time', client.user.displayAvatarURL())
        .setTimestamp()
        message.channel.send(kickembed)

    let logChannel = db.fetch(`modlog_${message.guild.id}`)
		let logsChannel = message.guild.channels.cache.get(logChannel)
		if(!logsChannel) return;
		logsChannel.send(kickembed)


    }
}