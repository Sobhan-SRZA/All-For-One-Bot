const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
module.exports = {
    name: "unmute",
    cooldown: 5,
    aliases: ["um"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}unmute',
    description: "UnMutes a member in the discord!",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) {
            try {
            if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**You Dont Have Permmissions To UnMute Someone! - [MANAGE_GUILD]**");

            if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("**I Don't Have Permissions To UnMute Someone! - [MANAGE_GUILD]**")
            if (!args[0]) return message.channel.send("**Please Enter A User To Be UnMuted!**");

            var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!mutee) return message.channel.send("**Please Enter A Valid User To Be UnMuted!**");

            if (mutee === message.member) return message.channel.send("**You Cannot UnMute Yourself!**")
            if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Cannot UnMute This User!**')

            let reason = args.slice(1).join(" ");
            if (mutee.user.bot) return message.channel.send("**Cannot UnMute Bots!**");
            const userRoles = mutee.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r.id)

            let muterole;
            let dbmute = await db.fetch(`muterole_${message.guild.id}`);
            let muteerole = message.guild.roles.cache.find(r => r.name === "Muted")

            if (!message.guild.roles.cache.has(dbmute)) {
                muterole = muteerole
            } else {
                muterole = message.guild.roles.cache.get(dbmute)
            }

            if (!mutee.roles.cache.has(muterole.id)) return message.channel.send("**User Is Already UnMuted!**")

            db.delete(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)
          try {
            mutee.roles.remove([muterole.id]).then(() => {
                mutee.send(`**Hello, You Have Been UnMuted In ${message.guild.name} `).catch(() => null)
            })
            } catch {
                 mutee.roles.remove([muterole.id])                               
            }
                if (!reason) {
                    const sembed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`${mutee.user.username} was successfully unmuted`)
                message.channel.send(sembed2);
                }
            
            let embed = new MessageEmbed()
                .setColor("RED")
                .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .addField("**Moderation**", "unmute")
                .addField("**UnMutee**", mutee.user.username)
                .addField("**Moderator**", message.author.username)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

                let logChannel = db.fetch(`modlog_${message.guild.id}`)
                let logsChannel = message.guild.channels.cache.get(logChannel)
                if(!logsChannel) return;
                logsChannel.send(embed)
                
        } catch {
            return;
        }

    }
}