const {
    MessageEmbed,
    Permissions
} = require('discord.js');
const roasts = require('../../JSON/roast.json');
module.exports = {
    name: "roast",
    aliases: ['ros'],
    category: 'Fun 🎭 | Voice',
    description: "Roasts people.",
    utilisation: "[username | nickname | mention | ID]",
    async execute(client, message, args) { 
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());
        let roast = roasts.roast[Math.floor((Math.random() * roasts.roast.length))];
        if(!args[0]) {
            const sembed = new MessageEmbed()
                .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL( { size:4096 , dynamic: true } )})
                .setColor(client.colors.none)
                .setDescription("**Do You Really Want To Roast Yourself?**")
                .setFooter({text:message.member.displayName, iconURL:message.author.displayAvatarURL( { size:4096 , dynamic: true } )})
                .setTimestamp()
            message.channel.send(sembed);
        }
        else if (args[0]) {
            const embed = new MessageEmbed()
                .setAuthor({name:message.guild.name,iconURL: message.guild.iconURL( { size:4096 , dynamic: true } )})
                .setTitle(`${message.author.username}-`)
                .setColor(client.colors.none)
                .setDescription(`${roast}`)
                .setFooter({text:member.displayName, iconURL:member.user.displayAvatarURL( { size:4096 , dynamic: true } )})
                .setTimestamp()
            message.channel.send(embed);
        }
    }
}