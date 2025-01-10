const {MessageEmbed,Permissions} = require('discord.js')
module.exports = {
    name: "setprefix",
    cooldown: 5,
    aliases: ["set-prefix","stp"],
    category: 'Setup 💻',
    usage: '[new-prefix]',
    description: "Change bot prefix in server",
  
  async execute(client, message, args) { 
       try {
            if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                let pererrorEmbed = new MessageEmbed()
                              .setColor("0xFF0000")
                               .setTitel(`**❌ | Error**`)
                               .setDescription(`Dastresi Morede Niaz Ra Nadarid🤕`)
                message.reply({embeds:[pererrorEmbed]})
                
                
            }else
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = process.env.PREFIX;
            var newPrefix = args.join(' ')
            if (!newPrefix) {
                require('quick.db').set(`prefix_${message.guild.id}`, process.env.PREFIX);
                   let errorprefixEmbed = new MessageEmbed()
                   .setColor(client.colors.none)
                   .setThumbnail(client.user.displayAvatarURL())
                   .setTimestamp(Date.now())
                   .setAuthor({name:`prefix of ${client.user.tag} changed👌🏻`,iconURL:client.user.displayAvatarURL()})
                   .setFooter({text:`prefix changed by ${message.author.tag} |`,iconURL:message.author.displayAvatarURL({dynamic:true})})
                   .setDescription(`Prefix Bot Be Halat Default **${process.env.PREFIX}** Taghir Yaft`)
                message.reply({embeds:[errorprefixEmbed]})
            } else if (newPrefix) {
                if (newPrefix.length > 7) { 
                  let errorEmbed = new MessageEmbed()
                               .setColor(client.colors.red)
                               .setTitel(`**❌ | Error**`)
                               .setDescription(`Shotor Prefixet Kheili Tolanoe😶‍🌫️`)
                    message.reply({embeds:[errorEmbed]})
                }
                require('quick.db').set(`prefix_${message.guild.id}`, newPrefix);
                  let prefixEmbed = new MessageEmbed()
                              .setThumbnail(client.user.displayAvatarURL())
                              .setColor(client.colors.none)
                               .setDescription(`Prefix Bot Dar In Server Be **${newPrefix}** Taghir Yaft😁`)
                               .setTimestamp(Date.now())
                               .setAuthor({name:`prefix of ${client.user.tag} changed👌🏻`,iconURL:client.user.displayAvatarURL()})
                               .setFooter({text:`prefix changed by ${message.author.tag} |`,iconURL:message.author.displayAvatarURL({dynamic:true})})
              message.reply({embeds:[prefixEmbed]})
            }
        } catch (err) {
            return;
        }
    }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */