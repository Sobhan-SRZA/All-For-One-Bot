
module.exports = {
  name: "unmutevoice",
  cooldown: 5,
  aliases: ["umv"],
  category: 'Moderation 🗿',
  utilisation: '{prefix}unmutevoice',
  description: "Unmute a member from the voice",
  usage: "[name | nickname | mention | ID] <reason> (optional)",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const dateFormat = require('dateformat');
    const Discord = require('discord.js');
    if (!message.guild.me.hasPermission("MUTE_MEMBERS"))
      return message.reply("Shoma Dastresi Nadarid 💩");
    const unmuteUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    if (!message.member.hasPermission("MUTE_MEMBERS" || "ADMINISTRATOR"))
      return message.reply("Shoma Dastresi Nadarid 💩");
    if (!args[0]) {
      message.reply('Dashe Golam Bayad Yekio Mention Koni 😁')
    } else
      if (!unmuteUser) {
        return message.channel.send("Member Morede Nazar Peyda Nashod😕");
      } else
        if (unmuteUser.voice.serverMute) {
          unmuteUser.voice.setMute(false);

          unmuteUser.user.send(
            `Shoma **UnMute** Shodid Dar Server **${message.guild.name}**`
          );
          message.channel.send(
            `${unmuteUser} Member Morede Nazar UnMute Shod ✅.`
          );

        } else
          return message.channel.send(
            "Member Morede Nazar Ya Dar Voice Nist Ya Dar Hal Hazar UnMute Hastesh🙂"
          );

    let logsChannel = message.guild.channels.cache.find(async c => c.id === await client.db.get(`modlog_${message.guild.id}`));
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.guild.id + '|' + message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setTitle(`${client.emotes.error} | Yek Channel Unlock Shod`)
      .setColor("#2F3136")
      .setTimestamp()
      .setFooter("Created By mr.sinre :)", `https://cdn.discordapp.com/avatars/865630940361785345/d0c85fbbdb0ee9f105336a041904e7d8.png?size=4096`)
      .addField(`Channele Zir Unlock Shod: `, message.channel, true)
      .addField(`Tavasote : `, message.author, true)
      .addField(`Dar Tarikhe : `, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``, true);

    logsChannel.send(embed)

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