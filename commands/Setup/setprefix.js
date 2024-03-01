const Discord = require('discord.js')
module.exports = {
    name: "setprefix",
    cooldown: 5,
    aliases: ["set-prefix", "stp"],
    category: 'Setup 💻',
    utilisation: 'setprefix [new-prefix]',
    description: "Change bot prefix in server",


    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Message} message 
     * @param {Array<string>} args 
     * @returns 
     */
    async execute(client, message, args) {
        try {
            const db = client.db;
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                let pererrorEmbed = new Discord.MessageEmbed()
                    .setColor("0xFF0000")
                    .setTitel(`**❌ | Error**`)
                    .setDescription(`Dastresi Morede Niaz Ra Nadarid🤕`)
                message.channel.send(pererrorEmbed)


            } else
                var prefix = await db.get(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = client.prefix;
            var newPrefix = args.join(' ')
            if (!newPrefix) {
                await db.set(`prefix_${message.guild.id}`, client.prefix);
                let errorprefixEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTimestamp(Date.now())
                    .setAuthor(`prefix of ${client.user.tag} changed👌🏻`, client.user.displayAvatarURL())
                    .setFooter(`prefix changed by ${message.author.tag} |`, message.author.displayAvatarURL())
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
                await db.set(`prefix_${message.guild.id}`, newPrefix);
                let prefixEmbed = new Discord.MessageEmbed()
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("RANDOM")
                    .setDescription(`Prefix Bot Dar In Server Be **${newPrefix}** Taghir Yaft😁`)
                    .setTimestamp(Date.now())
                    .setAuthor(`prefix of ${client.user.tag} changed👌🏻`, client.user.displayAvatarURL())
                    .setFooter(`prefix changed by ${message.author.tag} |`, message.author.displayAvatarURL())
                message.channel.send(prefixEmbed)
            }
        } catch (err) {
            return;
        }
    }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */