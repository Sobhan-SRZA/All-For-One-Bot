const {MessageEmbed} = require('discord.js')
module.exports = {
  name: "disconnect",
  aliases: ["dc","left"],
  category: 'Music 🎶',
  cooldown: 10,
  description: "lefting bot on voice",
async execute(client, message, args) { 

  const channel = message.guild.me.voice.channel;
  await channel.kick()();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Disconnect on the voice channel **")
      .setColor(client.colors.none)
  )
 }
 };
