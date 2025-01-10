module.exports = {
    name: "kick",
    cooldown: 5,
    aliases: ["ki"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}kick',
    description: "Kicks a member from the server",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const {MessageEmbed,Permissions} = require('discord.js');
const db = require('quick.db')
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send(client.emotes.error + '| **You can not use this command | Permission: KICK_MEMBERS**')
        if(!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send(client.emotes.error + '| **I do not have the correct permissions | Permission : KICK_MEMBERS**')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send(client.emotes.error + '| **Please specify a user**');

        if(!member) return message.channel.send(client.emotes.off + '| **User not found**');
        if(!member.kickable) return message.channel.send(client.emotes.off + '| **I can not kick this user. Either because they are the mod / admin, or their role is higher than mine**');

        if(member.id === message.author.id) return message.channel.send(client.emotes.badage + '| **You can not kick yourself -_-**');

        let reason = args.slice(1).join(" ")|| 'Not defined';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send(err)
        })

        message.react(client.emotes.success)

        const kickembed = new MessageEmbed()
        .setTitle('User has been kicked')
        .setThumbnail(member.user.displayAvatarURL())
        .setColor(client.colors.none)
        .addField('Username', `**${member}**`)
        .addField('Kicked by', `**${message.author}**`)
        .addField('Reason', `**${reason}**`)
        .setFooter({text:'Kick time', iconURL:client.user.displayAvatarURL()})
        .setTimestamp()
        message.channel.send(kickembed)

    let logChannel = db.fetch(`modlog_${message.guild.id}`)
		if(logChannel) return	logsChannel.send(kickembed);


    }
}