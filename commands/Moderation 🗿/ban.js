module.exports = {
    name: "ban",
    cooldown: 5,
    aliases: ["bn"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}ban [name | nickname | mention | ID] [reason]',
    description: "Ban a member from the server.",
  async execute(client, message, args) { 
const Discord = require('discord.js');
const db = require('quick.db')
        let member =  message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!member) return message.channel.send(`**Please Mention A User**`);
        if(member.id === message.author.id) return message.channel.send('**You can not ban yourself -_-**');

        if(!member) return message.channel.send('<a:no:784463793366761532> **User not found**');

        let reason = args.join(" ").slice(22);
        if(!reason) reason = "No Reason Specified";
        
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: BAN_MEMBERS**')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : BAN_MEMBERS**')

        message.react('<a:yes:784463701305458708>')

        let e = new Discord.MessageEmbed()
        .setTitle('User has been banned')
        .setColor("RANDOM")
        .addField('Username', `**${member}**`)
        .addField('Banned by', `**${message.author}**`)
        .addField('Reason', `**${reason}**`)
        .setFooter('Ban time', client.user.displayAvatarURL())
        .setTimestamp()
      

        let userE = new Discord.MessageEmbed()
        .setTitle(`You've Been Banned From **${message.guild.name}**`)
        .setColor("RANDOM")
        .addField('Mod', `**${message.author}**`)
        .addField('Reason', `**${reason}**`)
        .setTimestamp(new Date())

        message.guild.member(member).ban({reason: reason})
        member.send(userE);

        let mChannel = db.fetch(`modlog_${message.guild.id}`)
		if(!mChannel) return message.channel.send(e)
		let banChannel = message.guild.channels.cache.get(mChannel)
		if(!banChannel) return;
		banChannel.send(e)
    },
};