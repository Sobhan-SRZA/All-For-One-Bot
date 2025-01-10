const { MessageEmbed, Permissions } = require("discord.js");
const db = require('quick.db');
const functions = require('../../functions/functions')
const epochDateNow = functions.epochDateNow();
module.exports = {
    name: "mute",
    cooldown: 5,
    aliases: ["mu"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}mute [name | nickname | mention | ID] [reason]',
    description: "Mutes a member in server!",
  async execute(client, message, args) { 

        try {
            if (!message.member.permission.has(Permissions.FLAGS.MANAGE_GUILD)) return message.channel.send("**You Dont Have Permmissions To Mute Someone! - [MANAGE_GUILD]**");
            if (!message.guild.me.permission.has(Permissions.FLAGS.MANAGE_GUILD)) return message.channel.send("**I Don't Have Permissions To Mute Someone! - [MANAGE_GUILD]**")
            if (!args[0]) return message.channel.send("**Please Enter A User To Be Muted!**");

            var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!mutee) return message.channel.send("**Please Enter A Valid User To Be Muted!**");

            if (mutee === message.member) return message.channel.send("**You Cannot Mute Yourself!**")
            if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Cannot Mute This User!**')

            let reason = args.slice(1).join(" ");
            if (mutee.user.bot) return message.channel.send("**Cannot Mute Bots!**");
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

            if (!muterole) {
                try {
                    muterole = await message.guild.roles.create({
                        data: {
                            name: "Muted",
                            color: "#514f48",
                            permissions: []
                        }
                    })
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false,
                        })
                    })
                } catch (e) {
                    console.log(e);
                }
            }; 

            if (mutee.roles.cache.has(muterole.id)) return message.channel.send("**User Is Already Muted!**")

            db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)
          try {
            mutee.roles.set([muterole.id]).then(() => {
                mutee.send(`**Hello, You Have Been Muted In ${message.guild.name} for - ${reason || "No Reason"}`).catch(() => null)
            })
            } catch {
                 mutee.roles.set([muterole.id])                               
            }
                if (reason) {
                const sembed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL()})
                    .setDescription(`${mutee.user.username} was successfully muted for ${reason}`)
                message.channel.send(sembed);
                } else {
                    const sembed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor({name:message.guild.name, iconURL:message.guild.iconURL()})
                    .setDescription(`${mutee.user.username} was successfully muted`)
                message.channel.send(sembed2);
                }
            
            let embed = new MessageEmbed()
                .setColor("RED")
                .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
                .setAuthor({name:`${message.guild.name} Modlogs`, iconURL:message.guild.iconURL()})
                .addField("**Moderation**", "mute")
                .addField("**Mutee**", mutee.user.username)
                .addField("**Moderator**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField(`**Date**`, `<t:${epochDateNow}:R>`, true)
                .setFooter({text:message.member.displayName, iconURL:message.author.displayAvatarURL()})
                .setTimestamp()

                let logChannel = db.fetch(`modlog_${message.guild.id}`)
                if(logChannel)return logChannel.send(embed)

        } catch {
            return;
        }
    }
}