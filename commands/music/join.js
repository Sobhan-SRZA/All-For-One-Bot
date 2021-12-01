 const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "join",
    aliases: ["j"],
  cooldown: 10,
  description: "leave bot from voice",
 async execute(message, client, connection) { 
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "You must Join a voice channel before using this command!"
    );

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return error("I don't have permission to join the voice channel");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return error("I don't have permission to speak in the voice channel");

  await channel.join();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Joined the voice channel **")
      .setColor("RED")
  )}
 };
