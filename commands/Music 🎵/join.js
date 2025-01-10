const {
  MessageEmbed,
  Permissions
} = require('discord.js');
module.exports = {
  name: "join",
  aliases: ["j"],
  category: 'Music 🎶',
  cooldown: 10,
  description: "joining bot to your voice.",
async execute(client, message, args) { 

  const channel = message.member.voiceChannel;
  if (!channel)
    return message.channel.send("You must Join a voice channel before using this command!");
  if (!channel.permissionsFor(message.client.user).has(Permissions.FLAGS.CONNECT))
    return error("I don't have permission to join the voice channel");
  if (!channel.permissionsFor(message.client.user).has(Permissions.FLAGS.SPEAK))
    return error("I don't have permission to speak in the voice channel");
  await channel.join();
  channel.guild.voice.setSelfDeaf(client.config.opt.selfDeaf)
  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Joined the voice channel **")
      .setColor("RED")
  )
 }
 };
