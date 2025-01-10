module.exports = {
  name: "bansshow",
  cooldown: 5,
  aliases: ["bns"],
  category: 'Moderation 🗿',
  utilisation: '{prefix}bansshow',
  description: "Show a members bans from the server",
  usage: "[name | nickname | mention | ID] <reason> (optional)",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const Discord = require('discord.js');
    if (!message.member.permissions.has("BAN_MEMBERS")) return;
    const fetchBans = message.guild.fetchBans();
    const bannedMembers = (await fetchBans)
      .map((member) => member.user.tag)
      .join("\n");
    message.channel.send(bannedMembers);
  },
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