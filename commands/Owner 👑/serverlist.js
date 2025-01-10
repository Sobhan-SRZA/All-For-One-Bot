const Discord = require('discord.js')
module.exports = {
    name: 'serverlist',
    aliases: ['list','slist','sl'],
    category: 'Owner 👑',
    utilisation: '{prefix}serverlist',
  async execute(client, message, args) { 

    if (!client.config.owner.some(r => r.includes(message.author.id)))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor('RED')
          .setFooter(``)
          .setTitle(`> You are not allowed to run this Command`)
          .setDescription(`You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}`)
        );

        let i0 = 0;
        let i1 = 10;
        let page = 1;
  
        let description =
          `Total Servers - ${client.guilds.cache.size}\n\n` +
          client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
            .slice(0, 10)
            .join("\n");
  
        let embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("RANDOM")
          .setFooter(client.user.username)
          .setTitle(`Page - ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
          .setDescription(description);
  
        let msg = await message.channel.send(embed);
  
        await msg.react("⬅");
        await msg.react("➡");
        await msg.react("❌");
  
        let collector = msg.createReactionCollector(
          (reaction, user) => user.id === message.author.id
        );
  
        collector.on("collect", async (reaction, user) => {
          if (reaction.emoji.name === "⬅") {
            // Updates variables
            i0 = i0 - 10;
            i1 = i1 - 10;
            page = page - 1;
  
            // if there is no guild to display, delete the message
            if (i0 + 1 < 0) {
              console.log(i0)
              return msg.delete();
            }
            if (!i0 || !i1) {
              return msg.delete();
            }
  
            description =
              `Total Servers - ${client.guilds.cache.size}\n\n` +
              client.guilds.cache
                .sort((a, b) => b.memberCount - a.memberCount)
                .map(r => r)
                .map(
                  (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
                )
                .slice(i0, i1)
                .join("\n");
  
            // Update the embed with new informations
            embed
              .setTitle(
                `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
              )
              .setDescription(description);
  
            // Edit the message
            msg.edit(embed);
          }
  
          if (reaction.emoji.name === "➡") {
            // Updates variables
            i0 = i0 + 10;
            i1 = i1 + 10;
            page = page + 1;
  
            // if there is no guild to display, delete the message
            if (i1 > client.guilds.cache.size + 10) {
              return msg.delete();
            }
            if (!i0 || !i1) {
              return msg.delete();
            }
  
            description =
              `Total Servers - ${client.guilds.cache.size}\n\n` +
              client.guilds.cache
                .sort((a, b) => b.memberCount - a.memberCount)
                .map(r => r)
                .map(
                  (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
                )
                .slice(i0, i1)
                .join("\n");
  
            // Update the embed with new informations
            embed
              .setTitle(
                `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
              )
              .setDescription(description);
  
            // Edit the message
            msg.edit(embed);
          }
  
          if (reaction.emoji.name === "❌") {
            return msg.delete();
          }
  
          // Remove the reaction when the user react to the message
          await reaction.users.remove(message.author.id);
        });
      
    }
}