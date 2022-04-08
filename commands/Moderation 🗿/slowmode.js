module.exports = {
    name: "slowmode",
    cooldown: 5,
    aliases: ["slo"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}slowmode',
    description: "slowmode on from the server text channel.",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const Discord = require('discord.js');
        const amount = parseInt(args[0])
        if(message.member.hasPermission("MANAGE_CHANNEL"))
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
    }
}