const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "join",
  aliases: ["j"],
  category: 'Music 🎶',
  cooldown: 10,
  description: "join bot to your voice",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

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
    )
  }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */