const { MessageEmbed } = require('discord.js');
const jsonQuotes = require('../../JSON/motivational.json')
module.exports = {
    name: 'motivation',
    aliases: ['motivate', 'motivational'],
    description: 'Get a random motivation quote',
    category: 'Fun 🎭 | Minigame',
    utilisation: "[username | nickname | mention | ID](optional)",
async execute(client, message, args) { 
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        const randomQuote = jsonQuotes.quotes[Math.floor((Math.random() * jsonQuotes.quotes.length))];
        if (!args[0]) {
            const quoteEmbed = new MessageEmbed()
                .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL( { size:4096 , dynamic: true } )})
                .setTitle(randomQuote.author)
                .setDescription(randomQuote.text)
                .setColor(client.colors.none)
                .setFooter({text:member.displayName,iconURL: member.user.displayAvatarURL( { size:4096 , dynamic: true } )})
                .setTimestamp()
            return message.channel.send(quoteEmbed);
        }
         else if (args[0]) {
            const embed = new MessageEmbed()
                .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL( { size:4096 , dynamic: true } )})
                .setColor(client.colors.none)
                .setTitle(`${randomQuote.author} -`)
                .setDescription(`**${randomQuote.text}** \n\nBy ${message.member.displayName} to ${member.displayName}`)
                .setFooter({text:member.displayName, iconURL:member.user.displayAvatarURL( { size:4096 , dynamic: true } )})
                .setTimestamp()
            message.channel.send(embed)
        }
    }
};