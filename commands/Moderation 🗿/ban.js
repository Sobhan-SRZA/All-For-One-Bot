module.exports = {
    name: "ban",
    cooldown: 5,
    aliases: ["bn"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}ban [name | nickname | mention | ID] [reason]',
    description: "Ban a member from the server.",
  async execute(client, message, args) { 
const {MessageEmbed,Permissions} = require('discord.js');
const db = require('quick.db')
        let member =  message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!member) return message.channel.send(client.emotes.error + `| **Please Mention A User**`);
        if(member.id === message.author.id) return message.channel.send(client.emotes.badage + '| **You can not ban yourself -_-**');

        if(!member) return message.channel.send(client.emotes.error + '| **User not found**');

        let reason = args.join(" ").slice(22);
        if(!reason) reason = "No Reason Specified";
        
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send(client.emotes.badage + '| **You can not use this command | Permission: BAN_MEMBERS**')
        if(!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send(client.emotes.entry + '| **I do not have the correct permissions | Permission : BAN_MEMBERS**')

        message.react(client.emotes.success)

        let userE = new MessageEmbed()
        .setTitle(`You've Been Banned From **${message.guild.name}**`)
        .setColor(client.colors.none)
        .addField('Reason', `**${reason}**`)
        .setFooter({text:"Created By Mr.SIN RE#1528 :) | Ban time", iconURL:`https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
        .addField('Reason :', `**${reason}**`,true)
        .addField(`Banned by : `, message.author,true)
        .addField(`Date :`, `**<t:${TimeStampDate}:R>**`,true)

        message.guild.member(member).ban({reason: reason})
        member.send(userE);

function epoch (date) {
  return Date.parse(date)
}
const dateToday =  new Date(); 
const TimeStampDate = epoch(dateToday) / 1000;
    let embed = new MessageEmbed()
     .setAuthor({name:message.guild.id + '|'+ message.guild.name, iconURL:message.guild.iconURL({ dynamic: true })})
     .setTitle(`${client.emotes.error} | User has been banned`)
     .setColor("#2F3136")
     .setTimestamp()
     .setFooter({text:"Created By Mr.SIN RE#1528 :) | Ban time", iconURL:`https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
     .addField('Reason :', `**${reason}**`,true)
     .addField(`Banned by : `, message.author,true)
     .addField('Username :', `**${member}**`,true)
     .addField(`Date :`, `**<t:${TimeStampDate}:R>**`,true)

     let logChannel = require('quick.db').fetch(`modlog_${message.guild.id}`)
     if(logChannel)return logChannel.send(embed)
      },
};