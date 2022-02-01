const Discord = require('discord.js');
module.exports = {
    name: 'serverinfo',
    description: "this is a command",
    aliases: ['sinfo','server'],
    category: 'Moderation',
    cooldown: 5,
    utilisation: '{prefix}serverinfo',
  async execute(client, message, args) { 
        let embed = new Discord.MessageEmbed()
        .setTimestamp()
    .setTitle("**server infor**")
    .setColor('ff0000')
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField(`🎫 Name of serverr:`, message.guild.name, true)
    .addField(`🆔 ID of server`, message.guild.id, true)
    .addField(`👑 owner of server`, message.guild.owner, true)  
    .addField(`🗺region of server`, message.guild.region, true)
    .addField(`👥Member total`, message.guild.members.cache.size, true)
    .addField(`🤖 Bots:`, message.guild.members.cache.filter(member => member.user.bot).size, true)
    .addField(`🚶 weights:`, message.guild.members.cache.filter(member => !member.user.bot).size, true)
    .addField(`😗 Emojis:`, message.guild.emojis.cache.size, true)
    .addField(`👻 Emojis Animated:`,message.guild.emojis.cache.filter(emoji => emoji.animated).size,true )
    .addField(`💬 Channel of text:`, message.guild.channels.cache.filter(channel => channel.type === 'text').size, true)
    .addField(`🎤 channel of voice:`, message.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
    .addField(`🔞 channel of nsfw:`, message.guild.channels.cache.filter(channel => channel.type === 'nsfw').size, true)
    .addField(`👔 roles:`, message.guild.roles.cache.size, true)
    .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png'}))
        message.channel.send(embed);    
    }
}