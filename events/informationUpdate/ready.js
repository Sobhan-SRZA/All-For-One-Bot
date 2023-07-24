const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle
} = require("discord.js");
const {
  checkPing
} = require(`${process.cwd()}/functions/functions`);
const os = require('node:os');
module.exports = async (client) => {
  let channel = await client.guilds.cache.get(client.config.discord.server_id)?.channels.cache.get(client.config.discord.server_channel_stats);
  setInterval(async () => {
    if (await client.db.has(`guild_${channel.guild.id}.status.message`) && await channel.messages.fetch(await client.db.get(`guild_${channel.guild.id}.status.message`))) {
      let message = await channel.messages.fetch(await client.db.get(`guild_${channel.guild.id}.status.message`)).then((msg) => msg);
      await message.edit({
        embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`Bot Status`).addFields([{ name: `${client.emotes.server}| Total Guilds:`, value: `**\`${client.guilds.cache.size.toLocaleString()}\` Servers**`, inline: false }, { name: `${client.emotes.users}| Total Users:`, value: `**\`${client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0).toLocaleString()}\` Users**`, inline: false }, { name: `${client.emotes.commands}| Commands:`, value: `**slashCommands[\`${client.slashCommands.size}\`] & messageCommands[\`${client.messageCommands.size}\`]**`, inline: false }, { name: `${client.emotes.ping}| Ping:`, value: `**\`${Math.round(client.ws.ping)} ms 📶 | ${await checkPing(Math.round(client.ws.ping))}\`**`, inline: false }, { name: `${client.emotes.uptime}| Uptime:`, value: `**<t:${Math.trunc(client.readyTimestamp / 1000)}:D> | <t:${Math.trunc(client.readyTimestamp / 1000)}:R>**`, inline: false }, { name: `${client.emotes.memory}| Memory:`, value: `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2).toLocaleString()}/${(process.memoryUsage().rss / 1024 / 1024).toFixed(2).toLocaleString()} MB | \`${Math.trunc(process.memoryUsage().heapUsed * 100 / (process.memoryUsage().rss))}%\`**`, inline: false }, { name: `${client.emotes.cpu}| CPU:`, value: `**${os.cpus().map((i) => `${i.model}`)[0]} | \`${String(os.loadavg()[0])}%\`**`, inline: false }, { name: `${client.emotes.version}| Bot Versions:`, value: `**Source \`v${require(`${process.cwd()}/package.json`).version}\` | Discord.js \`v${require(`discord.js`).version}\`**`, inline: false }])]
      });
    } else {
      await channel.send({
        embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`Bot Status`).addFields([{ name: `${client.emotes.server}| Total Guilds:`, value: `**\`${client.guilds.cache.size.toLocaleString()}\` Servers**`, inline: false }, { name: `${client.emotes.users}| Total Users:`, value: `**\`${client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0).toLocaleString()}\` Users**`, inline: false }, { name: `${client.emotes.commands}| Commands:`, value: `**slashCommands[\`${client.slashCommands.size}\`] & messageCommands[\`${client.messageCommands.size}\`]**`, inline: false }, { name: `${client.emotes.ping}| Ping:`, value: `**\`${Math.round(client.ws.ping)} ms 📶 | ${await checkPing(Math.round(client.ws.ping))}\`**`, inline: false }, { name: `${client.emotes.uptime}| Uptime:`, value: `**<t:${Math.trunc(client.readyTimestamp / 1000)}:D> | <t:${Math.trunc(client.readyTimestamp / 1000)}:R>**`, inline: false }, { name: `${client.emotes.memory}| Memory:`, value: `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2).toLocaleString()}/${(process.memoryUsage().rss / 1024 / 1024).toFixed(2).toLocaleString()} MB | \`${Math.trunc(process.memoryUsage().heapUsed * 100 / (process.memoryUsage().rss))}%\`**`, inline: false }, { name: `${client.emotes.cpu}| CPU:`, value: `**${os.cpus().map((i) => `${i.model}`)[0]} | \`${String(os.loadavg()[0])}%\`**`, inline: false }, { name: `${client.emotes.version}| Bot Versions:`, value: `**Source \`v${require(`${process.cwd()}/package.json`).version}\` | Discord.js \`v${require(`discord.js`).version}\`**`, inline: false }])],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Refresh').setEmoji(client.emotes.update).setCustomId(`reload_info`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Vote Me').setEmoji(client.emotes.topgg).setURL(`${client.config.discord.topgg}`)])]
      }).then(async (msg) => {
        await client.db.set(`guild_${channel.guild.id}.status.channel`, channel.id)
        await client.db.set(`guild_${channel.guild.id}.status.message`, msg.id)
      })
    }
  }, 1000 * 5)
}
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */