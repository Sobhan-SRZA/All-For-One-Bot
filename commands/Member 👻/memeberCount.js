const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'membercount',
    aliases: ['mc','mcout'],
    category: 'Member 👻',
    utilisation: '{prefix}membercount',
    description: "send a count of server members with their status.",

  async execute(client, message, args) { 
    
      await message.guild.members.fetch();
const embed = new Discord.MessageEmbed()
        .setAuthor("Member-Count Information About: " + message.guild.name, message.guild.iconURL({
          dynamic: true
        }), "https://clan.milrato.eu")
        .setColor(`RANDOM`)
        .addField("❱ All Members", "🫂 \`" + message.guild.memberCount + "\`", true)
        .addField("❱ Guild Humans", "👤 \`" + message.guild.members.cache.filter(member => !member.user.bot).size + "\`", true)
        .addField("❱ Guild Bots", "🤖 \`" + message.guild.members.cache.filter(member => member.user.bot).size + "\`", true)

        .addField("❱ Guild ONLINE Count ", "🟢 \`" + message.guild.members.cache.filter(member => member.presence.status != "offline").size + "\`", true)
        .addField("❱ Guild ONLINE Members", "🟢 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status != "offline").size + "\`", true)
        .addField("❱ Guild ONLINE Bots", "🟢 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status != "offline").size + "\`", true)

        .addField("❱ Guild IDLE Count", "🟠 \`" + message.guild.members.cache.filter(member => member.presence.status == "idle").size + "\`", true)
        .addField("❱ Guild IDLE Members", "🟠 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "idle").size + "\`", true)
        .addField("❱ Guild IDLE Bots", "🟠 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "idle").size + "\`", true)

        .addField("❱ Guild DND Count", "🔴 \`" + message.guild.members.cache.filter(member => member.presence.status == "dnd").size + "\`", true)
        .addField("❱ Guild DND Members", "🔴 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "dnd").size + "\`", true)
        .addField("❱ Guild DND Bots", "🔴 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "dnd").size + "\`", true)

        .addField("❱ Guild OFFLINE Count", "⚫\`" + message.guild.members.cache.filter(member => member.presence.status == "offline").size + "\`", true)
        .addField("❱ Guild OFFLINE Members", "⚫\`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "offline").size + "\`", true)
        .addField("❱ Guild OFFLINE Bots", "⚫\`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "offline").size + "\`", true)
        .setFooter(`Request By ${message.author.tag} |`, message.author.displayAvatarURL())
         .setTimestamp(Date.now())
      message.channel.send(embed);
    
  }
}