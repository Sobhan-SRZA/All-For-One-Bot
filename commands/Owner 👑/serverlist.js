const Discord = require('discord.js')
module.exports = {
    name: 'serverlist',
    aliases: ['list','slist','sl'],
    category: 'Owner 👑',
    utilisation: '{prefix}serverlist',
  async execute(client, message, args) { 
        const Guilds = client.guilds.cache.array().map((G, I) => `${I + 1}. **${G.name}** - **${G.id}**`).join("\n");
    if (!Guilds) return message.channel.send("No Guild");
    return message.channel.send(Guilds, { split: { char: "\n" } }); 
  }
}