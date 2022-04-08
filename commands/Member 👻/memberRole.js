module.exports = {
    name: "userroles",
    cooldown: 5,
    aliases: ["url"],
    category: 'Member 👻',
    utilisation: '{prefix}userroles [name | nickname | mention | ID]',
    description: "show member roles from the server",
  async execute(client, message, args) { 
        const Discord = require('discord.js');
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.reply('Lotfan Member Morede Nazar Ra Mention Konid. ❗️');

        const memberRoles = member.roles.cache
            .filter(roles => roles.id !== message.guild.id)
            .array()
            .sort((a, b) => b.rawPosition - a.rawPosition)
            .map(role => role.toString())
            .join(', ')

        message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true}))
            .setDescription(` Role Haye ${member} 👉 ${memberRoles} `)
            .setColor('#fafafa')
        )   
  }
}