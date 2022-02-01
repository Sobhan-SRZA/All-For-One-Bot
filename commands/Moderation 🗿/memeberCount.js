const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'membercount',
    aliases: ['mc','mcout'],
    category: 'Moderation',
    utilisation: '{prefix}membercount',
  async execute(client, message, args) { 
    
      await message.guild.members.fetch();
const embed = new Discord.MessageEmbed()
        .setAuthor("Member-Count Information About: " + message.guild.name, message.guild.iconURL({
          dynamic: true
        }), "https://clan.milrato.eu")
        .setColor(`RANDOM`)
        .addField("❱ Total USERS", "😀 \`" + message.guild.memberCount + "\`", true)
        .addField("❱ Total HUMANS", "👤 \`" + message.guild.members.cache.filter(member => !member.user.bot).size + "\`", true)
        .addField("❱ Total BOTS", "🤖 \`" + message.guild.members.cache.filter(member => member.user.bot).size + "\`", true)

        .addField("❱ OFFLINE", "⚫️ \`" + message.guild.members.cache.filter(member => member.presence.status != "offline").size + "\`", true)
        .addField("❱ ONLINE", "🟢 \`" + message.guild.members.cache.filter(member => !member.user.bot || member.presence.status != "offline").size + "\`", true)
        .addField("❱ ONLINE", "🟢 \`" + message.guild.members.cache.filter(member => member.user.bot || member.presence.status != "offline").size + "\`", true)

        .addField("❱ IDLE", "🟠 \`" + message.guild.members.cache.filter(member => member.presence.status == "idle").size + "\`", true)
        .addField("❱ IDLE", "🟠 \`" + message.guild.members.cache.filter(member => !member.user.bot || member.presence.status == "idle").size + "\`", true)
        .addField("❱ IDLE", "🟠 \`" + message.guild.members.cache.filter(member => member.user.bot || member.presence.status == "idle").size + "\`", true)

        .addField("❱ DND", "🔴 \`" + message.guild.members.cache.filter(member => member.presence.status == "dnd").size + "\`", true)
        .addField("❱ DND", "🔴 \`" + message.guild.members.cache.filter(member => !member.user.bot || member.presence.status == "dnd").size + "\`", true)
        .addField("❱ DND", "🔴 \`" + message.guild.members.cache.filter(member => member.user.bot || member.presence.status == "dnd").size + "\`", true)

        .addField("❱ OFFLINE", "⚫\`" + message.guild.members.cache.filter(member => member.presence.status == "offline").size + "\`", true)
        .addField("❱ OFFLINE", "⚫\`" + message.guild.members.cache.filter(member => !member.user.bot || member.presence.status == "offline").size + "\`", true)
        .addField("❱ OFFLINE", "⚫\`" + message.guild.members.cache.filter(member => member.user.bot || member.presence.status == "offline").size + "\`", true)
        .setFooter(`Request By ${message.author.tag} |`, message.author.displayAvatarURL())
         .setTimestamp(Date.now())
      message.channel.send(embed);
    
  }
}