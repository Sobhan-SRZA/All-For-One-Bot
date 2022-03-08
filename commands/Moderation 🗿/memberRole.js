module.exports = {
    name: "userroles",
    cooldown: 5,
    aliases: ["url"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}userroles',
    description: "show member roles from the server",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
        const Discord = require('discord.js');
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.reply('Lotfan Member Morede Nazar Ra Mention Konid. ❗️');

        const memberRoles = member.roles.cache
            .filter(roles => roles.id !== message.guild.id)
            .map((role) => role.toString() );

        message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true}))
            .setDescription(` Role Haye ${member} 👉 ${memberRoles} `)
            .setColor('#fafafa')
        )   
  }
}