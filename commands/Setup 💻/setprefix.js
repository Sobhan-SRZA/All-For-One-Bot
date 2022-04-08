const Discord = require('discord.js')
module.exports = {
    name: "setprefix",
    cooldown: 5,
    aliases: ["set-prefix","stp"],
    category: 'Setup 💻',
    utilisation: 'setprefix [new-prefix]',
    description: "Change bot prefix in server",
  
  async execute(client, message, args) { 
       try {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                let pererrorEmbed = new Discord.MessageEmbed()
                              .setColor("0xFF0000")
                               .setTitel(`**❌ | Error**`)
                               .setDescription(`Dastresi Morede Niaz Ra Nadarid🤕`)
                message.channel.send(pererrorEmbed)
                
                
            }else
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = process.env.PREFIX;
            var newPrefix = args.join(' ')
            if (!newPrefix) {
                require('quick.db').set(`prefix_${message.guild.id}`, process.env.PREFIX);
                   let errorprefixEmbed = new Discord.MessageEmbed()
                              .setColor("RANDOM")
                           .setThumbnail(client.user.displayAvatarURL())
                               .setTimestamp(Date.now())
                               .setAuthor(`prefix of ${client.user.tag} changed👌🏻`,client.user.displayAvatarURL())
                                .setFooter(`prefix changed by ${message.author.tag} |`,message.author.displayAvatarURL())
                               .setDescription(`Prefix Bot Be Halat Default **${process.env.PREFIX}** Taghir Yaft`)
                message.channel.send(errorprefixEmbed)
            } else if (newPrefix) {
                if (newPrefix.length > 7) { 
                  let errorEmbed = new Discord.MessageEmbed()
                              .setColor("")
                               .setTitel(`**❌ | Error**`)
                               .setDescription(`Shotor Prefixet Kheili Tolanoe😶‍🌫️`)
                    message.channel.send(errorEmbed)
                }
                require('quick.db').set(`prefix_${message.guild.id}`, newPrefix);
                  let prefixEmbed = new Discord.MessageEmbed()
                              .setThumbnail(client.user.displayAvatarURL())
                              .setColor("RANDOM")
                               .setDescription(`Prefix Bot Dar In Server Be **${newPrefix}** Taghir Yaft😁`)
                               .setTimestamp(Date.now())
                               .setAuthor(`prefix of ${client.user.tag} changed👌🏻`,client.user.displayAvatarURL())
                                .setFooter(`prefix changed by ${message.author.tag} |`,message.author.displayAvatarURL())
              message.channel.send(prefixEmbed)
            }
        } catch (err) {
            return;
        }
    }
}
  