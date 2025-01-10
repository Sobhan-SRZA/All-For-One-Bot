module.exports = {
    name: "slowmode",
    cooldown: 5,
    aliases: ["slo"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}slowmode',
    description: "slowmode on from the server text channel.",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const {Permissions} = require('discord.js');
        const amount = parseInt(args[0])
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNEL)) return message.channel.send(client.emotes.badage + '| **You can not use this command | Permission: MANAGE_CHANNEL**')
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNEL)) return message.channel.send(client.emotes.entry + '| **I do not have the correct permissions | Permission : MANAGE_CHANNEL**')
        if(isNaN(amount)) return message.channel.send("Adade Morede Nazar Morede Taid Nemibashad⛔")
        if(args[0] === amount + "s") {
        message.channel.setRateLimitPerUser(amount)
        if(amount > 1) {
        message.channel.send("Slowmode Faal Shod " + amount + " seconds")
        return
        }
        else {message.channel.send("Slowmode  Dar Hal Hazer " + amount + " second")
        return }
    } if(args[0] === amount + "min") {
        message.channel.setRateLimitPerUser(amount * 60)
        if(amount > 1) {
        message.channel.send("Slowmode  Dar Hal Hazer  " + amount + " minutes")
        return
        } else { 
            message.channel.send("Slowmode  Dar Hal Hazer " + amount + " minute")   
             
    
    return }
    } if(args[0] === amount + "h") {
        message.channel.setRateLimitPerUser(amount * 60 * 60)
        if(amount > 1) {
        message.channel.send("Slowmode  Dar Hal Hazer  " + amount + " hours")
        return
        } else {
            message.channel.send("Slowmode  Dar Hal Hazer"  + amount +  "hour")
        return}
    } else {
        message.channel.send("Shoma Faghat Mitavanid  seconds(s), minutes(min) and hours(h) Ra Set Konid")
    }
    function epoch (date) {
        return Date.parse(date)
      }
      const dateToday =  new Date(); 
      const TimeStampDate = epoch(dateToday) / 1000;
          let embed = new MessageEmbed()
           .setAuthor({name:message.guild.id + '|'+ message.guild.name, iconURL:message.guild.iconURL({ dynamic: true })})
           .setTitle(`${client.emotes.error} | Channel slomode actived or changed`)
           .setColor("#2F3136")
           .setTimestamp()
           .setFooter({text:"Created By Mr.SIN RE#1528 :) | Date", iconURL:`https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
           .addField('Channel :', `**${message.channel}**`, true)
           .addField(`Author : `, message.author , true)
           .addField(`Slowmode amount : `, amount , true)
           .addField(`Date :`, `**<t:${TimeStampDate}:R>**` , true)
      
           let logChannel = require('quick.db').fetch(`modlog_${message.guild.id}`)
           if(logChannel)return logChannel.send(embed)
    }
}