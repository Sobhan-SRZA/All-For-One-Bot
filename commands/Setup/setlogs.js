module.exports = {
  name: "setlogs",
  cooldown: 5,
  aliases: ["logs", "slg"],
  category: 'Setup 💻',
  utilisation: 'setlogs [channel]',
  description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
  usage: "[channel mention | channel ID | channel name]",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    const db = client.db;
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You Do Not Have The Required Permissions! - [MANAGE_CHANNELS]**")
    if (!args[0]) {
      let b = await db.get(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `**Modlog Channel Set In This Server Is \`${channelName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Please Enter A Channel Name or ID To Set!**"
        );
    }
    let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

    if (!channel || channel.type !== 'text') return message.channel.send("**Please Enter A Valid Text Channel!**");

    try {
      let a = await db.get(`modlog_${message.guild.id}`)

      if (channel.id === a) {
        return message.channel.send("**This Channel is Already Set As Modlog Channel!**")
      } else {
        client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Modlog Channel Set!**")
        await db.set(`modlog_${message.guild.id}`, channel.id)

        message.channel.send(`**${client.emotes.success}|Modlog Channel Has Been Set Successfully in \`${channel.name}\`!**`)
      }
    } catch {
      return message.channel.send("**Error - `Missing Permissions Or Channel Is Not A Text Channel!`**");
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